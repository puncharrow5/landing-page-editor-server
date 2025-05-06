# 랜딩페이지 에디터 BACKEND README


## 프로젝트 소개

- 이 프로젝트는 전 직장에서 랜딩페이지 개발을 하는 경험이 종종 있었는데, 개발할 때 더 빠르고 편리하게 작업할 수 있는 방법을 고민하다가 시작된 아이디어에서 출발했습니다.
- 랜딩페이지는 구성 요소가 대체로 비슷해 개발 난이도는 낮지만, UI나 이미지가 하나만 변경되어도 개발자가 직접 수정하고 다시 배포해야 하는 번거로움이 있었습니다.
- 그래서 기획자나 디자이너도 개발자의 도움 없이 간단한 랜딩페이지를 직접 제작하거나 수정할 수 있고, 배포 없이 실시간으로 반영되는 시스템을 만들고자 했습니다.
- 이를 위해 SDUI(Server Driven UI) 기반 구조를 도입하여, 서버에서 UI를 동적으로 제어하고 빌드 및 배포 없이도 UI를 유연하게 업데이트할 수 있도록 구현했습니다.

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

## 주요 기능
