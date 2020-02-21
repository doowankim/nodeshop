# 쇼핑몰 제작

## Tool
* Language & Framework : Node.js, Express.js
* Database : MongoDB

## 기획

### 1. 서버 구상

#### API Verb
- [x] 상품 등록 및 장바구니 추가 기능
- [x] 등록상품 목록 삭제 기능
- [x] 등록상품 내용 수정 기능
- [x] 상품 전체 목록 가져오기 기능

- [x] 회원가입
- [x] 로그인

### 써드파티 패키지

| 모듈                                                                                        | 역할                                                                                                                                                                         | 사용한 부분        |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md)                                        | Node.js에 내장된 암호화 모듈 사용                                                                                                                                             | -                  |
| [body-parser](https://github.com/expressjs/body-parser)                                                | Node.js 본문 구문 분석 미들웨어                                                                                                                                                                | -                  |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)                | Node.js에 대한 jsonwebtoken 구현                                                                                                                        | -                  |
| [express](https://github.com/expressjs/express)                                             | Node.js 웹 애플리케이션 프레임워크                                                                                                                                           | -                  |
| [morgan](https://github.com/expressjs/morgan)                                               | node.js 용 HTTP 요청 로거 미들웨어                                                                                                                                           | -                  |
| [mongoose](https://github.com/velopert/mongoose_tutorial)                                                    | Mongoose를 사용하여 간단한 RESTful API 를 구현                                                                                                                                                      | -                  |

### devDependencies
| 모듈                                                                                                                      | 역할                                                                        | 사용한 부분 |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- |
| [nodemon](https://github.com/remy/nodemon)                                                                                | Node.js 응용 프로그램의 변경 사항을 모니터링하고 서버를 자동으로 다시 시작   | -           |
