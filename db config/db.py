# 콘솔 창에 입력할 명령어들
import sqlite3 as sql
import pandas as pd
conn = sql.connect("test.db", isolation_level=None)
c = conn.cursor()

# 명령문 실행
# sqlite 버전 확인
c.execute('SELECT sqlite_version()').fetchone()[0]
# 테이블 삭제
c.execute('DROP table IF exists Parking')
# 테이블 추가
c.execute('''
CREATE TABLE Parking
(
  idx       INTEGER       PRIMARY KEY AUTOINCREMENT NOT NULL,
  -- 최종 요금
  fee       INT       NOT NULL DEFAULT 0,
  -- 차 이름
  name      TEXT      NULL    ,
  -- 최종 시간, 끝날때 따로 update
  endedAt   TIMESTAMP NOT NULL DEFAULT current_timestamp,
  createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp
  );''')
# 테이블 출력
df = pd.read_sql("SELECT * FROM Parking", conn, index_col = None)
df

# update
query = 'UPDATE 테이블명 SET 컬럼1 = 값1, 컬럼2 = 값2, ... WHERE 조건식'

# updatedat 구현
c.execute("UPDATE 테이블명 SET 컬럼명 = DATETIME('NOW') WHERE 인덱스명 = 해당 행의 인덱스.")
c.execute("UPDATE Parking SET endedAt = DATETIME('NOW') WHERE idx = id_of_row_to_be_updated.")

# 테이블 만들 때 사용한 쿼리문들
# .schema - table 구조 보고 싶을때 사용
query = 'SELECT * FROM Table1'
c.execute(query)

# ------------------------------------------------------------------
# api 실제 쿼리문
# 행 추가
query = 'INSERT INTO Parking (name) VALUES ("123")'

# endedAt 시간 찍는 쿼리
query = 'UPDATE Parking SET endedAt = DATETIME("NOW") WHERE idx = 1'

# 정산요금 찍는 쿼리
query = 'UPDATE Parking SET fee = ? WHERE idx = ?'