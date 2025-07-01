import { Taxes } from "@/models/taxes";

export function calculateTripCost(tripDuration, pricingScheme, hasSubscription) {
  if (pricingScheme.subscriptionMinuteRate && hasSubscription) {
    const totalCost = parseFloat(pricingScheme.subscriptionMinuteRate) * (tripDuration.minutes + tripDuration.hours * 60 + tripDuration.days * 24 * 60);
    return {
      days: 0,
      hours: 0,
      minutes: totalCost,
      tripCost: totalCost
    }
  }

  const minuteCost = calculateMinuteCost(tripDuration, pricingScheme, hasSubscription);
  const hourCost = calculateHourCost(tripDuration, minuteCost, pricingScheme);
  const dayCost = calculateDayCost(tripDuration, hourCost, pricingScheme);

  return {
    days: dayCost.dayCost,
    hours: hourCost.hourCost,
    minutes: minuteCost.minuteCost,
    tripCost: dayCost.dayCost + hourCost.hourCost + minuteCost.minuteCost,
  };
}

function calculateMinuteCost(tripDuration, pricingScheme) {
  const minuteRateCutOff = Math.ceil(
    pricingScheme.hourRate / pricingScheme.minuteRate
  );

  const minuteCost =
    parseFloat(pricingScheme.minuteRate) * tripDuration.minutes;

  const hourCost =
    parseFloat(pricingScheme.hourRate) * tripDuration.hours;

  if (
    tripDuration.minutes >= minuteRateCutOff ||
    (pricingScheme.dayRate && minuteCost + hourCost >= pricingScheme.dayRate)
  ) {
    return {
      minuteCost: 0,
      billableMinutes: 0,
      overflow: 1,
    };
  }

  return {
    minuteCost: minuteCost,
    billableMinutes: tripDuration.minutes,
    overflow: 0,
  };
}

function calculateHourCost(tripDuration, minuteCost, pricingScheme) {
  const billableHours = tripDuration.hours + minuteCost.overflow;
  const hourCost = parseFloat(pricingScheme.hourRate) * billableHours;

  if (!pricingScheme.dayRate) {
    return {
      hourCost: hourCost + (tripDuration.days * 24 * pricingScheme.hourRate),
      billableHours: billableHours + (tripDuration.days * 24),
      overflow: 0,
    }
  }

  const hourRateCutOff = Math.ceil(
    pricingScheme.dayRate / pricingScheme.hourRate
  )

  if (
    billableHours >= hourRateCutOff ||
    minuteCost.minuteCost + hourCost >= pricingScheme.dayRate
  ) {
    return {
      hourCost: 0,
      billableHours: 0,
      overflow: 1,
    };
  }

  return {
    hourCost: hourCost,
    billableHours: billableHours,
    overflow: 0,
  };
}

function calculateDayCost(tripDuration, hourCost, pricingScheme) {
  if (!pricingScheme.dayRate) return {
    dayCost: 0,
    billableDays: 0,
    overflow: 0
  };

  const billableDays = hourCost.overflow
    ? tripDuration.days + 1
    : tripDuration.days;

  return {
    dayCost: parseFloat(pricingScheme.dayRate) * billableDays,
    billableDays: 0,
    overflow: 0
  };
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