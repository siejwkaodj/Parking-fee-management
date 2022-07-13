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
    const [parkingRows] = await connection.query(createParkingQuery, cardIdx);
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

// 최근에 추가한 차 createdAt순으로 내림차순 정렬하는 API
async function selectRecentParking(connection){
    const selectRecentParkingQuery = `
        SELECT idx, fee, carName, endedAt, createdAt
        FROM Parking
        WHERE fee = 0
        ORDER BY createdAt DESC;
    `
    const [selectRecentParkingRows] = await connection.query(selectRecentParkingQuery);
    return selectRecentParkingRows;
}

async function updateEndedAt(connection, idx){
    const updateEndedAtQuery = `
        UPDATE Parking
        SET endedAt = now()
        WHERE idx = ?;
    `
    const [updateEndedAtRows] = await connection.query(updateEndedAtQuery, idx);
    return updateEndedAtRows;
}

async function selectDB(connection){
    const selectDBQuery = `SELECT * FROM Parking;`
    const [selectDBRows] = await connection.query(selectDBQuery);
    return selectDBRows;
}
  module.exports = {
    createParking,
    selectParking,
    selectParkingCar,
    updateParkingCharge,
    selectRecentParking,
    updateEndedAt,
    selectDB
  };