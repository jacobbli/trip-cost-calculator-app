<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h2>Calculate Trip Cost</h2>
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
            @click="resetTime('start')">
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
            @click="resetTime('end')">
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

    <el-divider></el-divider>

    <div id='cost-breakdown-header'>
      <h3>Breakdown</h3>
    </div>

    <el-descriptions class="margin-top" :column="1" size="medium" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          Trip Duration
        </template>
        {{
          trip.days + (trip.days == 1 ? ' Day, ' : ' Days, ') +
          trip.hours + (trip.hours == 1 ? ' Hour, ' : ' Hours, ') +
          trip.minutes + (trip.minutes == 1 ? ' Minute' : ' Minutes')
        }}
      </el-descriptions-item>
    </el-descriptions>
    <breakdown-table :tableData="tableData"/>
  </el-card>
</template>

<script>
import { calculateTripCost, calculateTripDuration, getCurrentTime } from '../helpers/tripCalculationHelper';
import BreakdownTable from './BreakdownTable.vue'

export default {
  name: 'CalculatorForm',
  components: {
    BreakdownTable
  },
  props: {
    rates: {
      minuteRate: Number,
      hourRate: Number,
      dayRate: Number,
      pvrtRate: Number,
      accessFee: Number
    },
    taxes: {
      gst: Number,
      pst: Number
    }
  },
  watch: {
    rates: function() {
      this.totalCost = calculateTripCost(this.rates, this.taxes, this.trip);
    }
  },

  data() {
    return {
      showHeader: false,

      form: {
        startDate: Date(),
        startTime: getCurrentTime(),
        endDate: Date(),
        endTime: getCurrentTime(),
      },

      totalCost: {
        tripCost: 0,
        taxOnTripCost: 0,
        pvrtCost: 0,
        taxOnPvrt: 0,
        accessFeeCost: 0,
        taxOnAccessFee: 0,
      }
    }
  },

  methods: {
    getTripCost() {
      this.totalCost = calculateTripCost(this.rates, this.taxes, this.trip);
    },

    resetTime(dateCategory) {
      const currentDate = new Date();
      if (dateCategory == 'start') {
        this.form.startTime = getCurrentTime();
        this.form.startDate = currentDate
      } else {
        this.form.endTime = getCurrentTime();
        this.form.endDate = currentDate
      }
      this.totalCost = calculateTripCost(this.rates, this.taxes, this.trip);
    },

    highlightTotals({rowIndex}) {
      if (rowIndex === 2) {
        return 'subtotal-row';
      } else if (rowIndex === 7) {
        return 'total-row';
      }
      return '';
    },
  },

  computed: {
    trip: function() {
      let startDateTime = new Date(this.form.startDate)
      startDateTime.setHours(parseInt(this.form.startTime.slice(0,2)), parseInt(this.form.startTime.slice(3)), 0, 0);

      let endDateTime = new Date(this.form.endDate)
      endDateTime.setHours(parseInt(this.form.endTime.slice(0,2)), parseInt(this.form.endTime.slice(3)), 0, 0);

      let trip = {
        startTime: startDateTime,
        endTime: endDateTime,
        days: 0,
        hours: 0,
        minutes: 0,
        pvrtDays: 0
      }

      trip = calculateTripDuration(trip);

      return trip;
    },

    tableData: function() {
      let tableData = [{
            id: 0,
            name: 'Trip Cost',
            value: '$' + this.totalCost.tripCost.toFixed(2),
            tooltip:
              `${this.trip.days} day(s) x $${this.rates.dayRate}
              + ${this.trip.hours} hour(s) x $${this.rates.hourRate}
              + ${this.trip.minutes} minute(s) x $${this.rates.minuteRate}`
          },
          {
            id: 1,
            name: 'Tax on Trip Cost',
            value: '$' + this.totalCost.taxOnTripCost.toFixed(2),
            tooltip:
              `$${(this.totalCost.tripCost * (this.taxes.gst / 100)).toFixed(2)} GST
              + $${(this.totalCost.tripCost * (this.taxes.pst / 100)).toFixed(2)} PST`
          },
          {
            id: 2,
            name: 'Subtotal',
            value: '$' + (this.totalCost.tripCost + this.totalCost.taxOnTripCost).toFixed(2),
            tooltip: `$${this.totalCost.tripCost.toFixed(2)} + $${this.totalCost.taxOnTripCost.toFixed(2)}`
          },
          {
            id: 3,
            name: 'PVRT',
            value: '$' + this.totalCost.pvrtCost.toFixed(2),
            tooltip: `${this.trip.pvrtDays} calendar days x $${this.rates.pvrtRate}`
          },
          {
            id: 4,
            name: 'Tax on PVRT',
            value: '$' + this.totalCost.taxOnPvrt.toFixed(2),
            tooltip: `$${this.totalCost.pvrtCost.toFixed(2)} x ${this.taxes.gst}% GST`
          },
          {
            id: 5,
            name: 'Access Fee',
            value: '$' + this.totalCost.accessFeeCost.toFixed(2)
          },
          {
            id: 6,
            name: 'Tax on Access Fee',
            value: '$' + this.totalCost.taxOnAccessFee.toFixed(2),
            tooltip:
              `$${(this.totalCost.accessFeeCost * (this.taxes.gst / 100)).toFixed(2)} GST
              + $${(this.totalCost.accessFeeCost * (this.taxes.pst / 100)).toFixed(2)} PST`
          },
          {
            id: 7,
            name: 'Total Cost',
            value: '$' + Object.values(this.totalCost).reduce((a, b) => a + b).toFixed(2)
          }
      ]

      return tableData;
    }
  }
}
</script>

<style>
h2 {
  margin: 0;
}

#cost-breakdown-header {
  margin-bottom: 10px;
}

.time-input input{
  font-family: inherit;
}

.card-button {
  float: right;
  padding: 3px 0
}

.el-descriptions {
  margin-bottom: 15px
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