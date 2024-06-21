# 팀 차르봄바 - 50Mt으로 너에게 닿기를의 백오피스 프로젝트

![썸네일](./imgs/thumbnail.png)

## 프로젝트 소개

- 프로젝트 이름 : 너집앞 (너네 집 앞으로 50Mt의 정성으로 간다)
- 내용 : 현재 서비스 중인 “당근 마켓” 사이트를 오마주 하여 뉴스피드 프로젝트
- 구분 : 팀 프로젝트
- GitHub : https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed
- 시연 영상 : https://youtu.be/Uo9lumzJrsI
- 배포 : https://currypang.shop/

<br>

## 팀원 구성

- 팀장(총통) : 복광수 [@KwangSoo1555](https://github.com/KwangSoo1555)
- 팀원(사령관) : 김영규 [@ykyu99](https://github.com/ykyu99)
- 팀원(총장) : 이강산 [@KangSanLee24](https://github.com/KangSanLee24)
- 팀원(special agent) : 서동현 [@lucetaseo](https://github.com/lucetaseo)


<br>

## 1. 개발 기간

- 2024.06.17 ~ 2024.06.21

<br>

## 2. 개발 환경

- 운영체제 : Window/Mac
- FrontEnd : X
- BackEnd : Node.js, Express, MySQL(Prisma), socket.io
- Tool : Visual Studio Code, Insomnia
- Publish : PM2, AWS/RDS, AWS/EC2, AWS/load balancer, AWS/S3

<br>

## 3. 역할 분배

- **복광수**
  - 회원가입 기능, 로그인, 로그아웃  API
  - nodemailer를 이용한 이메일 인증 API
  - 토큰 재발급 및 미들웨어 API 레이어 패턴 적용
  - 내 정보 조회 및 수정 API
  - 소셜 로그인 API
  - passport를 이용한 네이버 소셜 로그인
- **김영규**
  - 가게 메뉴 소개 페이지 (사장님 권한) CRUD
  - 가게 검색, 및 랭킹 정렬기능
  - 리뷰, 평점 카운트
  - 유저 권한 변경
- **이강산**
  - 고객 리뷰 페이지 CRUD
  - 고객 주문하기(+point 나감)
  - 사장 주문 상태 변경하기 (+point들어옴)
  - AWS S3 구성 및 설정, 배포
  - ERD 작성 및 테이블 스키마 설계
  - 팔로우, 언팔로우 기능
- **서동현**
  - 게시물 댓글 CRUD
  - 게시물 댓글 좋아요/좋아요 취소

<br>

## 4. API 명세서 및 ERD, 와이어 프레임

- API 명세서 : https://www.notion.so/teamsparta/50-Mt-eb0e8d159d6347ef921fab11e7a95224
- ERD : https://www.erdcloud.com/d/MmTMgZ2oNvapcnbJj
- 와이어프레임 : https://www.figma.com/design/AB9wrnnmUfue8ReWL9VpMZ/5th-backoffice?node-id=0-1&t=Do5HTd2i4ItIbx92-1

![와이어프레임](./imgs/wireframe.jpg)

<br>

## 5. 주요 기능 및 설명

### 5-1. 이메일 인증 API

- 회원 가입을 위한 이메일 인증 코드를 반환하는 API입니다.

- 이메일 가입 시 이메일 인증을 위한 Nodemailer와 같은 패키지를 사용했습니다.

- nodemailer.createTransport() 메서드를 통해 메일 발송을 위한 객체를 생성합니다.

- codeObject라는 인증 코드 객체를 통해서 코드의 유효 여부를 판단합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/auth.router.js#L19

![회원가입 이메일 인증](./imgs/2-sign-up-email.png)

<br>

### 5-2. 회원가입 API

- **이메일, 비밀번호, 비밀번호 확인, 별명, 전화번호, 생년월일, 이메일 인증 코드**를 Request Body(**`req.body`**)로 전달 받습니다.

- **보안을 위해 비밀번호는** 평문(Plain Text)으로 저장하지 않고 `Hash` 된 값을 저장합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/auth.router.js#L23

![회원가입 API](./imgs/1-sign-up.png)

<br>

### 5-3. 로그인 API

- **이메일, 비밀번호**를 Request Body(**`req.body`**)로 전달 받습니다.

- **AccessToken(Payload**에 `사용자 ID`를 포함하고, **유효기한**이 `12시간`)을 생성합니다.

- **RefreshToken(Payload**에 `사용자 ID`를 포함하고, **유효기한**이 `7일`)을 생성합니다.

- **AccessToken**와**RefreshToken**을 반환합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/auth.router.js#L26

![로그인 API](./imgs/3-sign-in.png)

<br>


### 5-4. 네이버 소셜 로그인 API

- `OAuth`를 이용한 로그인 API입니다.

- 외부의 로그인 인증 수단을 사용하기 위해 `passport` 모듈을 사용했습니다.

- 사용하기 위해서는 https://developers.naver.com/ 에서 애플리케이션을 등록해야 합니다.

- 로그인 과정

  - `/auth/naver` 라우터를 통해 로그인 요청이 들어오면 `passport.authenticate` 메서드 호출합니다.
  - `naverStrategy 전략` 실행해서 데이터베이스에 사용자 정보를 등록합니다
  - `사용자 ID`를 담은 `JWT 토큰`을 생성해서 클라이언트에게 반환합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/passport.router.js

![네이버 소셜 로그인 API](./imgs/5-naver-social.png)

<br>

### 5-5. 토큰 재발급 API

- `Refresh Token`를 새롭게 발급 API입니다.

- 다른 API와는 다르게 `Refresh Token`을 `헤더`로 받아와서 `DB에 있는 토큰`과 비교합니다.

- 토큰 유효성 검사가 통과하면 새로운 Refresh 토큰을 재발급 받습니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/middlewares/require-refresh-token.middleware.js

![토큰 재발급 API](./imgs/8-token-reissue.png)

<br>

### 5-6. 로그아웃 API

- 로그인한 사용자가 로그아웃 하는 API입니다.

- refreshTokenValidator 통해서 로그인한 사용자의 Refresh Token를 검증합니다.

- 토큰 유효성 검사가 통과하면 DB에 있는 기존 Refresh Token을 null값으로 변경합니다.

- 즉, Refresh Token을 폐기하는 것입니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/auth.router.js#L29

![로그 아웃 API](./imgs/9-sign-out.png)

<br>

### 5-7. 내 정보 조회 API

- 로그인한 사용자의 정보를 조회하는 API입니다.

- `accessTokenValidator`를 통해서 로그인한 사용자의 `Access Token를 검증`합니다.

- 토큰 유효성 검사가 통과하면 `req.user`를 통해 사용자의 정보를 가져옵니다.

- 그대로 조회한 사용자 데이터를 반환합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/users.router.js#L19

![사용자 조회 API](./imgs/6-user-information.png)

<br>

### 5-8. 내 정보 수정 API

- 사용자의 정보를 수정하는 API입니다.

- `이메일, 이름, 수정할 비밀번호, 현재 비밀번호, 전화번호, 주소`를 `req.body`를 통해 받아옵니다.

- 사용자 프로필 사진은 `multer`를 이용해 `AWS S3`에 저장합니다.

- `newPassword(수정할 비밀번호)`가 입력되어 들어올 때만 비밀번호를 수정합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/users.router.js#L21

![사용자 정보 수정 API](./imgs/7-user-update.png)

<br>

### 5-9. 내 권한 수정 API

- 사용자의 권한을 수정하는 API입니다.

- `액세스 토큰을 통헤 추출한 유저정보`를 `req.user`를 통해 받아옵니다.

- 받아온 유저정보를 통헤 사용자의 권한을 변경합니다. (CUSTOMER, OWNER)

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/users.router.js#L25

![사용자 정보 수정 API](./imgs/7-user-update.png)

<br>

### 5-10. 주문 내역 조회 API

- 사용자의 주문내역을 조회하는 API입니다.

- `액세스 토큰을 통헤 추출한 유저정보를`를 `req.user`를 통해 받아옵니다.

- 받아온 유저정보를 통헤 사용자의 주문내역을 조회합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/users.router.js#L28

![사용자 정보 수정 API](./imgs/7-user-update.png)

<br>

### 5-11. 지역 검색 API

- 검색하고자 하는 지역을 입력 받아 관련 가게 목록을 정렬하는 API입니다.

- `지역명`을 `req.param`를 통해 받아옵니다.

- 지역에 속한 가게를 이름 순으로 정렬합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/search.router.js#L15

![게시물 생성 API](./imgs/12-trade-create.png)

<br>

### 5-12. 업체명 검색 API

- 검색하고자 하는 업체명을 입력 받아 관련 가게 목록을 정렬하는 API입니다.

- `업체명`을 `req.param`를 통해 받아옵니다.

- 업체명이 포함된 가게를 이름 순으로 정렬합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/search.router.js#L17

![게시물 생성 API](./imgs/12-trade-create.png)

<br>

### 5-13. 키워드 검색 API

- 검색하고자 하는 키워드를 입력 받아 관련 가게 목록을 정렬하는 API입니다.

- `키워드`를 `req.param`를 통해 받아옵니다.

- 키워드가 포함된 가게를 이름 순으로 정렬합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/search.router.js#L19

![게시물 생성 API](./imgs/12-trade-create.png)

<br>

### 5-14. 키워드 별 평점 랭킹 API

- 검색하고자 하는 키워드를 입력 받아 관련 가게 목록을 평점순으로 정렬하는 API입니다.

- `키워드`를 `req.param`를 통해 받아옵니다.

- 키워드가 포함된 가게를 평점 순으로 정렬합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/search.router.js#L21

![게시물 생성 API](./imgs/12-trade-create.png)

<br>


### 5-15. 주문상태 수정 API

- 판매할 상품의 정보를 입력 받아 게시물을 생성하는 API입니다.

- `주문 id, 게시물 내용, 상품 가격, 판매 지역`을 `req.body`를 통해 받아옵니다.

- `주문 id`을 `req.param`를 통해 받아옵니다.

- `상품 사진`들은 파일을 업로드해서 보내면 `multer 객체`를 통해 `AWS S3에 URL 형태`로 저장됩니다.

- `상품 사진의 URL`은 `req.files`를 통해서 가져옵니다.

- 상품 사진은 필수로 첨부해야 합니다.

- https://github.com/KwangSoo1555/sparta-5th-week-backoffice/blob/dev/src/routers/stores.router.js#L22

![게시물 생성 API](./imgs/12-trade-create.png)

<br>

### 5-11. 게시물 목록 조회 API

- 판매 등록된 상품의 정보 목록을 조회하는 API입니다.

- 일종의 `뉴스피드`, 모든 사용자들이 올리는 게시물을 보는 기능입니다.

- 기본적으로는 `시간 순`으로 정렬되며, `like 쿼리`를 통해 `좋아요 순`으로 정렬이 가능합니다.

- 상품들의 데이터 조회 시 관계가 설정된 `tradePicture 테이블`에서 `이미지 URL`를 반복해서 가져옵니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/trade.router.js#L67

![게시물 목록조회-기본값 API](./imgs/13-trade-list-default.png)
![게시물 목록조회 - sort API](./imgs/14-trade-list-sort.png)
![게시물 목록조회 - like API](./imgs/15-trade-list-like.png)
![게시물 목록조회 - follow API](./imgs/16-trade-list-follow.png)

<br>

### 5-12. 게시물 상세 조회 API

- 게시물의 상세한 정보를 조회하는 API입니다.

- 목록 조회와는 다르게 게시물의 `내용`도 포함하여 출력합니다.

- `상품 게시물의 ID`는 `req.params`를 통해 URL에서 가져옵니다.

- 상품들의 데이터 조회 시 관계가 설정된 `tradePicture 테이블`에서 `이미지 URL`를 반복해서 가져옵니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/trade.router.js#L131

![게시물 상세 조회 API](./imgs/17-trade-detail.png)

<br>

### 5-13. 게시물 수정 API

- 상품 게시물의 정보를 수정하는 API입니다.

- 상품 게시물 작성과 마찬가지로 `게시물 제목, 게시물 내용, 상품 가격, 판매 지역`을 `req.body`를 통해 받아옵니다.

- 위 내용은 필수로 받아오는 게 아니라 `일부만 수정이 가능`합니다.

- `트랜젝션`을 사용해서 `게시물 데이터의 수정과 상품 사진 URL의 삭제, 새로 생성`을 진행합니다.

- 이미지 개수가 다를 수도 있고 어떤 이미지가 어떤 이미지로 수정되는지 알 방법이 없기 때문입니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/trade.router.js#L167

![게시물 수정 API](./imgs/18-trade-update.png)

<br>

### 5-14. 게시물 삭제 API

- 상품 게시물을 선택해서 삭제하는 API입니다.

- `상품 게시물의 ID`는 `req.params`를 통해 URL에서 가져옵니다.

- 해당 ID를 조회하고 삭제를 진행합니다. `(Hard Delete)`

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/trade.router.js#L238

![게시물 삭제 API](./imgs/19-trade-delete.png)

<br>

### 5-15. 게시물 좋아요 API

- 상품 게시물에 좋아요를 할 수 있는 API입니다.

- `상품 게시물의 ID`는 `req.params`를 통해 URL에서 가져옵니다.

- 사용자 본인의 게시글에 좋아요를 누르거나, 이미 좋아요를 누른 경우 에러를 반환합니다.

- `N:M 관계`를 `암시적 테이블`로 연결하기 위해 `connect 절`을 사용해서 테이블을 연결했습니다.

- `좋아요 취소 API`는 로직이 거의 동일하기에 작성하지 않았습니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/trade.router.js#L271

![게시물 좋아요 API](./imgs/20-trade-like.png)
![게시물 좋아요 취소 API](./imgs/21-trade-unlike.png)

<br>

### 5-16. 댓글 생성 API

- 해당 상품 게시물에 댓글을 작성하는 API입니다.

- `accessTokenValidator 미들웨어`를 통해 생성된 `req.user`에서 로그인한 사용자의 ID를 가져옵니다.

- `상품 게시물의 ID`는 `req.params`를 통해 URL에서 가져옵니다.

- `댓글 내용`을 `req.body`를 통해 가져옵니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/comment.router.js#L12

![댓글 생성 API](./imgs/22-comment-create.png)

<br>

### 5-17. 댓글 조회 API

- 사용자들이 게시물에 작성한 댓글들을 조회하는 API입니다.

- 본인 뿐만 아니라 `모든 사용자의 댓글`이 보입니다.

- `상품 게시물의 ID`는 `req.params`를 통해 URL에서 가져옵니다.

- 기본적으로 `오래된 댓글일 수록 위에` 보입니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/comment.router.js#L66

![댓글 조회 API](./imgs/24-comment-list.png)

<br>

### 5-18. 댓글 수정 API

- 본인이 작성한 댓글을 수정하는 API입니다.

- `상품 게시물의 ID, 댓글의 ID`는 `req.params`를 통해 URL에서 가져옵니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/comment.router.js#L120

![댓글 수정 API](./imgs/23-comment-update.png)

<br>

### 5-19. 댓글 삭제 API

- 본인이 작성한 댓글을 삭제하는 API입니다.

- `상품 게시물의 ID, 댓글의 ID`는 `req.params`를 통해 URL에서 가져옵니다.

- 해당 ID를 조회하고 삭제를 진행합니다. `(Hard Delete)`

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/comment.router.js#L358

![댓글 삭제 API](./imgs/25-comment-delete.png)

<br>

### 5-20. 댓글 좋아요 API

- 상품 게시물 댓글에 좋아요를 할 수 있는 API입니다.

- `상품 게시물의 ID, 댓글의 ID`는 `req.params`를 통해 URL에서 가져옵니다.

- 사용자 본인의 댓글에 좋아요를 누르거나, 이미 좋아요를 누른 경우 에러를 반환합니다.

- `N:M 관계`를 `암시적 테이블`로 연결하기 위해 `connect 절`을 사용해서 테이블을 연결했습니다.

- `댓글 좋아요 취소 API`는 로직이 거의 동일하기에 작성하지 않았습니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/comment.router.js#L195

![댓글 좋아요 API](./imgs/26-comment-like.png)
![댓글 좋아요 취소 API](./imgs/27-comment-unlike.png)

<br>

### 5-21. 상품 판매/구매 완료 API

- 판매자(구매자)가 상품 판매(구매)를 완료하는 API입니다.

- `상품 게시물의 ID`는 `req.params`를 통해 URL에서 가져옵니다.

- 판매 완료에서는 `구매자의 ID`을, 구매 완료에서는 `매너 상태와 판매자 ID`을 `req.body`를 통해 가져옵니다.

- `트랜젝션 문법`을 통해 구매 기록와 판매 기록을 `같은 트랜젝션에서 create`합니다.

- `구매` 기록에는 상품 게시물의 ID와 `구매자의 ID`, 타입은 구매로 설정합니다.

- `판매` 기록에는 상품 게시물의 ID와 `판매자의 ID`, 타입은 판매로 설정합니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/trade-complete.router.js#L12

![거래 내역 생성 API](./imgs/28-make-history.png)
![구매 완료 내역 생성 API](./imgs/29-make-purchase-history.png)

<br>

### 5-22. 상품 구매/판매 내역 조회 API

- 이용자가 자신의 상품 거래 기록을 조회 할 수 있는 API 입니다.

- `accessTokenValidator`를 통해서 로그인한 사용자의 `Access Token`를 검증합니다.

- 토큰 유효성 검사가 통과하면 `req.user`를 통해 사용자의 정보를 가져옵니다.

- 받아온 사용자 정보의 `id`를 통해 `history` 테이블의 거래기록에 접근 할 수 있고, 해당 테이블의 `type`에 따라 구매, 판매 내역을 조회 할 수 있습니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/trade-history.router.js#L11

![판매 내역 조회 API](./imgs/30-sell-history.png)
![구매 내역 조회 API](./imgs/31-purchase-history.png)

<br>

### 5-23. 팔로우 API

- 사용자가 다른 이용자를 팔로우하고 해당 이용자를 트래킹 할 수 있게 해주는 API 입니다.

- `followerId`는 `accessTokenValidator` 검증을 통과 한 뒤 `req.user`를 통해 받아오고, `followingId`는 `req.params`를 통해 URL에서 가져옵니다.

- 팔로우 할 사용자가 이미 팔로우 되어 있는 경우 에러를 반환 합니다.

- `언팔로우 API`는 로직이 거의 동일하기에 작성하지 않았습니다.

- https://github.com/KwangSoo1555/sparta-4nd-week-newsfeed/blob/2f60e3fe63728d35484131e85c85fd5456817e06/src/routers/follow.router.js#L10

![팔로우 API](./imgs/10-follow.png)
![언팔로우 API](./imgs/11-unfollow.png)

<br>

## 6. 어려웠던 점

### 6-1. N:M 관계 vs 1:N 관계의 차이 (김정찬)

- ERD 작성을 하면서 사용자가 게시물에 좋아요를 누를 경우에 대해서 이야기가 나왔음

- 제일 먼저 떠오른 관계 방식은 N:M 방식이었음

![관계 O](https://velog.velcdn.com/images/my_code/post/e082e1a6-9e9f-4565-a61f-b814ec97d58e/image.png)

- 1:N, N:1 관계를 통해서 N:M 관계를 만들어 냈음

- 위와 같이 user와 trade의 id를 통해 사용자가 어떤 게시물들에 좋아요를 누르는지, 그리고 어떤 사용자들이 해당 게시물에 좋아요를 눌렀는지 알기 위한 관계를 생각했음

- 위와 같이 관계를 연결함으로써 복잡한 연산이 되지만 관계가 존재하기 때문에 변경 사항에 대해 유연하게 대처가 가능해짐

- 즉, 관계를 형성하면 종속성을 만들 수 있어서 수정 삭제 시 조금 더 편리해짐

- 두 번째로 떠오른 방식은 그냥 그냥 명시적으로trade_like를 만들고 관계를 형성하지 않는 방식을 생각했음

![관계 X](https://velog.velcdn.com/images/my_code/post/8920f00e-f286-40a9-88a8-c84a64a24497/image.png)

- 위와 같은 방식은 그냥 코드 상에서 parameter와 같은 request 값을 직접 가져와서 trade_like 테이블에 create 하는 방식임

- 위와 같은 방식을 사용하면 복잡한 관계가 없기에 개발할 때는 편리함

- 하지만 변경 사항이 발생하면 코드 자체를 고치는 경우가 많아지기 때문에 유지 보수 면에서 조금 떨어짐

- 팀원들과의 회의에서 결론이 나지 않아서 튜터님이 도움으로 N:M 관계를 만드는 것으로 결정했음

- 심지어 N:M 방식을 사용해서 trade_like라는 테이블을 직접 만드는 것이 아니라 암시적으로 만들 수 있다는 이야기를 들었음

- 그래서 아래 참고 자료를 바탕으로 스키마를 구성함

- https://dodote10.tistory.com/624

<br>

### 6-2. 소셜 로그인과 기존 인증방식의 호환 (채유일)

- passport를 이용한 소셜 로그인을 구현했을 때 받아오는 토큰을 사용하면 기존 JWT를 사용하던 인증 로직을 재사용 할 수 없음

- 회원 가입 API를 통해 가입한 사용자와의 인증 과정을 어떻게 통합해야 할지 고민함

- passport에서 제공하는 전략을 통해 인증된 사용자의 정보만 받아온 뒤 기존 accesstoken과 refreshtoken을 JWT로 발급한 로직을 그대로 적용.

- 기존의 토큰 발급 함수와, 토큰 미들웨어를 그대로 사용할 수 있게 됨

- 소셜로그인 사용자와 일반 회원가입 사용자 간 구분을 두지 않고 동일한 인증과정을 거쳐 API에 대한 접근을 통제 할 수 있게 구현함

<br>

### 6-3. Prisma 작동 로직의 이해 (구남욱)

- 백엔드 작업에 필수적인 서버를 구현하는 방식인 Prisma의 이해가 잘 되지 않았음

- 다른 사람의 코드를 이해하고, 팀의 코드 양식에 맞추어 코드를 작성하는 것의 연습이 더 필요하다고 느꼈음

- 소통의 중요성을 다시 한 번 체감하였고, 어려운 점이 있을 때 솔직하고 정확한 브리핑을 통해 어려움을 극복하는 방법을 알게 되었음

<br>

### 6-4. 계획, 설계의 부족과 테스트 여러움 (복광수)

- 클라이언트에게 어떤 방향으로 서비스를 제공할 것인지 미리 계획을 잡지 않아 로직 구현 도중 서비스 방향성이 잡히지 않았음

- 프론트 엔드의 작업 없이 데이터 베이스의 스키마와 로직을 통한 insomnia 테스트로만 코드 동작을 판단하기 쉽지 않았음
