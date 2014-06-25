sailsjs_sample
=============

root cmd : 
```
# yum nodejs/npm 
rpm -ivh http://ftp.riken.jp/Linux/fedora/epel/6/x86_64/epel-release-6-8.noarch.rpm
yum install -y nodejs npm --enablerepo=epel
yum install -y git

# postgres simple install
wget http://ftp.postgresql.org/pub/source/v9.3.3/postgresql-9.3.3.tar.gz
yum -y install readline-devel zlib-devel bison flex openssl-devel
gunzip postgresql-9.3.3.tar.gz
tar xf postgresql-9.3.3.tar
cd postgresql-9.3.3cd postgresql-9.3.3
cd postgresql-9.3.3
./configure      --prefix=/usr/local/postgresql-9.3.3      --with-openssl
gmake && gmake install
ln -s /usr/local/postgresql-9.3.3 /usr/local/pgsql
adduser postgres
adduser www

mkdir /usr/local/pgsql/data
chown postgres. /usr/local/pgsql/data
chmod 777 /var/log/

# iptables stop 
/etc/init.d/iptables stop

```

postgres cmd :

```
initdb /usr/local/pgsql/data
pg_ctl -w start -D /usr/local/pgsql/data -l /var/log/postgres.log
createdb toto
createuser www
psql toto

```

DB migration :
```
INSERT INTO master VALUES ('E1', 'Group E 1位', 9, '2014-06-23 11:09:59.627047+09', '2014-06-23 11:09:59.627047+09');
INSERT INTO master VALUES ('E2', 'Group E 2位', 10, '2014-06-23 11:09:59.630689+09', '2014-06-23 11:09:59.630689+09');
INSERT INTO master VALUES ('F2', 'Group F 2位', 12, '2014-06-23 11:09:59.637687+09', '2014-06-23 11:09:59.637687+09');
INSERT INTO master VALUES ('G1', 'Group G 1位', 13, '2014-06-23 11:09:59.643269+09', '2014-06-23 11:09:59.643269+09');
INSERT INTO master VALUES ('G2', 'Group G 2位', 14, '2014-06-23 11:09:59.649024+09', '2014-06-23 11:09:59.649024+09');
INSERT INTO master VALUES ('H2', 'Group H 2位', 16, '2014-06-23 11:09:59.658941+09', '2014-06-23 11:09:59.658941+09');
INSERT INTO master VALUES ('A1', 'ブラジル（Group A 1位）', 1, '2014-06-23 11:06:03.435409+09', '2014-06-25 18:24:50.119993+09');
INSERT INTO master VALUES ('A2', 'メキシコ（Group A 2位）', 2, '2014-06-23 11:06:54.013503+09', '2014-06-25 18:24:55.559999+09');
INSERT INTO master VALUES ('B1', 'オランダ（Group B 1位）', 3, '2014-06-23 11:09:59.601828+09', '2014-06-25 18:24:58.798922+09');
INSERT INTO master VALUES ('B2', 'チリ（Group B 2位）', 4, '2014-06-23 11:09:59.605242+09', '2014-06-25 18:25:04.016013+09');
INSERT INTO master VALUES ('C1', 'コロンビア（Group C 1位）', 5, '2014-06-23 11:09:59.612826+09', '2014-06-25 18:25:05.358959+09');
INSERT INTO master VALUES ('C2', 'ギリシャ（Group C 2位）', 6, '2014-06-23 11:09:59.615981+09', '2014-06-25 18:25:08.032868+09');
INSERT INTO master VALUES ('D1', 'コスタリカ（Group D 1位）', 7, '2014-06-23 11:09:59.620043+09', '2014-06-25 18:25:09.552974+09');
INSERT INTO master VALUES ('D2', 'ウルグアイ（Group D 2位）', 8, '2014-06-23 11:09:59.623129+09', '2014-06-25 18:25:11.096007+09');
INSERT INTO master VALUES ('F1', 'アルゼンチン（Group F 1位）', 11, '2014-06-23 11:09:59.63423+09', '2014-06-25 18:25:17.696014+09');
INSERT INTO master VALUES ('H1', 'ベルギー（Group H 1位）', 15, '2014-06-23 11:09:59.654208+09', '2014-06-25 18:25:19.672014+09');

-- flush ranking 
CREATE OR REPLACE FUNCTION FLUSH_RANKING()
RETURNS void AS
$$
BEGIN
    DELETE FROM ranking;
    INSERT INTO ranking (rank,name,score,"createdAt", "updatedAt") SELECT rank,name,score,now(),now() FROM ranking_base;
END
$$
LANGUAGE plpgsql;


-- ranking base view 
CREATE VIEW ranking_base AS (
SELECT 
row_number() over() as rank,*
FROM (
    SELECT  u.name, SUM(bet*odds) as score
    FROM
    (
        SELECT 
            id,
            name,
            UNNEST(ARRAY['A1','A2','B1','B2','C1','C2','D1','D2','E1','E2','F1','F2','G1','G2','H1','H2']) AS master_code,
            UNNEST(ARRAY["A1","A2","B1","B2","C1","C2","D1","D2","E1","E2","F1","F2","G1","G2","H1","H2"]) AS bet
        FROM 
        (
            SELECT
            id,
            name,
            (bet->>'A1')::int AS "A1",
            (bet->>'A2')::int AS "A2",
            (bet->>'B1')::int AS "B1",
            (bet->>'B2')::int AS "B2",
            (bet->>'C1')::int AS "C1",
            (bet->>'C2')::int AS "C2",
            (bet->>'D1')::int AS "D1",
            (bet->>'D2')::int AS "D2",
            (bet->>'E1')::int AS "E1",
            (bet->>'E2')::int AS "E2",
            (bet->>'F1')::int AS "F1",
            (bet->>'F2')::int AS "F2",
            (bet->>'G1')::int AS "G1",
            (bet->>'G2')::int AS "G2",
            (bet->>'H1')::int AS "H1",
            (bet->>'H2')::int AS "H2"
            FROM "user"
        ) as user_bet
    ) as u,
    issue i 
    WHERE u.bet IS NOT NULL AND u.master_code = i.master_code GROUP BY u.id,u.name
    ORDER BY score DESC
) as score
);

```

user edit 
```
git clone https://github.com/kenichiroMori/sailsjs_sample.git
sails new toto
cd toto
cp -pr ../sailsjs_sample/* .
npm install

vi custom.js
sails lift > /tmp/sails.log &

