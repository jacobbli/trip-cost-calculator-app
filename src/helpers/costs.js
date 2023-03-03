function calculateTripCost(tripDuration) {
  const minuteRateCutOff = Math.ceil(
    process.env.VUE_APP_DEFAULT_HOUR_RATE /
      process.env.VUE_APP_DEFAULT_MINUTE_RATE
  );

  const hourRateCutOff = Math.ceil(
    process.env.VUE_APP_DEFAULT_DAY_RATE / process.env.VUE_APP_DEFAULT_HOUR_RATE
  );

  const billableMinutes =
    tripDuration.hours + Math.floor(tripDuration.minutes / minuteRateCutOff) <
      hourRateCutOff && tripDuration.minutes < minuteRateCutOff
      ? tripDuration.minutes
      : 0;

  const billableHours =
    tripDuration.hours + Math.floor(tripDuration.minutes / minuteRateCutOff) <
    hourRateCutOff
      ? tripDuration.hours + Math.floor(tripDuration.minutes / minuteRateCutOff)
      : 0;

  const billableDays =
    tripDuration.days +
    (tripDuration.hours + Math.floor(tripDuration.minutes / minuteRateCutOff) <
    hourRateCutOff
      ? 0
      : 1);

  const dayCost =
    parseFloat(process.env.VUE_APP_DEFAULT_DAY_RATE) * billableDays;

  const hourCost =
    parseFloat(process.env.VUE_APP_DEFAULT_HOUR_RATE) * billableHours;

  const minuteCost =
    parseFloat(process.env.VUE_APP_DEFAULT_MINUTE_RATE) * billableMinutes;

  return {
    days: dayCost,
    hours: hourCost,
    minutes: minuteCost,
    tripCost: dayCost + hourCost + minuteCost,
  };
}

function calculatePvrtCost(pvrtDays) {
  return pvrtDays * parseFloat(process.env.VUE_APP_DEFAULT_PVRT);
}

function calculateDiscounts(isBcaaMember, tripCost) {
  return {
    bcaa: isBcaaMember ? tripCost * 0.1 : 0,
  };
}

function calculateTax(totalCost, pvrtCost, accessFeeCost) {
  return {
    tripGst: (totalCost * parseFloat(process.env.VUE_APP_DEFAULT_GST)) / 100,
    tripPst: (totalCost * parseFloat(process.env.VUE_APP_DEFAULT_PST)) / 100,
    pvrtGst: (pvrtCost * parseFloat(process.env.VUE_APP_DEFAULT_GST)) / 100,
    accessFeeGst:
      (accessFeeCost * parseFloat(process.env.VUE_APP_DEFAULT_GST)) / 100,
    accessFeePst:
      (accessFeeCost * parseFloat(process.env.VUE_APP_DEFAULT_PST)) / 100,
  };
}

module.exports = {
  calculateTripCost,
  calculateDiscounts,
  calculatePvrtCost,
  calculateTax,
};
