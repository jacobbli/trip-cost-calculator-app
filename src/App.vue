<template>
  <div id="app">
    <div id="nav">
      <el-menu 
        default-active="1"
        mode="horizontal"
        background-color="#001529"
        text-color="rgba(255, 255, 255, 0.65)"
        active-text-color="#fff">
        <el-menu-item index="1">
          <router-link to="/calculator">Cost Calculator</router-link>
        </el-menu-item>
        <el-menu-item 
          @click="openSettingsDialog"
          class="setting-button">
          <i class="el-icon-setting setting-icon"></i>
        </el-menu-item>
      </el-menu>
    </div>
    <el-card>
      <el-container>
        <el-main>
            <el-row>
            <el-col 
              :span="8"
              :offset="2">
                <calculator-form
                  v-bind:rates='rates'
                  v-bind:taxes='taxes'>
                </calculator-form>
            </el-col>

            <el-col 
            :span="8"
            :offset="2">
              <adjustment-form
                v-bind:rates='rates'
                v-bind:taxes='taxes'>
              </adjustment-form>
            </el-col>
            </el-row>
        </el-main>
      </el-container>
    </el-card>
    <rate-options-modal
     :isVisible="settingDialogIsVisible"
     v-bind:rates='rates'
     v-bind:taxes='taxes'
     @closeDialog="settingDialogIsVisible = false"
     @updateRates='updateRates'></rate-options-modal>
  </div>
</template>

<script>
import RateOptionsModal from './components/RateOptionsModal.vue'
import CalculatorForm from './components/CalculatorForm.vue'
import AdjustmentForm from './components/AdjustmentForm.vue'

export default {
  name: 'App',
  components: {
    RateOptionsModal,
    CalculatorForm,
    AdjustmentForm
  },

  data: function() {
    return {
      settingDialogIsVisible: false,

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
    openSettingsDialog() {
      this.settingDialogIsVisible = true;
    },

    updateRates(data) {
      this.taxes = data.taxes;
      this.rates = data.rates;
    }
  }
}
</script>

<style>
.setting-icon {
  color: #fff !important;
}

body {
  margin: 0;
  font-family: sans-serif;
}

#nav ul{
  float: left;
  display: flex;
  justify-content: space-between;
  width: 100%
}

#nav a {
  text-decoration: none;
}
</style>
