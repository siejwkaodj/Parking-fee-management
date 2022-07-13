const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const parkDao = require("./parkDao");

// Provider: Read 비즈니스 로직 처리
// TODO : 만약 table 없을 경우에도 errResponse return 부분 추가. 혹은 table 수정.                                     

/**
 * API No. 1.1
 * API Name: Current Parking Car Search API
 * [GET] /park
 */
exports.readParking = async function(){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        const readParkingResult = await parkDao.selectParking(connection);
        return response(baseResponse.SUCCESS, readParkingResult);
    }catch(err){
        logger.error(`App - readParking Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
}

/**
 * API No. 1.2
 * API Name: Current Parking Car Search with cardIdx API
 * [GET] /park/:cardIdx
 */
// fee == 0인 차량만 조회, 이미 왔다 간 차량일 수도 있어서.
exports.checkParkingCar = async function(cardIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        const checkParkingCarResult = await parkDao.selectParkingCar(connection, cardIdx);
        // 의미적 validation
        if(checkParkingCarResult.length < 1){
            return errResponse(baseResponse.PARKING_NO_CARDIDX_FOUND);
        }
        return response(baseResponse.SUCCESS, checkParkingCarResult);
    }catch(err){
        logger.error(`App - checkParkingCar Provider error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
}

exports.recentParking = async function(){
    const connection = await pool.getConnection(async (conn) => conn);
    const recentParkingResult = await parkDao.selectRecentParking(connection);
    return recentParkingResult;
}