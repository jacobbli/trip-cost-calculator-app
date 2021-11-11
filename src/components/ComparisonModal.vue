<template>
  <el-dialog
    :visible.sync="isVisible"
    :before-close="handleClose">
    <comparison-table :tableData="tableData" />
  </el-dialog>
</template>

<script>
import ComparisonTable from './ComparisonTable.vue'
export default {
    name: "ComparisonModal",
    components: {
        ComparisonTable
    },

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
        },
        originalCosts: {
            tripCost:Number,
            taxOnTripCost: Number,
            pvrtCost: Number,
            taxOnPvrt: Number,
            accessFeeCost: Number,
            taxOnAccessFee: Number,
        },

        adjustedCosts: {
            tripCost: Number,
            taxOnTripCost: Number,
            pvrtCost: Number,
            taxOnPvrt: Number,
            accessFeeCost: Number,
            taxOnAccessFee: Number,
        },

        originalDuration: {
            days: Date,
            hours: Date,
            minutes: Date,
            pvrtDays: Date
        },

        adjustedDuration: {
            days: Date,
            hours: Date,
            minutes: Date,
            pvrtDays: Date
        }
    },

    methods: {
        handleClose() {
            this.$emit("closeModal")
        }
    },

    computed: {
        tableData() {
            let tableData = [{
                    id: 0,
                    name: 'Trip Cost',
                    original: '$' + this.originalCosts.tripCost.toFixed(2),
                    adjusted: '$' + this.adjustedCosts.tripCost.toFixed(2),
                    originalTooltip:
                    `${this.originalDuration.days} day(s) x $${this.rates.dayRate}
                    + ${this.originalDuration.hours} hour(s) x $${this.rates.hourRate}
                    + ${this.originalDuration.minutes} minute(s) x $${this.rates.minuteRate}`,
                    adjustedTooltip:
                    `${this.adjustedDuration.days} day(s) x $${this.rates.dayRate}
                    + ${this.adjustedDuration.hours} hour(s) x $${this.rates.hourRate}
                    + ${this.adjustedDuration.minutes} minute(s) x $${this.rates.minuteRate}`
                },
                {
                    id: 1,
                    name: 'Tax on Trip Cost',
                    original: '$' + this.originalCosts.taxOnTripCost.toFixed(2),
                    adjusted: '$' + this.adjustedCosts.taxOnTripCost.toFixed(2),
                    originalTooltip:
                    `$${(this.originalCosts.tripCost * (this.taxes.gst / 100)).toFixed(2)} GST
                    + $${(this.originalCosts.tripCost * (this.taxes.pst / 100)).toFixed(2)} PST`,
                    adjustedTooltip:
                    `$${(this.adjustedCosts.tripCost * (this.taxes.gst / 100)).toFixed(2)} GST
                    + $${(this.adjustedCosts.tripCost * (this.taxes.pst / 100)).toFixed(2)} PST`
                },
                {
                    id: 2,
                    name: 'Subtotal',
                    original: '$' + (this.originalCosts.tripCost + this.originalCosts.taxOnTripCost).toFixed(2),
                    adjusted: '$' + (this.adjustedCosts.tripCost + this.adjustedCosts.taxOnTripCost).toFixed(2),
                    originalTooltip: `$${this.originalCosts.tripCost.toFixed(2)} + $${this.originalCosts.taxOnTripCost.toFixed(2)}`,
                    adjustedTooltip: `$${this.adjustedCosts.tripCost.toFixed(2)} + $${this.adjustedCosts.taxOnTripCost.toFixed(2)}`

                },
                {
                    id: 3,
                    name: 'PVRT',
                    original: '$' + this.originalCosts.pvrtCost.toFixed(2),
                    adjusted: '$' + this.adjustedCosts.pvrtCost.toFixed(2),
                    originalTooltip: `${this.originalDuration.pvrtDays} calendar days x $${this.rates.pvrtRate}`,
                    adjustedTooltip: `${this.adjustedDuration.pvrtDays} calendar days x $${this.rates.pvrtRate}`
                },
                {
                    id: 4,
                    name: 'Tax on PVRT',
                    original: '$' + this.originalCosts.taxOnPvrt.toFixed(2),
                    adjusted: '$' + this.adjustedCosts.taxOnPvrt.toFixed(2),
                    originalTooltip: `$${this.originalCosts.pvrtCost.toFixed(2)} x ${this.taxes.gst}% GST`,
                    adjustedTooltip: `$${this.adjustedCosts.pvrtCost.toFixed(2)} x ${this.taxes.gst}% GST`
                },
                {
                    id: 5,
                    name: 'Access Fee',
                    original: '$' + this.originalCosts.accessFeeCost.toFixed(2),
                    adjusted: '$' + this.adjustedCosts.accessFeeCost.toFixed(2)
                },
                {
                    id: 6,
                    name: 'Tax on Access Fee',
                    original: '$' + this.originalCosts.taxOnAccessFee.toFixed(2),
                    adjusted: '$' + this.adjustedCosts.taxOnAccessFee.toFixed(2),
                    originalTooltip:
                    `$${(this.originalCosts.accessFeeCost * (this.taxes.gst / 100)).toFixed(2)} GST
                    + $${(this.originalCosts.accessFeeCost * (this.taxes.pst / 100)).toFixed(2)} PST`,
                    adjustedTooltip:
                    `$${(this.originalCosts.accessFeeCost * (this.taxes.gst / 100)).toFixed(2)} GST
                    + $${(this.adjustedCosts.accessFeeCost * (this.taxes.pst / 100)).toFixed(2)} PST`
                },
                {
                    id: 7,
                    name: 'Total Cost',
                    original: '$' + Object.values(this.originalCosts).reduce((a, b) => a + b).toFixed(2),
                    adjusted: '$' + Object.values(this.adjustedCosts).reduce((a, b) => a + b).toFixed(2)
                }
            ]

            return tableData;
        }
    }
}
</script>

<style>

</style>