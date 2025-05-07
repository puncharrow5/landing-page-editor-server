# 랜딩페이지 에디터 BACKEND README

![Image](https://github.com/user-attachments/assets/68865ab7-3777-417d-b513-69054ebd23f7)

## 프로젝트 소개

- 이 프로젝트는 전 직장에서 랜딩페이지 개발을 하는 경험이 종종 있었는데, 개발할 때 더 빠르고 편리하게 작업할 수 있는 방법을 고민하다가 시작된 아이디어에서 출발했습니다.
- 랜딩페이지는 구성 요소가 대체로 비슷해 개발 난이도는 낮지만, UI나 이미지가 하나만 변경되어도 개발자가 직접 수정하고 다시 배포해야 하는 번거로움이 있었습니다.
- 그래서 기획자나 디자이너도 개발자의 도움 없이 간단한 랜딩페이지를 직접 제작하거나 수정할 수 있고, 배포 없이 실시간으로 반영되는 시스템을 만들고자 했습니다.
- 이를 위해 SDUI(Server Driven UI) 기반 구조를 도입하여, 서버에서 UI를 동적으로 제어하고 빌드 및 배포 없이도 UI를 유연하게 업데이트할 수 있도록 구현했습니다.
- 전체 구조는 랜딩페이지 에디터에서 UI를 생성/수정하고, 그 정보가 백엔드에 저장된 뒤, 랜딩페이지 뷰어에서 해당 UI 정보를 기반으로 렌더링되는 방식으로 설계했습니다.
- 실제 운영 시에는 랜딩페이지 뷰어를 도메인만 다르게 설정하여 재배포 없이 여러 개의 랜딩페이지를 운영할 수 있습니다. 예를 들어, 5개의 랜딩페이지를 운영할 경우 뷰어는 하나만 배포하고, 도메인 값에 따라 백엔드에서 해당 도메인과 매칭되는 UI 정보를 전달받아 렌더링합니다.

<br>

## 프로젝트 구성

- <a href="https://github.com/puncharrow5/landing-page-editor-frontend" target="_blank">프론트엔드<a/> : 랜딩페이지 에디터 클라이언트
- <a href="https://github.com/puncharrow5/landing-page-editor-server" target="_blank">백엔드</a> : 인증, 데이터 저장, 이메일 전송 등 API 처리
- <a href="https://github.com/puncharrow5/landing-page-editor-viewer" target="_blank">웹뷰어</a> : 랜딩페이지 에디터의 결과물을 출력하는 클라이언트

<br>

## 기술 스택
### Frontend
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql">  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"> 

### Backend
<img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">   <img src="https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white"> <img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql"> <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"> 

### Database
<img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white">   <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white"> 

### DevOps
<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">   <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"> 

### Environment
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">

<br>

- NestJs 
    - 프론트엔드와 동일하게 TypeScript로 작성할 수 있으며, 개인적으로 가장 익숙한 백엔드 프레임워크이기 때문에 선택했습니다.
    - 동일한 Node.js 기반의 Express와는 달리, NestJS는 OOP(Object-Oriented Programming)를 기반으로 모듈화, 의존성 주입(DI), 데코레이터 기반의 구조적 설계를 제공합니다.
    - 이를 통해 타입 매핑, 유효성 검증, 권한/인증 처리 등의 공통 기능을 명확하고 확장성 있게 구현할 수 있습니다.
    - 또한, Code First 방식을 사용하면 TypeScript 코드로부터 GraphQL 스키마를 자동 생성할 수 있어, 유지보수가 용이하고 타입 안정성이 높다는 장점이 있습니다.

- GraphQL  
    - REST API보다 데이터 구조가 매우 유연하고, 클라이언트 주도 설계를 위한 쿼리 언어이기 때문에 SDUI 구현에 가장 적합하여 선택했습니다. 
    - 데이터를 한번에 요청하기 때문 라운드 트립(Round-trip)을 줄일 수 있습니다.
    - 강력한 타입 시스템으로 스키마를 통해 데이터를 명확하게 정의하여 런타임 에러를 감소시킬 수 있습니다.
 
- Apollo Server
    - NestJS에서 GraphQL API를 구현할 때 가장 널리 사용되고, 공식적으로도 잘 지원되는 라이브러리이기 때문에 선택했습니다.
    - 강력한 타입 기반 설계, 미들웨어 확장성, 로컬 개발을 위한 Playground 제공 등 유용한 기능들이 잘 갖춰져 있어 GraphQL 서버 구축에 가장 적합하다고 생각합니다.
 
- Prisma
    - Raw 쿼리 대신 ORM을 사용함으로써 개발 난이도를 낮추고, 코드의 가독성과 유지보수성을 향상시키기 위해 Prisma를 선택했습니다.
    - Prisma Client는 SQL 인젝션을 방지하고 최적화된 쿼리를 자동으로 생성하여 보안성과 성능 측면에서도 우수합니다.
    - 스키마 파일을 통해 데이터 모델을 명확하게 정의할 수 있으며, 마이그레이션 기능을 통해 DB 변경 사항을 안전하게 관리할 수 있습니다.

- MySQL
    - 각 UI 요소들은 명확한 스키마를 따르며, 이에 따라 정형화된 테이블 구조가 필요하기 때문에 RDB(Relational Database)인 MySQL을 선택했습니다.
    - 페이지와 이를 구성하는 컴포넌트, 스타일 등의 요소들은 서로 관계를 가지며, 이러한 구조는 Join이 필수적인 관계형 모델에 적합합니다.
    - 또한, 랜딩페이지는 변경보다 조회(Read) 비중이 높기 때문에, NoSQL보다 읽기 성능이 뛰어난 MySQL이 SDUI 기반 서비스에 유리합니다.
 
- Redis
    - 회원가입 시 발급되는 인증 코드를 일시적으로 저장하고, 일정 시간이 지나거나 인증이 완료되면 자동으로 삭제하기 위해 Redis를 사용했습니다.
    - 인증 코드는 수명이 짧고, 빠른 조회와 삭제가 필요한 데이터이기 때문에 In-memory 기반의 Key-Value 데이터베이스가 훨씬 효율적입니다.
    - TTL(Time To Live)을 설정해 자동 만료 기능을 구현했습니다.
 
- Docker
    - 개발 및 배포 환경에서 MySQL과 Redis를 각각 설치하고 관리하는 번거로움을 줄이기 위해 Docker Compose를 사용했습니다.
    - 여러 컨테이너(MySQL, Redis)를 하나의 설정 파일(docker-compose.yml)로 정의하고, 한 번의 명령어로 일괄적으로 실행 및 관리할 수 있어 운영 효율성이 높습니다.
    - Docker을 통해 로컬 개발 환경에서도 실제 배포 환경과 유사한 구조로 테스트가 가능합니다.

<br>

## ERD

![Image](https://github.com/user-attachments/assets/1a528f91-bf6c-49e9-b312-740edfc60e02)

<br/>

## 주요 기능

### [로그인]
- 로그인 성공 시, Access Token과 Refresh Token을 쿠키에 저장합니다.
- 각 페이지 로딩 및 API 요청 시, NestJS의 Guard를 사용하여 쿠키에 저장된 Access Token을 검증하고 인증 여부를 확인합니다.
    - Access Token이 만료된 경우, 쿠키에 저장된 Refresh Token을 사용하여 새로운 Access Token을 재발급합니다.
    - Refresh Token도 만료된 경우, 모든 토큰을 삭제하고 자동으로 로그아웃 처리가 이루어집니다.
- 서비스 접속 시, 미들웨어를 통해 페이지별 접근 권한을 제어합니다.
    - 로그인 상태 : 대시보드, UI 에디터 접근 가능
    = 비로그인 상태 : 로그인, 회원가입 페이지만 접근 가능

| 로그인 |
|----------|
![Image](https://github.com/user-attachments/assets/3d0c79bf-d941-4979-88a8-47f14270e381)

<br>

### [회원가입]
- 입력 항목: 이메일, 이름, 비밀번호
- 이메일 인증 절차
    - 백엔드에서 이메일 중복 검사를 진행한 후, 무작위 6자리 인증번호를 이메일로 전송합니다.
    - 인증번호는 이메일과 함께 Redis에 key-value 형태로 저장되며, 3분이 지나거나 인증이 완료되면 자동으로 삭제됩니다.
    - 사용자가 입력한 인증번호가 백엔드에 저장된 값과 일치해야만 회원가입이 완료됩니다.
- 유효성 검사
    - 프론트엔드와 백엔드 양쪽에서 유효성 검사를 수행합니다.
    - 타입 체크 및 정규표현식을 활용하여 입력값을 검증합니다.

| 회원가입 |
|----------|
![Image](https://github.com/user-attachments/assets/a169bc49-b433-458a-9ea1-57891434062d)

<br>

### [대시보드]
- 로그인 후 리다이렉트되는 메인 페이지입니다.
- 유저 프로필 정보, 관리 중인 랜딩페이지 목록, 최근 활동 내역 등을 확인할 수 있습니다.
- 랜딩페이지 목록에서 하나를 클릭하면, 해당 랜딩페이지의 UI 수정을 위한 에디터 페이지로 이동합니다.

| 대시보드 |
|----------|
![Image](https://github.com/user-attachments/assets/d941c631-5ee3-4f6c-801a-ab3334f1135f)

<br>

### [프로필]
- 사용자의 기본 정보와 권한 레벨을 확인할 수 있습니다.
- 권한 레벨
    - 1레벨 : 회원가입 직후의 기본 상태
    - 2레벨 : 랜딩페이지의 UI 수정 권한 부여
    - 3레벨 : 회원 관리 권한까지 부여됨
- 사용자는 프로필 이미지를 설정할 수 있습니다.
- 이미지 변경 후에는 유저 데이터를 즉시 refetch하여 새로고침 없이 변경 사항이 실시간으로 반영되도록 구현했습니다.

| 프로필 |
|----------|
![Image](https://github.com/user-attachments/assets/91d213c0-f817-44c1-86fe-784849da4b98)

<br>

### [로그아웃]
- 로그아웃 시, 쿠키에 저장된 Access Token과 Refresh Token을 삭제합니다.
- 이후, 사용자를 로그인 화면으로 리다이렉트합니다.

| 로그아웃 |
|----------|
![Image](https://github.com/user-attachments/assets/51922f88-f7a5-4929-ac2f-1b07529d4458)

<br>

### [활동 내역]
- 사용자의 사이트 생성, UI 수정 등 주요 활동 내역을 확인할 수 있습니다.
- 10개 단위로 데이터를 불러오며, 스크롤이 끝에 도달하면 자동으로 다음 항목을 불러오는 무한 스크롤 방식으로 구현했습니다.
- 모든 활동 내역은 사용자의 행동에 따라 자동으로 기록됩니다.

| 활동 내역 |
|----------|
![Image](https://github.com/user-attachments/assets/0a349624-fb26-4369-a587-1c5250fe047d)

<br>

### [사이트 생성/연결]
- 새로운 랜딩페이지 생성 또는 기존 랜딩페이지와 계정 연결 기능입니다.
- 사이트에 사용될 URL, 사이트 이름, 대표 이메일을 입력합니다.
- 입력된 이메일은 이후 문의 받는 이메일로 사용됩니다.

| 사이트 생성/연결 |
|----------|
![Image](https://github.com/user-attachments/assets/af61e521-7cf6-4a06-83b2-4ccef77a9a82)

<br>

### [사이트 연결 해제]
- 계정과 연결된 사이트의 연결을 해제합니다.
- 연결이 해제된 사이트는 UI 수정 권한이 사라집니다.

| 사이트 연결 해제 |
|----------|
![Image](https://github.com/user-attachments/assets/20464fdd-9d72-4476-840f-77d485e5c54d)

<br>

### [에디터]
- 랜딩페이지의 UI 수정을 위한 페이지입니다.
- 에디터 페이지에 진입하거나 수정사항을 저장할 때마다 Guard로 유저의 권한 레벨을 확인하고 인증 절차를 진행합니다.
- 랜딩페이지는 여러 개의 섹션과 섹션 내부의 컴포넌트들로 이루어져 있습니다. 각 섹션과 컴포넌트는 독립적으로 수정할 수 있습니다.
- 오른쪽 상단의 버튼에 마우스를 올리면 메뉴가 표시되며, 해당 메뉴에서 데스크탑/모바일 환경 전환, 섹션 추가, 대시보드로 이동할 수 있습니다.
- 반응형 디자인을 지원하여, 데스크탑 환경과 모바일 환경에 맞는 UI를 각각 설정할 수 있습니다.
- 헤더와 푸터는 사이트 생성 시 자동으로 생성되며, 기본적으로 제공됩니다.

| 에디터 |
|----------|
![Image](https://github.com/user-attachments/assets/ae5241df-3bde-4ec0-ae26-85c87091d0e8)

| 데스크탑 |
|----------|
![Image](https://github.com/user-attachments/assets/8d56538c-de29-4c93-a6d6-66291c83bed3)

| 모바일 |
|----------|
![Image](https://github.com/user-attachments/assets/4a12da06-3e2b-4556-9748-e62bde5fead0)

<br>

### [섹션 수정]
- 섹션의 UI를 수정하거나 삭제할 수 있습니다.
- 섹션은 일반 섹션과 문의 섹션으로 구분되며, 추후 캐러셀, 비디오 등 다양한 형태의 섹션이 추가될 예정입니다.
- 섹션 내부에 컴포넌트를 자유롭게 추가할 수 있습니다.
- 입력한 값은 화면에 즉시 반영되지만, 저장 전까지는 임시 저장 상태가 됩니.
- 리셋을 누르면 마지막으로 저장된 상태로 되돌아갑니다.
- 저장하면 변경 사항이 즉시 해당 랜딩페이지에 반영됩니다.

| 섹션 수정 |
|----------|
![Image](https://github.com/user-attachments/assets/c06ffd23-8744-4d92-891c-76d9191ef903)

<br>

### [컴포넌트 수정]
- 개별 컴포넌트의 UI를 수정하거나 삭제할 수 있습니다.
- 나머지 기능은 섹션 수정과 동일하게 동작합니다.

| 컴포넌트 수정 |
|----------|
![Image](https://github.com/user-attachments/assets/62ce17ff-a0af-4d60-91d1-813595ddafda)

<br>

## 고도화 계획
- 캐러셀, 비디오 등 다양한 유형의 섹션 추가
- 회원 목록 조회 및 권한 변경 등 회원 관리 기능 강화
- 더 직관적이고 사용자 친화적인 UI 편집 기능 제공

<br>

## 관련 프로젝트
<a href="https://github.com/puncharrow5/landing-page-editor-frontend" target="_blank">랜딩페이지 프론트엔드 리포지토리</a> 
<br/>
<a href="https://github.com/puncharrow5/landing-page-editor-viewer" target="_blank">랜딩페이지 웹뷰어 리포지토리</a>

<br>

## CONTACT
<a href="mailto:seunghyeon9696@gmail.com">![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)</a>
<a href="https://github.com/puncharrow5" target="_blank">![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)</a>
<a href="https://geode-divan-811.notion.site/a44da1efdf5b47ea8fe12a8f85b216ad" target="_blank">![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)</a>
<a href="https://www.linkedin.com/in/oh-seunghyeon-352708307" target="_blank">![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)</a>

<br/>
