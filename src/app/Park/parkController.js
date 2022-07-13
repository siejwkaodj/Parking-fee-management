const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const parkProvider = require("./parkProvider");
const parkService = require("./parkService");
/**
 * API No. 0.1
 * API NAME: Test API
 * [GET] /park/test
 */
exports.getTest = async function (req, res){
    return res.send(response(baseResponse.SUCCESS));
}

/**
 * API No. 1.0  
 * API Name: Car Parking Start API
 * [POST] /park/:cardIdx
 */
exports.postParking = async function(req, res){
    const cardIdx = req.params.cardIdx;
    if(!cardIdx){
        return res.send(errResponse(baseResponse.PARKING_CARDIDX_EMPTY));
    }else if(cardIdx <= 0){
        return res.send(errResponse(baseResponse.PARKING_CARDIDX_LENGTH));
    }
    const postParkingResult = await parkService.addParking(cardIdx);
    return res.send(postParkingResult);
}

/**
 * API No. 1.1
 * API Name: Current Parking Car Search API
 * [GET] /park
 */
exports.getCurrentParking = async function(req, res){
    const currentParkingResult = await parkProvider.readParking();
    return res.send(currentParkingResult);
}

/**
 * API No. 1.2
 * API Name: Current Parking Car Search with cardIdx API
 * [GET] /park/:cardIdx
 */
exports.getParkingCar = async function(req, res){
    const cardIdx = req.params.cardIdx;
    if(!cardIdx){
        return res.send(errResponse(baseResponse.PARKING_CARDIDX_EMPTY));
    }else if(cardIdx <= 0){
        return res.send(errResponse(baseResponse.PARKING_CARDIDX_LENGTH));
    }
    const parkingCarResult = await parkProvider.checkParkingCar(cardIdx);
    return res.send(parkingCarResult);
}
/**
 * API No. 1.3
 * API Name: Parking Fee Charge API
 * [PATCH] /park/:cardIdx
 */
exports.patchCharge = async function(req, res){
    const cardIdx = req.params.cardIdx;
    if(!cardIdx){
        return res.send(errResponse(baseResponse.PARKING_CARDIDX_EMPTY));
    }else if(cardIdx <= 0){
        return res.send(errResponse(baseResponse.PARKING_CARDIDX_LENGTH));
    }
    const patchChargeResult = await parkService.editParkCharge(cardIdx);
    return res.send(patchChargeResult);
}