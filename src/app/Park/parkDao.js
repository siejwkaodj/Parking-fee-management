/**
 * API No. 1.0
 * API NAME: Parking Start API
 * [GET] /park/:cardIdx
 */
async function createParking(connection, cardIdx){
    const createParkingQuery = `
        INSERT INTO Parking (carName)
        VALUES (?);
    `;
    const parkingRows = await connection.query(createParkingQuery, cardIdx);
    return parkingRows;
}

/**
 * API No. 1.1
 * API Name: Current Parking Car Search API
 * [GET] /park
 */
async function selectParking(connection){
    const selectParkingQuery = `
        SELECT idx, fee, carName, createdAt, endedAt
        FROM Parking
        WHERE fee = 0;
    `
    const [selectParkingRows] = await connection.query(selectParkingQuery);
    return selectParkingRows;
}

/**
 * API No. 1.2
 * API Name: Current Parking Car Search with cardIdx API
 * [GET] /park/:cardIdx
 */
async function selectParkingCar(connection, cardIdx){
    const selectParkingCarQuery = `
        SELECT idx, fee, carName, createdAt, endedAt
        FROM Parking
        WHERE fee = 0 AND carName = ?;
    `
    const [selectParkingCarRows] = await connection.query(selectParkingCarQuery, cardIdx);
    return selectParkingCarRows;
}

/**
 * API No. 1.3
 * API Name: Parking Fee Charge API
 * [PATCH] /park/:cardIdx
 */
async function updateParkingCharge(connection, chargeParams){
    const updateParkingChargeQuery = `
        UPDATE Parking SET fee = ?
        WHERE idx = ?;
    `
    const [updateParkingChargeRows] = await connection.query(updateParkingChargeQuery, chargeParams);
    return updateParkingChargeRows;
}


  module.exports = {
    createParking,
    selectParking,
    selectParkingCar,
    updateParkingCharge
  };