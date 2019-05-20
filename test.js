if ((input.isMaliciousUser) == (false)) {
    if (input.userType == "1" || input.userType == "2") {
        if (input.arbitrateRate == 0) {
            return `退单`;
        }
        if ((input.arbitrateRate == 0) == (false)) {
            if (input.halfYearRedPacketAmount < 100) {
                if (input.orderRealPay) {
                    return `退单`;
                }
            }
            if ((input.halfYearRedPacketAmount < 100) == (false)) {
                if (input.backReason == 1 || input.backReason == 5) {
                    if (input.isRestaurantDispatching) {
                        if (input.orderFinishTimeoutLength > 30) {
                            if (input.orderRealPay <= 30) {
                                return `退单`;
                            }
                        }
                    }
                    if ((input.isRestaurantDispatching) == (false)) {
                        if (false) {
                            if (("申请仲裁时间超预计送达时间") == (">30min")) {
                                if (input.orderRealPay <= 30) {
                                    return `退单`;
                                }
                            }
                        }
                        if (input.orderFinishTimeoutLength > 30) {
                            if (input.orderRealPay <= 30) {
                                return `退单`;
                            }
                        }
                    }
                }
                if (input.backReason == 21) {
                    if (input.clickTimeoutLength > 30) {
                        if ((input.isRestaurantDispatching) == (false)) {
                            if (input.orderRealPay <= 30) {
                                return `退单`;
                            }
                        }
                    }
                }
            }
        }
    }
    if (input.backReason == 65) {
        if (input.refundSuccRate < 10) {
            if (input.orderRealPay <= 10) {
                return `退单`;
            }
        }
    }
    if (input.backReason == 61) {
        if (input.refundSuccRate < 10) {
            if (input.orderRealPay <= 10) {
                return `退单`;
            }
        }
    }
    if (input.backReason == 1 || input.backReason == 5) {
        if (input.isRestaurantDispatching) {
            if (input.orderFinishTimeoutLength > 30) {
                if (input.orderRealPay <= 30) {
                    return `退单`;
                }
            }
        }
        if ((input.isRestaurantDispatching) == (false)) {
            if (false) {
                if (("申请仲裁时间超预计送达时间") == (">30min")) {
                    if (input.orderRealPay <= 30) {
                        return `退单`;
                    }
                }
            }
            if (input.orderFinishTimeoutLength > 30) {
                if (input.orderRealPay <= 30) {
                    return `退单`;
                }
            }
        }
    }
    if (input.backReason == 62) {
        if (input.clickTimeoutLength > 30) {
            if (input.isRestaurantDispatching) {
                if (input.confirmSide == 'USER') {
                    if (input.refundSuccRate < 10) {
                        if (input.orderRealPay <= 30) {
                            return `退单`;
                        }
                    }
                }
            }
            if ((input.isRestaurantDispatching) == (false)) {
                return `退单`;
            }
        }
    }
    return `客服审核`;
}
if (input.isMaliciousUser) {
    return `拒绝`;
}