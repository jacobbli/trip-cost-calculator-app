function calculateTripCost(tripDuration) {
  const dayCost =
    parseFloat(process.env.VUE_APP_DEFAULT_DAY_RATE) * tripDuration.days +
    (tripDuration.hours >= 6
      ? parseFloat(process.env.VUE_APP_DEFAULT_DAY_RATE)
      : 0);

  const hourCost =
    (tripDuration.hours < 6
      ? parseFloat(process.env.VUE_APP_DEFAULT_HOUR_RATE) * tripDuration.hours
      : 0) +
    (tripDuration.minutes >= 36
      ? parseFloat(process.env.VUE_APP_DEFAULT_HOUR_RATE)
      : 0);

  const minuteCost =
    tripDuration.minutes < 36
      ? parseFloat(process.env.VUE_APP_DEFAULT_MINUTE_RATE) *
        tripDuration.minutes
      : 0;

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
    tripGst:
      ((totalCost + pvrtCost) * parseFloat(process.env.VUE_APP_DEFAULT_GST)) /
      100,
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
