function getCurrentTime() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours().toString();
  const currentMinute = currentDate.getMinutes().toString();
  return `${currentHour.padStart(2, '0')}:${currentMinute.padStart(2, '0')}`;
}

function calculateTripCost(rates, taxes, trip) {
  let tripCost = 0.0;
  let accessFeeCost = 0.0;

  tripCost += trip.days * rates.dayRate
  if (trip.hours >= 6) {
    tripCost += rates.dayRate;
  } else {
    tripCost += trip.hours * rates.hourRate;
    if (trip.minutes > 36) {
      tripCost += rates.hourRate;
    } else {
      tripCost += trip.minutes * rates.minuteRate;
    }
  }

  if (tripCost > 0) {
    accessFeeCost = rates.accessFee;
  }

  const pvrtCost = calculatePvrt(rates, trip);
  const taxOnTripCost = calculateTax(tripCost, [taxes.pst, taxes.gst]);
  const taxOnPVRT = calculateTax(pvrtCost, [taxes.gst]);
  const taxOnAccessFee = calculateTax(accessFeeCost, [taxes.pst, taxes.gst]);

  const totalCost = {
    tripCost: tripCost,
    taxOnTripCost: taxOnTripCost,
    pvrtCost: pvrtCost,
    taxOnPvrt: taxOnPVRT,
    accessFeeCost: accessFeeCost,
    taxOnAccessFee: taxOnAccessFee,
  }

  return totalCost;
}

function calculatePvrt(rates, trip) {
  const pvrtCost = trip.pvrtDays * rates.pvrtRate;

  return pvrtCost;
}

function calculatePvrtDays(trip) {
  let pvrtDays = 0

  const totalMinutes = trip.days * 1440 + trip.hours * 60 + trip.minutes

  if (totalMinutes > 480) {
    pvrtDays = Math.ceil(totalMinutes / 1440);
  }

  return pvrtDays;
}

function calculateTax(costBeforeTaxes, applicableTaxes) {
  const sumTaxes = applicableTaxes.reduce((a, b) => a + b);
  return costBeforeTaxes * sumTaxes / 100;
}

function calculateTripDuration(trip) {
  const timeDifference = trip.endTime - trip.startTime;

  if (timeDifference < 0) {
    return trip;
  }

  let days = Math.floor(timeDifference / 86400000)
  let hours = (Math.floor(timeDifference / 3600000)) - (days * 24)
  let minutes = (Math.floor(timeDifference / 60000)) - (days * 24 * 60) - (hours * 60)

  trip['days'] = days;
  trip['hours'] = hours;
  trip['minutes'] = minutes;

  let pvrtDays = calculatePvrtDays(trip)
  trip['pvrtDays'] = pvrtDays;

  return trip;
}

module.exports = {
  calculateTripCost,
  calculateTripDuration,
  getCurrentTime
}
