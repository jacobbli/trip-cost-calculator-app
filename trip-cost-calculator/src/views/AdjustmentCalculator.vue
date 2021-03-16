<template>
  <div>
    <el-col
      :offset="4"
      :span="16">
      <adjustment-form></adjustment-form>
    </el-col>
  </div>
</template>

<script>
import AdjustmentForm from '../components/AdjustmentForm.vue'

export default {
  name: 'AdjsutmentCalculator',
  components: {
    AdjustmentForm
  }
}
</script>

<style>

</style>