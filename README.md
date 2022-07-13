# 아두이노를 이용한 주차 자동 정산 시스템
### API List
1. 0.1 Test API
- [GET]   /park/test
2. 1.0 Car Parking Start API
- [POST]   /park/:cardIdx
3. 1.1 Current Parking Car Search API
- [GET]   /park
4. 1.2 Current Parking Car Search with cardIdx API
- [GET]   /park/:cardIdx
5. 1.3 Parking Fee Charge API
- [Patch] /park/:cardIdx

### HardWare
- Arduino Uno R3
- NFC 태그 모듈
- Esp 8266 통신 모듈

### SoftWare
- C (Arduino)
- AWS Ec2 Instance
- AWS Rds DB (MySQL)
- Node.js