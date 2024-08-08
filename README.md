# 프로젝트 구성

### 백엔드 (Spring Boot)
1. **패키지 구조:**
  - **"controller"** : API 엔드포인트를 정의합니다.
  - **"model"** : 데이터베이스 엔티티와 같은 데이터 모델을 정의합니다.
  - **"repository"** : 데이버베이스와의 상호작용을 처리합니다.
  - **"security"** : 보안 관련 설정과 JWT 필터를 정의합니다.
  - **"service"** : 비지니스 로직을 처리합니다.


2. **주요 파일 설명**
  - **"AuthController"** : 사용자 인증 관련 API를 제공하는 컨트롤러입니다.
    - "POST /api/auth/signup" : 회원가입
    - "POST /api/auth/login" : 로그인
    - "POST /api/auth/logout" : 로그아웃
      
  - **"User"** : 사용자 정보를 담는 엔티티입니다.
    - "id" : 사용자 ID (자동 생성)
    - "username" : 사용자 이름 (고유)
    - "password" : 비밀번호
    - "role" : 사용자 역할 (예: "ROLE_USER", "ROLE_ADMIN")
      
  - **"UserRepository"** : 데이터베이스에서 사용자 정보를 조회하는 레포지토리입니다.
    - "findByUsername(String username)" : 사용자 이름으로 사용자 조회
      
  - **"JwtService"** : JWT 생성 및 검증을 처리하는 서비스입니다.
    - **"generateToken(User user)"** : JWT 생성
    - **"extractUsername(String token)"** : 토큰에서 사용자 이름 추출
    - **"isTokenValid(String token, UserDetails userDetails)"** : 토큰 유효성 검증
      
  - **"Securityconfig"** : Spring Security 설정을 포함하는 클래스입니다.
    - 요청 URL에 대한 권한을 설정하고, JWT 인증 필터를 등록합니다.
      
  - **"WebConfig"** : CORS 설정을 담당하는 클래스입니다.
    - 프론트엔드 애플리케이션과의 통신을 허용합니다.
      
  - **"CustomUserDetailsService"** : Spring Security에서 사용자 정보를 로드하는 서비스입니다.

3. **설정**
   - **"application.properties"** :
     ```
     spring.datasource.url=jdbc:mariadb://localhost:3306/user
     spring.datasource.username=root
     spring.datasource.password=1234
     spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=false
     spring.jpa.open-in-view=false

     jwt.secret=KOhVmBdHP4dqWmVIFKoxfBxqC2H8Alfvwa8aMQhDCMs
     ```

### 프론트엔드 (React)
1. **주요 파일 설명** :
   - **"App.js"** : 애플리케이션의 주요 라우팅을 처리합니다.
     - **"/login"** : 로그인 페이지
     - **"/signup"** : 회원가입 페이지
     - **"/home"** : 일반 사용자 페이지
     - **"/admin"** : 관리자 페이지

  - **"Login"** : 로그인 페이지 컴포넌트입니다.
    - 사용자 이름과 비밀번호를 입력받아 로그인 요청을 보냅니다.
    - 로그인 성공 시 JWT를 로컬 스토리지에 저장하고, 사용자의 역할에 따라 대시보드로 리디렉션합니다.

  - **"Signup** : 회원가입 페이지 컴포넌트입니다.
    - 사용자 이름, 비밀번호, 역할을 입력받아 회원가입 요청을 보냅니다.
    - 회원가입 성공 시 로그인 페이지로 이동합니다.
   
  - **"Admin** : 관리자 페이지 컴포넌트입니다.
    - 관리자 전용 페이지로, 로그아웃 버튼이 포함되어 있습니다.
   
  - **"parseJWT"** : JWT를 디코딩하여 사용자 정보를 추출하는 합수입니다.

2. **설정** :
   - **CORS** : 프론트엔드에서 API를 호출할 때 CORS 문제가 발생할 수 있습니다. 이를 해결하기 위해 백엔드의 **"WebConfig"** 클래스에서 CORS 설정을 추가합니다.
  

### 설치 및 실행
##### 백엔드
1. **Spring Boot 애플리케이션 실행** :

   ```
   ./gradlw bootRun
   ```
  - Spring Boot 애플리케이션이 **"http://localhost:8080"** 에서 실행됩니다.

##### 프론트엔드
2. **React 프로젝트 실행** :
  - React 애플리케이션의 루트 디렉토리에서 : 

    ```
    npm install
    npm start
    ```
  - React 애플리케이션이 **"http://localhost:3000"** 에서 실행됩니다.

### 사용 방법
1. **회원가입** :
   - **"/signup"** 페이지에서 사용자 이름, 비밀번호, 역할을 입력하고 로그인합니다.
   - 성공 시 로그인 페이지로 리디렉션됩니다.
2. **로그인** :
   - **"/login"** 페이지에서 사용자 이름과 비밀번호를 입력하고 로그인합니다.
   - 성공 시 JWT를 로컬 스토리지에 저장하고, 사용자의 역할에 따라 적절한 페이지로 리디렉션됩니다.
3. **페이지 접근** :
   - **"/home"** : 일반 사용자 페이지
   - **"/admin"** : 관리자 페이지
4. **로그아웃** :
   - **"/admin"** : 페이지에서 로그아웃 버튼을 클릭하여 로그아웃합니다.

### 문제 해결
- **CORS 오류** : 프론트엔드와 백엔드 간의 CORS 문제가 발생할 수 있습니다.
                  백엔트의 **"WebConfig"** 에서 CORS 설정이 올바르게 적용되었는지 확인하세요.
- **JWT 오류** : JWT 토큰이 만료되었거나 유효하지 않은 경우, 사용자에거 다시 로그인하라는 메시지를 표시합니다.

