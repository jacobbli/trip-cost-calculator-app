<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h2>Calculate Adjustment</h2>
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
            @change='updateCosts'>
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
            @change='updateCosts'
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
            @change='updateCosts'>
          </el-date-picker>
          <el-button 
            type="text"
            @click="resetTime('original')">
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
            @change='updateCosts'
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
            @change='updateCosts'>
          </el-date-picker>
          <el-button 
            type="text"
            @click="resetTime('adjusted')">
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
            @change='updateCosts'
            prefix-icon="el-icon-time"
            controls="false">
          </el-input>
        </el-col>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <div id='adjustment-breakdown-header'>
      <h3>Details</h3>
      <el-button 
        style="float: right; padding: 3px 0" 
        type="text"
        @click="copyTicketInfo">
          Copy Ticket Information
      </el-button>
    </div>
    <el-descriptions class="margin-top" :column="1" size="medium" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          Original Duration
        </template>
        {{ 
          originalTripDuration.days + (originalTripDuration.days == 1 ? ' Day, ' : ' Days, ') + 
          originalTripDuration.hours + (originalTripDuration.hours == 1 ? ' Hour, ' : ' Hours, ') + 
          originalTripDuration.minutes + (originalTripDuration.minutes == 1 ? ' Minute' : ' Minutes')
        }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          Adjusted Duration
        </template>
        {{ 
          adjustedTripDuration.days + (adjustedTripDuration.days == 1 ? ' Day, ' : ' Days, ') + 
          adjustedTripDuration.hours + (adjustedTripDuration.hours == 1 ? ' Hour, ' : ' Hours, ') + 
          adjustedTripDuration.minutes + (adjustedTripDuration.minutes == 1 ? ' Minute' : ' Minutes')
        }}
      </el-descriptions-item>
    </el-descriptions>

    <el-table
      :data="tableData"
      class="cost-table"
      :show-header='showHeader'
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
</template>

<script>
import { calculateTripCost, calculateTripDuration } from '../helpers/tripCalculationHelper';
import { copyText } from '../helpers/ticketHelper';

export default {
  name: 'AdjustmentForm',
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
      this.updateCosts();
    }
  },

  data() {
    return {
      showHeader: false,

      form: {
        startDate: Date(),
        startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        originalEndDate: Date(),
        originalEndTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        adjustedEndDate: Date(),
        adjustedEndTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },

      originalTotalCost: 0.0,
      adjustedTotalCost: 0.0
    }
  },

  methods: {
    copyTicketInfo() {
      copyText();
    },

    getTripDuration(startDate, startTime, endDate, endTime) {
      return calculateTripDuration(startDate, startTime, endDate, endTime);
    },

    updateCosts() {
      this.originalTotalCost = 0;
      this.adjustedTotalCost = 0;

      const originalCost = calculateTripCost(this.rates, this.taxes, this.form.startDate, this.form.startTime, this.form.originalEndDate, this.form.originalEndTime);
      for (let key in originalCost) {
        this.originalTotalCost += originalCost[key]
      }

      const adjustedCost = calculateTripCost(this.rates, this.taxes, this.form.startDate, this.form.startTime, this.form.adjustedEndDate, this.form.adjustedEndTime);
      for (let key in adjustedCost) {
        this.adjustedTotalCost += adjustedCost[key]
      }
      
    },
    highlightTotals({rowIndex}) {
      if (rowIndex === 2) {
        return 'total-row';
      }
      return '';
    },

    resetTime(dateCategory) {
      const currentDate = new Date();
      if (dateCategory == 'start') {
        this.form.startTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        this.form.startDate = currentDate
      } else if (dateCategory == 'original') {
        this.form.originalEndTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        this.form.originalEndDate = currentDate
      } else if (dateCategory == 'adjusted') {
        this.form.adjustedEndTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        this.form.adjustedEndDate = currentDate
      }
      this.updateCosts();
    },
  },

  computed: {
    originalTripDuration: function() {
      return this.getTripDuration(this.form.startDate, this.form.startTime, this.form.originalEndDate, this.form.originalEndTime);
    },

    adjustedTripDuration: function() {
      return this.getTripDuration(this.form.startDate, this.form.startTime, this.form.adjustedEndDate, this.form.adjustedEndTime);
    },

    tableData: function() {
      let tableData = [{
          name: 'Total Cost Before Adjustment',
          value: this.originalTotalCost > 0 ? '$' + this.originalTotalCost.toFixed(2) : '$0.00'
        }, {
          name: 'Total Cost After Adjustment',
          value: this.adjustedTotalCost > 0 ? '$' + this.adjustedTotalCost.toFixed(2) : '$0.00'
        }, {
          name: 'Adjustment',
          value: '$' + (this.adjustedTotalCost.toFixed(2) - this.originalTotalCost.toFixed(2)).toFixed(2)
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

h3 {
  display: inline;
}

#adjustment-breakdown-header {
  margin-bottom: 10px;
}

.el-descriptions {
  margin-bottom: 15px
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

</style>