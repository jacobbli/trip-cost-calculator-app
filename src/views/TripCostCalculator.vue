<template>
  <div>
    <el-col
      :offset="4"
      :span="16">
      <calculator-form></calculator-form>
    </el-col>
  </div>
</template>

<script>
import CalculatorForm from '../components/CalculatorForm.vue'

export default {
  name: 'TripCostCalculator',
  components: {
    CalculatorForm,
  }
}
</script>

<style>

</style>