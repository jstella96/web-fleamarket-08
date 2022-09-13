<div align="center">

  <h3>우아한테크캠프 중고거래 프로젝트 - 우아마켓</h3>


 [![title](https://img.shields.io/badge/DEVELOPER-이우철-blue)](https://github.com/woochul2)
 [![title](https://img.shields.io/badge/DEVELOPER-전별-blue)](https://github.com/jstella96)
  
  [데모 링크](http://3.38.148.41/) | [팀 위키](https://github.com/woowa-techcamp-2022/web-fleemarket-08/wiki)

</div>

## 화면

### 로그인 & 프로필 페이지
<div>
    <img height="600px" align=top src="https://user-images.githubusercontent.com/49304239/188262834-dffb49cf-5736-4276-9928-4acca5e194f9.png"/>
    <img height="600px" align=top src="https://user-images.githubusercontent.com/49304239/188262848-d2ff8c31-30c5-478f-af7b-d9741c82b576.png"/>
<div>

### 메인 페이지 & 무한 스크롤, 스켈레톤 로딩

<img height="600px" align=top src="https://user-images.githubusercontent.com/49304239/188263121-a02c162c-04df-475f-a1ed-93faf1a34426.png"/>

<img height="600px" align=top src="https://user-images.githubusercontent.com/76844355/186744685-d2c56b85-6dd2-4c07-84db-ccb3edc0065d.gif"/>

### 글쓰기 페이지

<img height="600px" align=top src="https://user-images.githubusercontent.com/49304239/188263594-d46b296d-e020-4d6f-af30-040b745b8736.png"/>

### 채팅 페이지

<img height="600px" align=top src="https://user-images.githubusercontent.com/49304239/188263441-16a13ee3-9c28-4fb5-8d32-681e8c330439.png"/>
<img height="600px" align=top src="https://user-images.githubusercontent.com/49304239/188263651-553f9c9c-f2cb-40bf-89b4-48b18389c7df.gif"/>

### 카테고리 & 동네 설정 페이지

<img height="600px" align=top src="https://user-images.githubusercontent.com/49304239/188263186-7a08b2ac-450e-49a3-986f-0467cd4dfc96.png"/>
<img height="600px" align=top src="https://user-images.githubusercontent.com/49304239/188263201-ff947bac-a7b8-4e99-b142-7952cb50c2ec.png"/>

### 마이 페이지

<img height="600px" align=top src="https://user-images.githubusercontent.com/49304239/188263828-4a8b3847-3d89-4660-95d8-3dbf44e8d04f.png"/>
<img height="600px" align=top src="https://user-images.githubusercontent.com/49304239/188263236-063617d3-28b5-47e4-9898-7052adb1ae3f.png"/>
<img height="600px" align=top src="https://user-images.githubusercontent.com/49304239/188263244-bdf40b1b-655f-4938-846d-c5f46a49d20c.png"/>

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

