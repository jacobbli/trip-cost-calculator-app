<template>
  <div>
    <el-row>
    <el-col 
      :span="8"
      :offset="2">
        <calculator-form>
        </calculator-form>
    </el-col>

    <el-col 
    :span="8"
    :offset="2">
      <adjustment-form>
      </adjustment-form>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import CalculatorForm from '../components/CalculatorForm.vue'
import AdjustmentForm from '../components/AdjustmentForm.vue'

export default {
  name: 'CostCalculator',
  components: {
    CalculatorForm,
    AdjustmentForm
  }
}
</script>

<style>

</style>