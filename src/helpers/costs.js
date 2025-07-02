import { Taxes } from "../models/taxes";

export function calculateTripCost(tripDuration, pricingScheme, hasSubscription) {
  if (pricingScheme.subscriptionMinuteRate && hasSubscription) {
    const totalCost = parseFloat(pricingScheme.subscriptionMinuteRate) * (tripDuration.minutes + tripDuration.hours * 60 + tripDuration.days * 24 * 60);
    return totalCost
  }

  if (pricingScheme.label == "Summer Rates") return getTripCostBasedOnSummerRates(tripDuration, pricingScheme)

  const minuteCost = getMinuteCost(tripDuration.minutes, pricingScheme)
  const hourCost = getHourCost(tripDuration.hours, minuteCost, pricingScheme)
  const dayCost = getDayCost(tripDuration.days, hourCost, pricingScheme)

  return Math.round(dayCost * 100) / 100
}


export function calculatePvrtCost(pvrtDays, pricingScheme) {
  if (!pricingScheme.isPvrtCharged) return 0
  return pvrtDays * parseFloat(Taxes.PVRT);
}

export function calculateDiscounts(isBcaaMember, tripCost) {
  return {
    bcaa: isBcaaMember ? tripCost * 0.1 : 0,
  };
}

export function calculateTax(totalCost, pvrtCost, accessFeeCost, pricingScheme) {
  const taxes = {
    tripGst: pricingScheme.isGstCharged ? totalCost * parseFloat(Taxes.GST) : 0,
    tripPst: pricingScheme.isPstCharged ? totalCost * parseFloat(Taxes.PST) : 0,
    accessFeeGst: pricingScheme.isGstCharged ? accessFeeCost * parseFloat(Taxes.GST) : 0,
    accessFeePst: pricingScheme.isPstCharged ? accessFeeCost * parseFloat(Taxes.PST) : 0,
  }

  if (!pricingScheme.isPvrtCharged) return taxes

  return {
    ...taxes,
    pvrtGst: pvrtCost * parseFloat(Taxes.GST),
  };
}

export function getTripCostBasedOnSummerRates(tripDuration, pricingScheme) {
  const numberOfFiveDays = Math.floor(tripDuration.days / 5)
  const numberOfThreeDays = numberOfFiveDays + (tripDuration.days % 5 >= 3 ? 1 : 0)
  const regularRateDays = tripDuration.days - numberOfFiveDays - numberOfThreeDays

  const hourCost = getHourCost(tripDuration.hours, getMinuteCost(tripDuration.minutes, pricingScheme), pricingScheme)
  const lastDayCost = (((tripDuration.days + 1) % 5 == 0) || ((tripDuration.days + 1) - 3 % 5 == 0)) ? Math.min(pricingScheme.discountedDayRate, hourCost) : Math.min(pricingScheme.dayRate, hourCost)


  return Math.round((lastDayCost + regularRateDays * pricingScheme.dayRate + pricingScheme.discountedDayRate * (numberOfFiveDays + numberOfThreeDays)) * 100) / 100
}

export function getMinuteCost(minutes, pricingScheme) {
  return Math.min(pricingScheme.hourRate, minutes * pricingScheme.minuteRate)
}

export function getHourCost(hours, minuteCost, pricingScheme) {
  return Math.min(pricingScheme.dayRate, (hours * pricingScheme.hourRate) + minuteCost)
}

export function getDayCost(days, hourCost, pricingScheme) {
  return Math.min(pricingScheme.dayRate * (days + 1), pricingScheme.dayRate * days + hourCost)
}