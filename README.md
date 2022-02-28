# pizzaOrderWebAPI
> 피자 주문을 받는 API

## 사용 프레임워크 & 라이브러리

### 1. Express 
> node.js로 서버 구축을 위한 프레임워크 [공식 사이트](https://expressjs.com/)

Express는 서버를 손쉽게 구축할 수 있도록 도와주는 프레임워크로, Express-generator는 package.json 파일 자동 생성 및 서버 구축에 필요한 기본 폴더 구조까지 자동으로 잡아준다.

- 설치 명령어 : `npm install -g express-generator` / Express-generator는 콘솔 명령어로 사용해야 하므로 전역 옵션(`-g`)으로 설치를 해야 한다.
- 프로젝트 생성 : `express PROJECT_NAME --view=pug nodejs-express-typescript-sample` / Express-generator는 기본적으로 Jade를 템플릿 엔진으로 설치한다. 하지만 ejs와 같이 원하는 템플릿 엔진으로 바꿔도 무관하다.
- 모듈 설치 : (프로젝트 경로로 이동) `npm install`
- 서버 구동 : `npm start`
- 테스트(기본 포트 3000으로 접근) : `http://localhost:3000`

#### Express 구조

- bin/www : http 모듈에 express 모듈을 연결하며, 접속 포트를 지정할 수 있다. 서버를 실행하는 스크립트이다.
- public : 정적 파일(자바스크립트 파일, 이미지 파일, CSS 등을 포함)을 위한 폴더로서, 외부(브라우저 등의 클라이언트)에서 접근 가능한 파일들을 모아 둔 디렉토리이다.
- routes : 라우터들을 관리하는 곳으로 index.js를 루트로 라우팅 관리를 해주면 된다. 클라이언트의 요청 별로 어떤 로직을 수행할지 정해놓는다. 라우팅이 어떻게 작동하는지는 `routes/index.js` 및 `routes/users.js` 파일에 구현되어 있다.
- views : request 요청에 대한 로직을 처리한 후 클라이언트에 응답을 보낼 때 html 코드로 변환해서 반환하는 파일을 정의한 폴더
- app.js : express 설정 정보가 담겨있는 파일이다. 핵심적인 서버의 역할을 하며 미들웨어 관리를 하는 곳이다.
```Node.js
// app.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();  // --- express 패키지를 호풀해 app 변수 객체를 만든다.

// view engine setup  // --- app.set()으로 익스프레스 앱을 설정한다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev')); // --- app.use()는 미들웨어를 연결하는 부분이다. 이때, 미들웨어는 반드시 next()를 호출해야 다음 미들웨어로 넘어간다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; // --- app 객체를 모듈로 만든다.
```

마지막으로 post 형식의 Request를 테스트하려면 [Postman](https://www.postman.com/)을 사용해야 한다. Postman은 서버에 get, post, put, delete 요청을 보낼 수 있다.

</br>

### 2. Nodemon
> node.js 기반의 어플리케이션 개발 시 파일 변경이 감지될 때 자동으로 재시작하도록 도와준다. [공식 사이트](https://www.npmjs.com/package/nodemon)

코드를 수정할 때마다 서버를 다시 시작해줘야 하는 것은 귀찮은 일이다. nodemon은 이 일을 자동으로 대신해준다.

- 설치 명령어 : `npm install nodemon --save-dev` / `-dev` 옵션을 사용하는 이유는 local에서만 사용할 예정이기 때문이다.
- 실행 : 기존에 `node -` 키워드로 실행하던 명령어를 `nodemon -`으로 변경해주면 된다.

</br>

