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
      <div id="action-buttons">
        <el-tooltip
          effect="dark"
          content="View detailed cost breakdown"
          placement="top">
          <el-button
            icon="el-icon-view"
            @click="openModal">
          </el-button>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="Copy information for ticket"
          placement="top">
          <el-button
            icon="el-icon-document-copy"
            @click="copyTicketInfo">
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <el-descriptions class="margin-top" :column="1" size="medium" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          Original Duration
        </template>
        {{
          originalTrip.days + (originalTrip.days == 1 ? ' Day, ' : ' Days, ') +
          originalTrip.hours + (originalTrip.hours == 1 ? ' Hour, ' : ' Hours, ') +
          originalTrip.minutes + (originalTrip.minutes == 1 ? ' Minute' : ' Minutes')
        }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          Adjusted Duration
        </template>
        {{
          adjustedTrip.days + (adjustedTrip.days == 1 ? ' Day, ' : ' Days, ') +
          adjustedTrip.hours + (adjustedTrip.hours == 1 ? ' Hour, ' : ' Hours, ') +
          adjustedTrip.minutes + (adjustedTrip.minutes == 1 ? ' Minute' : ' Minutes')
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
    <comparison-modal
      :isVisible="modalIsVisible"
      :originalCosts="originalTotalCost"
      :originalDuration="originalTrip"
      :adjustedCosts="adjustedTotalCost"
      :adjustedDuration="adjustedTrip"
      :rates="rates"
      :taxes="taxes"
      @closeModal="closeModal" />
  </el-card>
</template>

<script>
import { calculateTripCost, calculateTripDuration } from '../helpers/tripCalculationHelper';
import { copyText } from '../helpers/ticketHelper';
import ComparisonModal from './ComparisonModal.vue'

export default {
  name: 'AdjustmentForm',
  components: {
    ComparisonModal
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
      this.updateCosts();
    }
  },

  data() {
    return {
      showHeader: false,
      modalIsVisible: false,

      form: {
        startDate: Date(),
        startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        originalEndDate: Date(),
        originalEndTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        adjustedEndDate: Date(),
        adjustedEndTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },

      originalTotalCost: {
        tripCost: 0,
        taxOnTripCost: 0,
        pvrtCost: 0,
        taxOnPvrt: 0,
        accessFeeCost: 0,
        taxOnAccessFee: 0,
      },

      adjustedTotalCost: {
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
    openModal() {
      this.modalIsVisible = true;
    },

    closeModal() {
      this.modalIsVisible = false;
    },

    copyTicketInfo() {
      copyText();
    },

    updateCosts() {
      this.originalTotalCost = 0;
      this.adjustedTotalCost = 0;

      this.originalTotalCost = calculateTripCost(this.rates, this.taxes, this.originalTrip);

      this.adjustedTotalCost = calculateTripCost(this.rates, this.taxes, this.adjustedTrip);

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

    setTrip(startDate, startTime, endDate, endTime) {
      let startDateTime = new Date(startDate)
      startDateTime.setHours(parseInt(startTime.slice(0,2)), parseInt(startTime.slice(3)), 0, 0);

      let endDateTime = new Date(endDate)
      endDateTime.setHours(parseInt(endTime.slice(0,2)), parseInt(endTime.slice(3)), 0, 0);

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
    }
  },

  computed: {
    originalTrip: function() {
      return this.setTrip(this.form.startDate, this.form.startTime, this.form.originalEndDate, this.form.originalEndTime);
    },

    adjustedTrip: function() {
      return this.setTrip(this.form.startDate, this.form.startTime, this.form.adjustedEndDate, this.form.adjustedEndTime);
    },

    originalTotalCostSum: function() {
      return Object.values(this.originalTotalCost).reduce((a, b) => a + b);
    },

    adjustedTotalCostSum: function() {
      return Object.values(this.adjustedTotalCost).reduce((a, b) => a + b);
    },

    costDifference: function() {
      return (this.adjustedTotalCostSum.toFixed(2) - this.originalTotalCostSum.toFixed(2)).toFixed(2)
    },


    tableData: function() {
      let tableData = [{
          name: 'Total Cost Before Adjustment',
          value: '$' + this.originalTotalCostSum.toFixed(2)
        }, {
          name: 'Total Cost After Adjustment',
          value: '$' + this.adjustedTotalCostSum.toFixed(2)
        }, {
          name: 'Adjustment',
          value: this.costDifference >= 0 ? '$' + this.costDifference : '-$' + Math.abs(this.costDifference).toFixed(2)
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

#action-buttons {
  float: right;
  padding: 3px 0;
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