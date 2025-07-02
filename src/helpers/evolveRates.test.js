import { expect, test } from 'vitest'
import { calculateTripCost } from './costs.js'
import { Services } from '../models/services.js'

const cases = [
    {
        days: 0,
        hours: 0,
        minutes: 0,
        solution: 0,
    },
    {
        days: 0,
        hours: 0,
        minutes: 1,
        solution: 0.35,
    },
    {
        days: 0,
        hours: 1,
        minutes: 0,
        solution: 12.99,
    },
    {
        days: 1,
        hours: 0,
        minutes: 0,
        solution: 149.99,
    },
    {
        days: 0,
        hours: 0,
        minutes: 37,
        solution: 12.95,
    },
    {
        days: 0,
        hours: 0,
        minutes: 38,
        solution: 12.99,
    },
    {
        days: 0,
        hours: 0,
        minutes: 39,
        solution: 12.99,
    },
    {
        days: 0,
        hours: 11,
        minutes: 0,
        solution: 142.89,
    },
    {
        days: 0,
        hours: 12,
        minutes: 0,
        solution: 149.99,
    },
    {
        days: 0,
        hours: 13,
        minutes: 0,
        solution: 149.99,
    },
    {
        days: 0,
        hours: 11,
        minutes: 20,
        solution: 149.89,
    },
    {
        days: 0,
        hours: 11,
        minutes: 21,
        solution: 149.99,
    },
    {
        days: 0,
        hours: 11,
        minutes: 22,
        solution: 149.99,
    },
    {
        days: 1,
        hours: 0,
        minutes: 37,
        solution: 162.94,
    },
    {
        days: 1,
        hours: 0,
        minutes: 38,
        solution: 162.98,
    },
    {
        days: 1,
        hours: 0,
        minutes: 39,
        solution: 162.98,
    },
    {
        days: 1,
        hours: 11,
        minutes: 0,
        solution: 292.88,
    },
    {
        days: 1,
        hours: 12,
        minutes: 0,
        solution: 299.98,
    },
    {
        days: 1,
        hours: 13,
        minutes: 0,
        solution: 299.98,
    },
    {
        days: 1,
        hours: 11,
        minutes: 20,
        solution: 299.88,
    },
    {
        days: 1,
        hours: 11,
        minutes: 21,
        solution: 299.98,
    },
    {
        days: 1,
        hours: 11,
        minutes: 22,
        solution: 299.98
    }
]


test.each(
    cases
)('Calculate trip cost using Evolve regular rates', (c) => {
    expect(calculateTripCost(c, Services.EBIKE_SHARE.pricingSchemes[0], false)).toBe(c.solution)
})