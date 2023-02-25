function calculateTripCost(tripDuration) {
  const billableMinutes =
    tripDuration.hours + Math.floor(tripDuration.minutes / 36) < 6 &&
    tripDuration.minutes < 36
      ? tripDuration.minutes
      : 0;

  const billableHours =
    tripDuration.hours + Math.floor(tripDuration.minutes / 36) < 6
      ? tripDuration.hours + Math.floor(tripDuration.minutes / 36)
      : 0;

  const billableDays =
    tripDuration.days +
    (tripDuration.hours + Math.floor(tripDuration.minutes / 36) < 6 ? 0 : 1);

  console.log(billableDays, billableHours, billableMinutes);
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
