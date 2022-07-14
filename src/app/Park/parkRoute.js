module.exports = function(app){
    const park = require('./parkController');

    // 0.1 테스트 API
    app.get('/park/test', park.getTest);

    // 1.0 Car Parking Start API
    // [POST]   /park/:cardIdx
    app.get('/park/:cardIdx', park.postParking);
    
    // 1.1 Current Parking Car Search API
    // [GET]   /park
    app.get('/park', park.getCurrentParking);

    // 1.2 Current Parking Car Search with cardIdx API
    // [GET]   /park/:cardIdx
    // app.get('/park/:cardIdx', park.getParkingCar);

    // 1.3 Parking Fee Charge API
    // [Patch] /park/:cardIdx
    app.get('/park/charge/:cardIdx', park.patchCharge);

    // 2.0 DB 조회 API
    app.get('/db', park.getDB);
};