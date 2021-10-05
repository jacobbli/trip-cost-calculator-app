<template>
  <el-dialog
    title="Change Default Values"
    :visible="isVisible"
    width="30%"
    @close="cancel">
    <span>
      <el-row type="flex" class="row-bg" justify="center">
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
          <el-form-item label="GST">
            <el-col :span="11">
              <el-input-number 
                v-model="form.gst" 
                :precision="2"
                :step="0.1"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="PST">
            <el-col :span="11">
              <el-input-number 
                v-model="form.pst" 
                :precision="2"
                :step="0.1"></el-input-number>
            </el-col>
          </el-form-item>
        </el-form>
      </el-row>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">Cancel</el-button>
      <el-button type="primary" @click="confirm">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'RateOptionsModal',
  props: {
    isVisible: Boolean,
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
    cancel() {
      this.$emit('closeDialog');
    },

    confirm() {
      this.updateRates();
      this.$emit('closeDialog');
    },

    updateRates() {
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
        }
      }
      this.$emit('updateRates', data)
    }
  }
}
</script>

<style>

</style>