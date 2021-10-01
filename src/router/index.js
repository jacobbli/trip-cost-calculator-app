import Vue from 'vue'
import VueRouter from 'vue-router'
import CalculatorDashboard from '../views/CalculatorDashboard.vue'
import TripCostCalculator from '../views/TripCostCalculator.vue'
import AdjustmentCalculator from '../views/AdjustmentCalculator.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/calculator',
    name: 'CalculatorDashboard',
    component: CalculatorDashboard
  },
  {
    path: '/trip-cost',
    name: 'TripCostCalculator',
    component: TripCostCalculator
  },
  {
    path: '/adjustment',
    name: 'AdjustmentCalculator',
    component: AdjustmentCalculator
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(() => {
  document.title = 'Trip Cost Calculator';
});

export default router
