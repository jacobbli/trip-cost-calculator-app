function calculateTripCost(tripDuration) {
  const minuteRateCutOff = Math.ceil(
    process.env.VUE_APP_HOUR_RATE / process.env.VUE_APP_MINUTE_RATE
  );

  const hourRateCutOff = Math.ceil(
    process.env.VUE_APP_DAY_RATE / process.env.VUE_APP_HOUR_RATE
  );

  const minuteCost = calculateMinuteCost(tripDuration, minuteRateCutOff);

  const hourCost = calculateHourCost(tripDuration, minuteCost, hourRateCutOff);

  const billableDays = hourCost.overflow
    ? tripDuration.days + 1
    : tripDuration.days;

  const dayCost = parseFloat(process.env.VUE_APP_DAY_RATE) * billableDays;

  return {
    days: dayCost,
    hours: hourCost.hourCost,
    minutes: minuteCost.minuteCost,
    tripCost: dayCost + hourCost.hourCost + minuteCost.minuteCost,
  };
}

function calculateMinuteCost(tripDuration, minuteRateCutOff) {
  const minuteCost =
    parseFloat(process.env.VUE_APP_MINUTE_RATE) * tripDuration.minutes;

  const hourCost =
    parseFloat(process.env.VUE_APP_HOUR_RATE) * tripDuration.hours;

  if (
    tripDuration.minutes >= minuteRateCutOff ||
    minuteCost + hourCost >= process.env.VUE_APP_DAY_RATE
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

function calculateHourCost(tripDuration, minuteCost, hourRateCutOff) {
  const billableHours = tripDuration.hours + minuteCost.overflow;
  const hourCost = parseFloat(process.env.VUE_APP_HOUR_RATE) * billableHours;

  if (
    billableHours >= hourRateCutOff ||
    minuteCost.minuteCost + hourCost >= process.env.VUE_APP_DAY_RATE
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
function calculatePvrtCost(pvrtDays) {
  return pvrtDays * parseFloat(process.env.VUE_APP_PVRT);
}

function calculateDiscounts(isBcaaMember, tripCost) {
  return {
    bcaa: isBcaaMember ? tripCost * 0.1 : 0,
  };
}

function calculateTax(totalCost, pvrtCost, accessFeeCost) {
  return {
    tripGst: totalCost * parseFloat(process.env.VUE_APP_GST),
    tripPst: totalCost * parseFloat(process.env.VUE_APP_PST),
    pvrtGst: pvrtCost * parseFloat(process.env.VUE_APP_GST),
    accessFeeGst: accessFeeCost * parseFloat(process.env.VUE_APP_GST),
    accessFeePst: accessFeeCost * parseFloat(process.env.VUE_APP_PST),
  };
}

module.exports = {
  calculateTripCost,
  calculateDiscounts,
  calculatePvrtCost,
  calculateTax,
};
