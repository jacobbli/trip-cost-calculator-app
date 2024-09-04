const CAR_SHARE = {
    name: 'CAR_SHARE',
    minuteRate: 0.49,
    hourRate: 17.99,
    dayRate: 104.99,
    accessFee: 1.25,

    isPvrtCharged: true,
    isGstCharged: true,
    isPstCharged: true
}

const EBIKE_SHARE = {
    name: 'EBIKE_SHARE',
    minuteRate: 0.35,
    subscriptionMinuteRate: 0.1,
    hourRate: 12.99,
    dayRate: 149.99,
    accessFee: 1.25,

    isPvrtCharged: false,
    isGstCharged: true,
    isPstCharged: false
}
export const Services = Object.freeze({
    CAR_SHARE:   CAR_SHARE,
    EBIKE_SHARE:  EBIKE_SHARE
});
