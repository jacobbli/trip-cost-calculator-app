function calculateTripDuration(startDatetime, endDatetime) {
  if (endDatetime < startDatetime) return null

  startDatetime.setSeconds(0);
  endDatetime.setSeconds(0);
  startDatetime.setMilliseconds(0);
  endDatetime.setMilliseconds(0);

  const timezoneOffset =
    startDatetime.getTimezoneOffset() - endDatetime.getTimezoneOffset();

  const timeDifference = endDatetime - startDatetime + timezoneOffset * 60000;

  const days = Math.floor(timeDifference / 86400000);
  const hours = Math.floor(timeDifference / 3600000) - days * 24;
  const minutes =
    Math.floor(timeDifference / 60000) - days * 24 * 60 - hours * 60;

  return {
    days: parseInt(days),
    hours: parseInt(hours),
    minutes: parseInt(minutes),
  };
}

function calculatePvrtDays(tripDuration) {
  if (!tripDuration) return 0
  
  const totalMinutes =
    tripDuration.days * 1440 + tripDuration.hours * 60 + tripDuration.minutes;

  return totalMinutes > 480 ? Math.ceil(totalMinutes / 1440) : 0;
}

module.exports = {
  calculateTripDuration,
  calculatePvrtDays,
};
