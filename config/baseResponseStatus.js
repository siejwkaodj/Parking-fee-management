module.exports = {

    // 1000: Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // 2000 : Request error - 형식적 validation 에러
    PARKING_CARDIDX_EMPTY : { "isSuccess": false, "code": 2001, "message":"전달된 카드 값이 없습니다." },
    PARKING_CARDIDX_LENGTH : { "isSuccess": false, "code": 2002, "message":"카드값이 잘못되었습니다." },
    
    // Response error - 의미적 validation 에러
    PARKING_NO_CARDIDX_FOUND : { "isSuccess": false, "code": 3001, "message":"해당 idx를 가진 차량이 존재하지 않습니다." },
    PARKING_REDUNDANT_CARDIDX : { "isSuccess": false, "code": 3002, "message":"해당 번호를 가진 카드키가 이미 등록되어 있습니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "이메일이 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호 형식이 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_PASSWORD_LENGTH: { "isSuccess": false, "code": 3007, "message": "비밀번호 길이가 너무 짧습니다." },
    SIGNIN_PASSWORD_INCORRECT: { "isSuccess": false, "code": 3008, "message": "비밀번호가 일치하지 않습니다." },

    HOST_HOSTACCOUNT_UNEXIST: { "isSuccess": false, "code": 3010, "message": "존재하지 않는 호스트 계정입니다." },
    HOST_HOSTSTATUS_INACTIVE: { "isSuccess": false, "code": 3011, "message": "비활성화된 호스트 계정입니다." },
    HOST_HOSTSTATUS_DELETED: { "isSuccess": false, "code": 30012, "message": "삭제된 호스트 계정입니다." },

    ROOM_DELETED_ROOM: { "isSuccess": false, "code": 3100, "message": "이미 삭제된 게시물입니다." },
    ROOM_INACTIVE_ROOM: { "isSuccess": false, "code": 3101, "message": "비활성화된 게시물입니다." },
    ROOM_UNEXIST_ROOM: { "isSuccess": false, "code": 3102, "message": "잘못된 roomIdx입니다." },
    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
