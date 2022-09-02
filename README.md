<div align="center">

  <h3>우아한테크캠프 중고거래 프로젝트 - 우아마켓</h3>


 [![title](https://img.shields.io/badge/DEVELOPER-이우철-blue)](https://github.com/woochul2)
 [![title](https://img.shields.io/badge/DEVELOPER-전별-blue)](https://github.com/jstella96)
  
  [데모 링크](http://3.38.148.41/) | [팀 위키](https://github.com/woowa-techcamp-2022/web-fleemarket-08/wiki)


</div>


# 기술 스택

### Frontend

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/recoil-f59e0b?style=for-the-badge&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">

### Backend

<img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">

### Infra

<img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white">

# 실행방법

### 1. Clone & Install Packages

```
git clone (https://github.com/woowa-techcamp-2022/web-fleemarket-08.git

cd client
npm install

cd ../server
npm install
```

### 2. Setup Environment Variables
* client root에 .env 파일 생성
```bash

REACT_APP_API_ENDPOINT=

# 깃헙 oauth
REACT_APP_GITHUB_CLIENT_ID=
REACT_APP_GITHUB_REDIRECT_URL=

```
* server root에 .env 파일 생성
```bash
# 실행 PORT
PORT=

# 데이터베이스
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

# 깃헙 oauth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLIENT_URL=

# AWS S3
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY =
AWS_REGION = 
AWS_BUCKET =
```

### 3. Run Application

```bash
cd ./client
npm run start

cd ./server
npm run start:dev
```

# ERD

![Untitled](https://user-images.githubusercontent.com/49304239/187055143-096b7c1c-3c9d-456a-ad68-6f4923af4a42.png)
