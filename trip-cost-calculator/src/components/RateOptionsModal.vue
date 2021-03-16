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
          :model="form" 
          label-width="180px"
          label-position="left">
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
          <el-form-item label="PVRT">
            <el-col :span="11">
              <el-input-number 
                v-model="form.pvrt" 
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
    isVisible: Boolean
  },

  data: function() {
    return {
      form: {
        gst: 5,
        pst: 7,
        minuteRate: 0.41,
        hourRate: 14.99,
        dayRate: 89.99,
        pvrt: 1.50,
        accessFee: 1.00
      }
    }
  },

  methods: {
    cancel() {
      this.$emit('closeDialog');
    },

    confirm() {
      const payload = {
        gst: this.form.gst,
        pst: this.form.pst,
        minuteRate: this.form.minuteRate,
        hourRate: this.form.hourRate,
        dayRate: this.form.dayRate,
        pvrt: this.form.pvrt,
        accessFee: this.form.accessFee
      }
      this.$root.$emit('changeValues', payload)
      this.$emit('closeDialog');
    },

    changeValue(payload) {
      this.$root.$emit('changeValue', payload)
    }
  }
}
</script>

<style>

</style>