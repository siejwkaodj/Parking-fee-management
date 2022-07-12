const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {connect} = require("http2");
const parkProvider = require("./parkProvider");
const parkDao = require("./parkDao");
/**
 * API No. 1.0
 * API NAME: Parking Start API
 * [GET] /park/:cardIdx
 */
exports.addParking = async function(cardIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        const addParkingResult = await parkDao.createParking(connection, cardIdx);
        return response(addParkingResult);
    }catch(err){
        logger.error(`App - addParking Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
    finally{
        connection.release();
    }
}
/**
 * API No. 1.3
 * API Name: Parking Fee Charge API
 * [PATCH] /park/:cardIdx
 */
exports.editParkCharge = async function(cardIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        const checkParkingCarResult = await parkProvider.checkParkingCar(cardIdx);
        // 차량 존재하지 않을때
        if(!checkParkingCarResult.isSuccess){
            return errResponse(baseResponse.PARKING_NO_CARDIDX_FOUND);
        }else if(checkParkingCarResult.length > 1){
            // 요금 없고 등록만 된 차량 2대 이상일때
            return errResponse(baseResponse.PARKING_REDUNDANT_CARDIDX);
        }
        // 요금계산 로직
        // console.log(checkParkingCarResult);
        const idx = checkParkingCarResult.result[0].idx;
        const endedAt = checkParkingCarResult.result[0].endedAt;
        const createdAt = checkParkingCarResult.result[0].createdAt;
        const fee = 1000 + (endedAt * 1 - createdAt * 1) / 600;
        const chargeParams = [fee, idx];
        const editParkChargeResult = await parkDao.updateParkingCharge(connection, chargeParams);
        return response(baseResponse.SUCCESS, {'idx':idx, 'cardIdx':cardIdx, 'fee':fee});
    }catch(err){
        logger.error(`App - addParking Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
}