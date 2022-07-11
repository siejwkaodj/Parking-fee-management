# 콘솔 창에 입력할 명령어들
import sqlite3 as sql
conn = sql.connect("test.db", isolation_level=None)
c = conn.cursor()

# 명령문 실행
# sqlite 버전 확인
c.execute('SELECT sqlite_version()').fetchone()[0]
# 테이블 삭제
c.execute('DROP table IF exists table1')

c.execute('''CREATE TABLE Parking
(
  idx       INT       NOT NULL,
  -- 요금
  fee       INT       NOT NULL DEFAULT 0,
  name      TEXT      NULL    ,
  createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updatedAt TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (idx)
);
''')
c.execute()
# updatedat 구현
c.execute('UPDATE mytable SET updated = DATETIME('NOW') WHERE _id = id_of_row_to_be_updated.')

# 테이블 만들 때 사용한 쿼리문들
# .schema - table 구조 보고 싶을때 사용
query = 'SELECT * FROM Table1'
query = 'SELECT * FROM Table1'
query = 'SELECT * FROM Table1'
query = 'SELECT * FROM Table1'
