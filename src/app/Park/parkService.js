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
        // validation - 이미 등록되고 자리에 있는 차가 있는 경우
        const checkParkingCarResult = await parkProvider.checkParkingCar(cardIdx);
        if(checkParkingCarResult.isSuccess){
        return errResponse(baseResponse.PARKING_REDUNDANT_CARDIDX);
    }
        // cardIdx로 차 새로 추가하는 부분
        const addParkingResult = await parkDao.createParking(connection, cardIdx);
        // 새로 추가한 차 idx 받아오는 부분 - TODO
        const addedIdx = addParkingResult.insertId;
        return response(baseResponse.SUCCESS, {'carName': cardIdx, 'added Idx':addedIdx});
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
        let checkParkingCarResult = await parkProvider.checkParkingCar(cardIdx);
        // 차량 존재하지 않을때
        if(!checkParkingCarResult.isSuccess){
            return errResponse(baseResponse.PARKING_NO_CARDIDX_FOUND);
        }else if(checkParkingCarResult.length > 1){
            // 요금 없고 등록만 된 차량 2대 이상일때
            return errResponse(baseResponse.PARKING_REDUNDANT_CARDIDX);
        }
        // 요금계산 전 endedAt 갱신 
        const idx = checkParkingCarResult.result[0].idx;
        const updateEndedAtResult = await parkDao.updateEndedAt(connection, idx);
        checkParkingCarResult = await parkProvider.checkParkingCar(cardIdx);
        
        const endedAt = checkParkingCarResult.result[0].endedAt;
        const createdAt = checkParkingCarResult.result[0].createdAt;
        let time = (endedAt * 1 - createdAt * 1) / 60000;
        time = Math.ceil(time);
        // 요금계산 로직
        const fee = 1000 + time * 100;
        const chargeParams = [fee, idx];
        
        // 정산된 요금 입력 로직
        const editParkChargeResult = await parkDao.updateParkingCharge(connection, chargeParams);
        return response(baseResponse.SUCCESS, {'idx':idx, 'cardIdx':cardIdx, 'time':time, 'fee':fee});
    }catch(err){
        logger.error(`App - addParking Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
}