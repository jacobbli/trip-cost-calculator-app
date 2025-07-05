function round(number, decimalPlaces = 2) {
    const scaler = Math.pow(10, decimalPlaces)
    return Math.round(number * scaler) / scaler
}

module.exports = {
  round
};
