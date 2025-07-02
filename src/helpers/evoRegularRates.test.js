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
        hours: 5,
        minutes: 0,
        solution: 299.93
    },
    {
        days: 2,
        hours: 6,
        minutes: 0,
        solution: 314.97
    },
    {
        days: 2,
        hours: 7,
        minutes: 0,
        solution: 314.97
    },
    {
        days: 2,
        hours: 5,
        minutes: 30,
        solution: 314.63
    },
    {
        days: 2,
        hours: 5,
        minutes: 31,
        solution: 314.97
    },
    {
        days: 2,
        hours: 5,
        minutes: 32,
        solution: 314.97
    },
]


test.each(
    cases
)('Calculate trip cost using Evo regular rates', (c) => {
    expect(calculateTripCost(c, Services.CAR_SHARE.pricingSchemes[0], false)).toBe(c.solution)
})