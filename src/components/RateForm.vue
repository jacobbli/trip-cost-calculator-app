<template>
  <el-card class="box-card">
      <div class="tip">
        Don't forget to click "Save changes" to apply any changes you've made to the rates!
      </div>
      <el-row type="flex" class="row-bg">
        <el-form 
          ref="form" 
          id='rates-form'
          :model="form" 
          label-width="180px"
          label-position="left">
          <h3>Rates</h3>
          <el-form-item label="Minute Rate">
            <el-col :span="11">
              <el-input-number 
                v-model="form.minuteRate" 
                :precision="2"
                :step="0.01"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="Hourly Rate">
            <el-col :span="11">
              <el-input-number 
                v-model="form.hourRate" 
                :precision="2"
                :step="0.01"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="Daily Rate">
            <el-col :span="11">
              <el-input-number 
                v-model="form.dayRate" 
                :precision="2"
                :step="0.01"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="PVRT">
            <el-col :span="11">
              <el-input-number 
                v-model="form.pvrtRate" 
                :precision="2"
                :step="0.1"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="Access Fee">
            <el-col :span="11">
              <el-input-number 
                v-model="form.accessFee" 
                :precision="2"
                :step="0.1"></el-input-number>
            </el-col>
          </el-form-item>

          <el-divider></el-divider>
          
          <h3>Taxes</h3>
          <el-form-item label="GST (%)">
            <el-col :span="11">
              <el-input-number 
                v-model="form.gst" 
                :precision="2"
                :step="0.1"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="PST (%)">
            <el-col :span="11">
              <el-input-number 
                v-model="form.pst" 
                :precision="2"
                :step="0.1"></el-input-number>
            </el-col>
          </el-form-item>
          <el-button @click="reset">Reset rates</el-button>
          <el-button type="primary" @click="confirm">Save changes</el-button>
        </el-form>

      </el-row>

  </el-card>
</template>

<script>
export default {
  name: 'RateForm',
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

  data: function() {
    return {
      form: {
        gst: this.taxes.gst,
        pst: this.taxes.pst,
        minuteRate: this.rates.minuteRate,
        hourRate: this.rates.hourRate,
        dayRate: this.rates.dayRate,
        pvrtRate: this.rates.pvrtRate,
        accessFee: this.rates.accessFee
      }
    }
  },

  methods: {
    reset() {
      this.form.gst = parseFloat(process.env.VUE_APP_DEFAULT_GST)
      this.form.pst = parseFloat(process.env.VUE_APP_DEFAULT_PST)
      this.form.minuteRate = parseFloat(process.env.VUE_APP_DEFAULT_MINUTE_RATE)
      this.form.hourRate = parseFloat(process.env.VUE_APP_DEFAULT_HOUR_RATE)
      this.form.dayRate = parseFloat(process.env.VUE_APP_DEFAULT_DAY_RATE)
      this.form.pvrtRate = parseFloat(process.env.VUE_APP_DEFAULT_PVRT)
      this.form.accessFee = parseFloat(process.env.VUE_APP_DEFAULT_ACCESS_FEE)
      this.updateRates(true);
    },

    confirm() {
      this.updateRates();
    },

    updateRates(isReset) {
      const data = {
        taxes: {
          gst: this.form.gst,
          pst: this.form.pst,
        },
        
        rates: {
          minuteRate: this.form.minuteRate,
          hourRate: this.form.hourRate,
          dayRate: this.form.dayRate,
          pvrtRate: this.form.pvrtRate,
          accessFee: this.form.accessFee
        },

        isReset: isReset
      }
      this.$emit('updateRates', data)
    }
  }
}
</script>

<style scoped>
.tip {
  padding: 16px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin-bottom: 15px;
}
</style>