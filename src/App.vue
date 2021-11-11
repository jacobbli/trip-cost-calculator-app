<template>
  <div id="app">
    <el-container id="calculator-container">
      <el-main>
        <el-tabs
          v-model="activeTab"
          :before-leave='savePreviousTab'>
          <el-tab-pane label="Trip Cost" name="tripCost">
            <span slot="label"><i class="el-icon-date"></i> Trip Cost</span>
            <calculator-form
              v-bind:rates='rates'
              v-bind:taxes='taxes'>
            </calculator-form>
          </el-tab-pane>
          <el-tab-pane label="Adjustment" name="adjustment">
            <span slot="label"><i class="el-icon-refresh-left"></i> Adjustment</span>
            <adjustment-form
              v-bind:rates='rates'
              v-bind:taxes='taxes'>
            </adjustment-form>
          </el-tab-pane>
          <el-tab-pane label="Rate Settings" name="rateOptions">
            <span slot="label"><i class="el-icon-setting"></i> Rate Settings</span>
            <rate-form
              v-bind:rates='rates'
              v-bind:taxes='taxes'
              @updateRates='updateRates'>
            </rate-form>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import RateForm from './components/RateForm.vue'
import CalculatorForm from './components/CalculatorForm.vue'
import AdjustmentForm from './components/AdjustmentForm.vue'

export default {
  name: 'App',
  components: {
    CalculatorForm,
    AdjustmentForm,
    RateForm
  },

  data: function() {
    return {
      activeTab: 'tripCost',
      previousTab: 'tripCost',

      taxes: {
        gst: parseFloat(process.env.VUE_APP_DEFAULT_GST),
        pst: parseFloat(process.env.VUE_APP_DEFAULT_PST)
      },

      rates: {
        minuteRate: parseFloat(process.env.VUE_APP_DEFAULT_MINUTE_RATE),
        hourRate: parseFloat(process.env.VUE_APP_DEFAULT_HOUR_RATE),
        dayRate: parseFloat(process.env.VUE_APP_DEFAULT_DAY_RATE),
        pvrtRate: parseFloat(process.env.VUE_APP_DEFAULT_PVRT),
        accessFee: parseFloat(process.env.VUE_APP_DEFAULT_ACCESS_FEE)
      }
    }
  },

  methods: {
    savePreviousTab(activeName, oldActiveName) {
      this.previousTab = oldActiveName;
    },

    updateRates(data) {
      this.taxes = data.taxes;
      this.rates = data.rates;
      this.openMessage();
      if (!data.isReset) {
        this.activeTab = this.previousTab;
      }
    },

    openMessage() {
      this.$message({
        message: 'Rate changes saved.',
        type: 'success',
        duration: 2000
      });
    },
  }
}
</script>

<style>
#calculator-container {
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (min-width: 900px) {
  #calculator-container {
    width: 60%;
  }
}

@media only screen and (min-width: 992px) {
  #calculator-container {
    width: 50%;
  }
}

.setting-button {
  outline: none;
  border: none;
}

body {
  margin: 0;
  font-family: sans-serif;
}
</style>
