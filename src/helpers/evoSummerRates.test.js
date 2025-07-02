import { expect, test } from 'vitest'
import { calculateTripCost } from './costs.js'
import { Services } from '../models/services.js'

const cases = [
    {
        days: 0,
        hours: 0,
        minutes: 0,
        solution: 0
    },
    {
        days: 0,
        hours: 0,
        minutes: 1,
        solution: 0.49
    },
    {
        days: 0,
        hours: 1,
        minutes: 0,
        solution: 17.99
    },
    {
        days: 1,
        hours: 0,
        minutes: 0,
        solution: 104.99
    },
    {
        days: 0,
        hours: 0,
        minutes: 59,
        solution: 17.99
    },
    {
        days: 0,
        hours: 23,
        minutes: 0,
        solution: 104.99
    },
    {
        days: 0,
        hours: 0,
        minutes: 36,
        solution: 17.64
    },
    {
        days: 0,
        hours: 0,
        minutes: 37,
        solution: 17.99
    },
    {
        days: 0,
        hours: 0,
        minutes: 38,
        solution: 17.99
    },
    {
        days: 0,
        hours: 5,
        minutes: 0,
        solution: 89.95
    },
    {
        days: 0,
        hours: 6,
        minutes: 0,
        solution: 104.99
    },
    {
        days: 0,
        hours: 7,
        minutes: 0,
        solution: 104.99
    },
    {
        days: 0,
        hours: 5,
        minutes: 30,
        solution: 104.65
    },
    {
        days: 0,
        hours: 5,
        minutes: 31,
        solution: 104.99
    },
    {
        days: 0,
        hours: 5,
        minutes: 32,
        solution: 104.99
    },
    {
        days: 1,
        hours: 0,
        minutes: 36,
        solution: 122.63
    },
    {
        days: 1,
        hours: 0,
        minutes: 37,
        solution: 122.98
    },
    {
        days: 1,
        hours: 0,
        minutes: 38,
        solution: 122.98
    },
    {
        days: 1,
        hours: 5,
        minutes: 0,
        solution: 194.94
    },
    {
        days: 1,
        hours: 6,
        minutes: 0,
        solution: 209.98
    },
    {
        days: 1,
        hours: 7,
        minutes: 0,
        solution: 209.98
    },
    {
        days: 1,
        hours: 5,
        minutes: 30,
        solution: 209.64
    },
    {
        days: 1,
        hours: 5,
        minutes: 31,
        solution: 209.98
    },
    {
        days: 1,
        hours: 5,
        minutes: 32,
        solution: 209.98
    },
    {
        days: 2,
        hours: 0,
        minutes: 36,
        solution: 227.62
    },
    {
        days: 2,
        hours: 0,
        minutes: 37,
        solution: 227.97
    },
    {
        days: 2,
        hours: 0,
        minutes: 38,
        solution: 227.97
    },
    {
        days: 2,
        hours: 3,
        minutes: 0,
        solution: 263.95
    },
    {
        days: 2,
        hours: 4,
        minutes: 0,
        solution: 264.99
    },
    {
        days: 2,
        hours: 5,
        minutes: 0,
        solution: 264.99
    },
    {
        days: 2,
        hours: 3,
        minutes: 2,
        solution: 264.93
    },
    {
        days: 2,
        hours: 3,
        minutes: 3,
        solution: 264.99
    },
    {
        days: 2,
        hours: 3,
        minutes: 4,
        solution: 264.99
    },
    {
        days: 3,
        hours: 0,
        minutes: 0,
        solution: 264.99
    },
    {
        days: 3,
        hours: 0,
        minutes: 36,
        solution: 282.63
    },
    {
        days: 3,
        hours: 0,
        minutes: 37,
        solution: 282.98
    },
    {
        days: 3,
        hours: 0,
        minutes: 38,
        solution: 282.98
    },

    {
        days: 3,
        hours: 5,
        minutes: 0,
        solution: 354.94
    },
    {
        days: 3,
        hours: 6,
        minutes: 0,
        solution: 369.98
    },
    {
        days: 3,
        hours: 7,
        minutes: 0,
        solution: 369.98
    },
    {
        days: 3,
        hours: 5,
        minutes: 30,
        solution: 369.64
    },
    {
        days: 3,
        hours: 5,
        minutes: 31,
        solution: 369.98
    },
    {
        days: 3,
        hours: 5,
        minutes: 32,
        solution: 369.98
    },
    {
        days: 4,
        hours: 3,
        minutes: 0,
        solution: 423.95
    },
    {
        days: 4,
        hours: 4,
        minutes: 0,
        solution: 424.99
    },
    {
        days: 4,
        hours: 5,
        minutes: 0,
        solution: 424.99
    },
    {
        days: 4,
        hours: 3,
        minutes: 2,
        solution: 424.93
    },
    {
        days: 4,
        hours: 3,
        minutes: 3,
        solution: 424.99
    },
    {
        days: 4,
        hours: 3,
        minutes: 4,
        solution: 424.99
    },
    {
        days: 5,
        hours: 0,
        minutes: 0,
        solution: 424.99
    },
    {
        days: 5,
        hours: 0,
        minutes: 36,
        solution: 442.63
    },
    {
        days: 5,
        hours: 0,
        minutes: 37,
        solution: 442.98
    },
    {
        days: 5,
        hours: 0,
        minutes: 38,
        solution: 442.98
    },

    {
        days: 5,
        hours: 5,
        minutes: 0,
        solution: 514.94
    },
    {
        days: 5,
        hours: 6,
        minutes: 0,
        solution: 529.98
    },
    {
        days: 5,
        hours: 7,
        minutes: 0,
        solution: 529.98
    },
    {
        days: 5,
        hours: 5,
        minutes: 30,
        solution: 529.64
    },
    {
        days: 5,
        hours: 5,
        minutes: 31,
        solution: 529.98
    },
    {
        days: 5,
        hours: 5,
        minutes: 32,
        solution: 529.98
    },
]


test.each(
    cases
)('Calculate trip cost using Evo summer rates', (c) => {
    expect(calculateTripCost(c, Services.CAR_SHARE.pricingSchemes[1], false)).toBe(c.solution)
})