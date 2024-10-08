import { Taxes } from "@/models/taxes";

export function calculateTripCost(tripDuration, service, hasSubscription) {
  if (service.subscriptionMinuteRate && hasSubscription) {
    const totalCost = parseFloat(service.subscriptionMinuteRate) * (tripDuration.minutes + tripDuration.hours * 60 + tripDuration.days * 24 * 60);
    return {
      days: 0,
      hours: 0,
      minutes: totalCost,
      tripCost: totalCost
    }
  }

  const minuteCost = calculateMinuteCost(tripDuration, service, hasSubscription);
  const hourCost = calculateHourCost(tripDuration, minuteCost, service);
  const dayCost = calculateDayCost(tripDuration, hourCost, service);

  return {
    days: dayCost.dayCost,
    hours: hourCost.hourCost,
    minutes: minuteCost.minuteCost,
    tripCost: dayCost.dayCost + hourCost.hourCost + minuteCost.minuteCost,
  };
}

function calculateMinuteCost(tripDuration, service) {
  const minuteRateCutOff = Math.ceil(
    service.hourRate / service.minuteRate
  );

  const minuteCost =
    parseFloat(service.minuteRate) * tripDuration.minutes;

  const hourCost =
    parseFloat(service.hourRate) * tripDuration.hours;

  if (
    tripDuration.minutes >= minuteRateCutOff ||
    (service.dayRate && minuteCost + hourCost >= service.dayRate)
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

function calculateHourCost(tripDuration, minuteCost, service) {
  const billableHours = tripDuration.hours + minuteCost.overflow;
  const hourCost = parseFloat(service.hourRate) * billableHours;

  if (!service.dayRate) {
    return {
      hourCost: hourCost + (tripDuration.days * 24 * service.hourRate),
      billableHours: billableHours + (tripDuration.days * 24),
      overflow: 0,
    }
  }

  const hourRateCutOff = Math.ceil(
    service.dayRate / service.hourRate
  )

  if (
    billableHours >= hourRateCutOff ||
    minuteCost.minuteCost + hourCost >= service.dayRate
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

function calculateDayCost(tripDuration, hourCost, service) {
  if (!service.dayRate) return {
    dayCost: 0,
    billableDays: 0,
    overflow: 0
  };

  const billableDays = hourCost.overflow
    ? tripDuration.days + 1
    : tripDuration.days;

  return {
    dayCost: parseFloat(service.dayRate) * billableDays,
    billableDays: 0,
    overflow: 0
  };
}


export function calculatePvrtCost(pvrtDays, service) {
  if (!service.isPvrtCharged) return 0
  return pvrtDays * parseFloat(Taxes.PVRT);
}

export function calculateDiscounts(isBcaaMember, tripCost) {
  return {
    bcaa: isBcaaMember ? tripCost * 0.1 : 0,
  };
}

export function calculateTax(totalCost, pvrtCost, accessFeeCost, service) {
  const taxes = {
    tripGst: service.isGstCharged ? totalCost * parseFloat(Taxes.GST) : 0,
    tripPst: service.isPstCharged ? totalCost * parseFloat(Taxes.PST) : 0,
    accessFeeGst: accessFeeCost * parseFloat(Taxes.GST),
    accessFeePst: accessFeeCost * parseFloat(Taxes.PST),
  }

  if (!service.isPvrtCharged) return taxes

  return {
    ...taxes,
    pvrtGst: pvrtCost * parseFloat(Taxes.GST),
  };
}