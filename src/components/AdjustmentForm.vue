<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Adjustment</span>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="140px"
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
      <el-form-item label="Original End Time">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="form.originalEndDate"
            style="width: 100%;"
            @change='getTripCost'>
          </el-date-picker>
          <el-button 
            type="text"
            @click="setToCurrentTime('original')">
            Set To Current Date/Time
          </el-button>
        </el-col>
        <el-col 
          :span="11"
          :offset="1">
          <el-input
            class="time-input"
            type="time"
            v-model="form.originalEndTime"
            style="width: 100%;"
            @change='getTripCost'
            prefix-icon="el-icon-time"
            controls="false">
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="Adjusted End Time">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="form.adjustedEndDate"
            style="width: 100%;"
            @change='getTripCost'>
          </el-date-picker>
          <el-button 
            type="text"
            @click="setToCurrentTime('adjusted')">
            Set To Current Date/Time
          </el-button>
        </el-col>
        <el-col
          :span="11"
          :offset="1">
          <el-input
            class="time-input"
            type="time"
            v-model="form.adjustedEndTime"
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
        <el-button 
          style="float: right; padding: 3px 0" 
          type="text"
          @click="copyInfo">
            Copy Ticket Information
        </el-button>
      </div>
        Original Duration: {{ 
          originalTripDuration.days + (originalTripDuration.days == 1 ? ' Day, ' : ' Days, ') + 
          originalTripDuration.hours + (originalTripDuration.hours == 1 ? ' Hour, ' : ' Hours, ') + 
          originalTripDuration.minutes + (originalTripDuration.minutes == 1 ? ' Minute' : ' Minutes') }}
        <br/>
        <br/>
        New Duration: {{ 
          adjustedTripDuration.days + (adjustedTripDuration.days == 1 ? ' Day, ' : ' Days, ') + 
          adjustedTripDuration.hours + (adjustedTripDuration.hours == 1 ? ' Hour, ' : ' Hours, ') + 
          adjustedTripDuration.minutes + (adjustedTripDuration.minutes == 1 ? ' Minute' : ' Minutes') }}
      <el-table
        :data="tableData"
        class="cost-table"
        id="cost-table"
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
  name: 'AdjustmentForm',

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
        originalEndDate: Date(),
        originalEndTime: '',
        adjustedEndDate: Date(),
        adjustedEndTime: '',
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
    this.setToCurrentTime('original');
    this.setToCurrentTime('adjusted');

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
    getTripCost(startDate, endDate, tripDuration) {
      if (tripDuration) {
        if (tripDuration.minutes < 0 || tripDuration.hours < 0 || tripDuration.days < 0) {
          return '0.00';
        }
        if (tripDuration.minutes > 0 || tripDuration.hours > 0 || tripDuration.days > 0) {
          let tripCost = 0;
          tripCost += tripDuration.days * this.dayRate
          if (tripDuration.hours >= 6) {
            tripCost += this.dayRate;
          } else {
            tripCost += tripDuration.hours * this.hourRate;
            if (tripDuration.minutes > 36) {
              tripCost += this.hourRate;
            } else {
              tripCost += tripDuration.minutes * this.minuteRate;
            }
          }
          let accessFee = this.accessFee;
          let pvrt = this.calculatePvrt(startDate, endDate, tripDuration);
          let tax = this.calculateTax(tripCost, accessFee, pvrt);
          return (tripCost + accessFee + pvrt + tax).toFixed(2);
        }
      }
      return '0.00';
    },

    calculatePvrt(startDate, endDate, tripDuration) {
      let pvrt = 0;
      if (tripDuration.hours >= 8) {
        let tempStartDate = new Date(startDate)
        tempStartDate.setHours(0, 0, 0);

        let tempEndDate = new Date(endDate)
        tempEndDate.setHours(0, 0, 0);

        let dayDifference = Math.floor((tempEndDate - tempStartDate) / 86400000)
        pvrt = (dayDifference + 1) * this.pvrt
      } else {
        pvrt = 0;
      }
      return pvrt
    },

    calculateTax(tripCost, accessFee, pvrt) {
      let tax = 0;
      tax += tripCost * (this.pst + this.gst) / 100;
      tax += pvrt * this.pst / 100;
      tax += accessFee * (this.pst + this.gst) / 100;
      return tax;
    },

    highlightTotals({rowIndex}) {
      if (rowIndex === 2) {
        return 'total-row';
      }
      return '';
    },

    getTripDuration(startDate, startTime, endDate, endTime) {
      let startDateTime = new Date(startDate)
      startDateTime.setHours(parseInt(startTime.slice(0,2)), parseInt(startTime.slice(3)), 0);

      let endDateTime = new Date(endDate)
      endDateTime.setHours(parseInt(endTime.slice(0,2)), parseInt(endTime.slice(3)), 0);

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
        this.getTripCost(this.startDate, this.originalEndDate, this.originalTripDuration);
      } else if (dateCategory == 'original') {
        this.form.originalEndTime = `${hours}:${minutes}`
        this.form.originalEndDate = Date()
        this.getTripCost(this.startDate, this.originalEndDate, this.originalTripDuration);
      } else if (dateCategory == 'adjusted') {
        this.form.adjustedEndTime = `${hours}:${minutes}`
        this.form.adjustedEndDate = Date()
        this.getTripCost(this.startDate, this.originalEndDate, this.adjustedTripDuration);
      }
    },

    copyInfo() {
      var element =document.getElementById('cost-table');

      var body = document.body, range, sel;
      if (document.createRange && window.getSelection) {
          range = document.createRange();
          sel = window.getSelection();
          sel.removeAllRanges();
          try {
              range.selectNodeContents(element);
              sel.addRange(range);
          } catch (e) {
              range.selectNode(element);
              sel.addRange(range);
          }
          document.execCommand("copy");

      } else if (body.createTextRange) {
          range = body.createTextRange();
          range.moveToElementText(element);
          range.select();
          range.execCommand("Copy");
      }
    }
  },

  computed: {
    originalTripDuration: function() {
      return this.getTripDuration(this.form.startDate, this.form.startTime, this.form.originalEndDate, this.form.originalEndTime);
    },

    adjustedTripDuration: function() {
      return this.getTripDuration(this.form.startDate, this.form.startTime, this.form.adjustedEndDate, this.form.adjustedEndTime);
    },

    tableData: function() {
      let originalTripCost =  this.getTripCost(this.startDate, this.originalEndDate, this.originalTripDuration);
      let adjustedTripCost = this.getTripCost(this.startDate, this.originalEndDate, this.adjustedTripDuration);
      let tableData = [{
          name: 'Total Cost Before Adjustment',
          value: '$' + originalTripCost
        }, {
          name: 'Total Cost After Adjustment',
          value: '$' + adjustedTripCost
        }, {
          name: 'Adjustment',
          value: '$' + (adjustedTripCost - originalTripCost).toFixed(2)
        }]

      return tableData;
    }
  }
}
</script>

<style>

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

</style>