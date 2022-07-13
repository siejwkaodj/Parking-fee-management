module.exports = {
    // 1000: Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // 2000 : Request error - 형식적 validation 에러
    PARKING_CARDIDX_EMPTY : { "isSuccess": false, "code": 2001, "message":"전달된 카드 값이 없습니다." },
    PARKING_CARDIDX_LENGTH : { "isSuccess": false, "code": 2002, "message":"카드값이 잘못되었습니다." },
    
    // Response error - 의미적 validation 에러
    PARKING_NO_CARDIDX_FOUND : { "isSuccess": false, "code": 3001, "message":"해당 idx를 가진 차량이 존재하지 않습니다." },
    PARKING_REDUNDANT_CARDIDX : { "isSuccess": false, "code": 3002, "message":"해당 번호를 가진 카드키가 이미 등록되어 있습니다." },
    
    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
}
