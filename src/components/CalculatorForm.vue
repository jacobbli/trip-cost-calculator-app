<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h2>Calculat Trip Cost</h2>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      label-position="left">
      <el-form-item label="Start Time">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="form.startDate"
            style="width: 100%;"
            @change='getTripCost'>
          </el-date-picker>
          <el-button 
            type="text"
            @click="setToCurrentTime('start')">
            Set To Current Date/Time
          </el-button>
        </el-col>
        <el-col 
          :span="11"
          :offset="1">
          <el-input
            class="time-input"
            type="time"
            v-model="form.startTime"
            style="width: 100%;"
            @change='getTripCost'
            prefix-icon="el-icon-time">
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="End Time">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="form.endDate"
            style="width: 100%;"
            @change='getTripCost'>
          </el-date-picker>
          <el-button 
            type="text"
            @click="setToCurrentTime('end')">
            Set To Current Date/Time
          </el-button>
        </el-col>
        <el-col 
          :span="11"
          :offset="1">
          <el-input
            class="time-input"
            type="time"
            v-model="form.endTime"
            style="width: 100%;"
            @change='getTripCost'
            prefix-icon="el-icon-time"
            controls="false">
          </el-input>
        </el-col>
      </el-form-item>
    </el-form>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Cost Breakdown</span>
      </div>
      Trip Duration: {{ 
        tripDuration.days + (tripDuration.days == 1 ? ' Day, ' : ' Days, ') + 
        tripDuration.hours + (tripDuration.hours == 1 ? ' Hour, ' : ' Hours, ') + 
        tripDuration.minutes + (tripDuration.minutes == 1 ? ' Minute' : ' Minutes') }}
      <el-table
        :data="tableData"
        class="cost-table"
        :row-class-name="highlightTotals">
        <el-table-column
          prop="name">
        </el-table-column>
        <el-table-column
          prop="value"
          align="right">
        </el-table-column>
      </el-table>
    </el-card>

  </el-card>
</template>

<script>
export default {
  name: 'CalculatorForm',

  data() {
    return {
      dayDifference: 0,
      hourDifference: 0,
      minuteDifference: 0,

      gst: Number,
      pst: Number,
      minuteRate: Number,
      hourRate: Number,
      dayRate: Number,
      pvrt: Number,
      accessFee: Number,

      form: {
        startDate: Date(),
        startTime: '',
        endDate: Date(),
        endTime: '',
      },

      tripCost: 0,
      taxTripCost: 0,
      incurredPvrt: 0,
      taxPVRT: 0,
      incurredAccessFee: 0,
      taxAccessFee: 0,
    }
  },

  mounted: function() {
    this.setToCurrentTime('start');
    this.setToCurrentTime('end');

    this.gst = parseFloat(process.env.VUE_APP_DEFAULT_GST);
    this.pst = parseFloat(process.env.VUE_APP_DEFAULT_PST);
    this.minuteRate = parseFloat(process.env.VUE_APP_DEFAULT_MINUTE_RATE);
    this.hourRate = parseFloat(process.env.VUE_APP_DEFAULT_HOUR_RATE);
    this.dayRate = parseFloat(process.env.VUE_APP_DEFAULT_DAY_RATE);
    this.pvrt = parseFloat(process.env.VUE_APP_DEFAULT_PVRT);
    this.accessFee = parseFloat(process.env.VUE_APP_DEFAULT_ACCESS_FEE);

    this.$root.$on('changeValues', data => {
      this.gst = data.gst;
      this.pst = data.pst;
      this.minuteRate = data.minuteRate;
      this.hourRate = data.hourRate;
      this.dayRate = data.dayRate;
      this.pvrt = data.pvrt;
      this.accessFee = data.accessFee;
      this.getTripCost()
    });
  },

  methods: {
    getTripCost() {
      let tripCost = 0;
      tripCost += this.tripDuration.days * this.dayRate
      if (this.tripDuration.hours >= 6) {
        tripCost += this.dayRate;
      } else {
        tripCost += this.tripDuration.hours * this.hourRate;
        if (this.tripDuration.minutes > 36) {
          tripCost += this.hourRate;
        } else {
          tripCost += this.tripDuration.minutes * this.minuteRate;
        }
      }

      this.tripCost = tripCost;
      this.incurredAccessFee = this.accessFee;
      this.calculatePvrt();
      this.calculateTax();
    },

    calculatePvrt() {
      if (this.tripDuration.hours >= 8) {
        let tempStartDate = new Date(this.form.startDate)
        tempStartDate.setHours(0, 0, 0);

        let tempEndDate = new Date(this.form.endDate)
        tempEndDate.setHours(0, 0, 0);

        let dayDifference = Math.floor((tempEndDate - tempStartDate) / 86400000)
        this.incurredPvrt = (dayDifference + 1) * this.pvrt
      } else {
        this.incurredPvrt = 0;
      }
    },

    calculateTax() {
      this.taxTripCost = this.tripCost * (this.pst + this.gst) / 100;
      this.taxPVRT = this.incurredPvrt * this.pst / 100;
      this.taxAccessFee = this.incurredAccessFee * (this.pst + this.gst) / 100;
    },

    highlightTotals({rowIndex}) {
      if (rowIndex === 2) {
        return 'subtotal-row';
      } else if (rowIndex === 7) {
        return 'total-row';
      }
      return '';
    },

    setToCurrentTime(dateCategory) {
      let currentDate = new Date();
      let minutes = '';
      let hours = '';
      if ((currentDate.getMinutes().toString()).length == 1) {
        minutes = `0${currentDate.getMinutes()}`
      } else {
        minutes = `${currentDate.getMinutes()}`
      }

      if ((currentDate.getHours().toString()).length == 1) {
        hours = `0${currentDate.getHours()}`
      } else {
        hours = `${currentDate.getHours()}`
      }

      if (dateCategory == 'start') {
        this.form.startTime = `${hours}:${minutes}`
        this.form.startDate = Date()
      } else {
        this.form.endTime = `${hours}:${minutes}`
        this.form.endDate = Date()
      }
      this.getTripCost()
    }
  },

  computed: {
    tripDuration: function() {
      let startDateTime = new Date(this.form.startDate)
      startDateTime.setHours(parseInt(this.form.startTime.slice(0,2)), parseInt(this.form.startTime.slice(3)), 0);

      let endDateTime = new Date(this.form.endDate)
      endDateTime.setHours(parseInt(this.form.endTime.slice(0,2)), parseInt(this.form.endTime.slice(3)), 0);

      let timeDifference = endDateTime - startDateTime

      let dayDifference = Math.floor(timeDifference / 86400000)
      let hourDifference = (Math.floor(timeDifference / 3600000)) - (dayDifference * 24)
      let minuteDifference = (Math.floor(timeDifference / 60000)) - (dayDifference * 24 * 60) - (hourDifference * 60)

      var tripDuration = {
        days: dayDifference,
        hours: hourDifference,
        minutes: minuteDifference
      }
      return tripDuration;
    },

    tableData: function() {
      let tableData = [{
          name: 'Trip Cost',
          value: this.tripCost > 0 ? '$' + this.tripCost.toFixed(2) : '$0.00'
        }, {
          name: 'Tax on trip cost',
          value: this.tripCost > 0 ? '$' + this.taxTripCost.toFixed(2) : '$0.00'
        }, {
          name: 'Subtotal',
          value: this.tripCost > 0 ? '$' + (this.tripCost + this.taxTripCost).toFixed(2) : '$0.00'
        }, {
          name: 'PVRT',
          value: this.tripCost > 0 ? '$' + this.incurredPvrt.toFixed(2) : '$0.00'
        }, {
          name: 'Tax on PVRT',
          value: this.tripCost > 0 ? '$' + this.taxPVRT.toFixed(2) : '$0.00'
        }, {
          name: 'Access Fee',
          value: this.tripCost > 0 ? '$' + this.incurredAccessFee.toFixed(2) : '$0.00'
        },{
          name: 'Tax on Access Fee',
          value: this.tripCost > 0 ? '$' + this.taxAccessFee.toFixed(2) : '$0.00'
        }, {
          name: 'Total Cost',
          value: this.tripCost > 0 ? '$' + (this.tripCost + this.taxTripCost + this.incurredPvrt + this.taxPVRT + this.incurredAccessFee + this.taxAccessFee).toFixed(2) : '$0.00'
      }]

      return tableData;
    }
  }
}
</script>

<style>
h2 {
  margin: 0;
}

.time-input input{
  font-family: inherit;
}

.card-button {
  float: right;
  padding: 3px 0
}

.el-table .total-row {
  font-weight: bold;
  background: #b9e79f;
}

.el-table .subtotal-row {
  font-weight: bold;
  background: rgb(231, 217, 189);
}

.reset-button {
  padding: 0;
}

</style>