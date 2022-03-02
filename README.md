# pizzaOrderWebAPI

> 피자 주문을 받는 API
<!--
`npm init`을 통해 [package.json](https://github.com/algoribi/TIL/blob/main/TypeScript/01_setting_npm.md)을 생성한다.
-->

## 사용 프레임워크 & 라이브러리

### Express

> install : `npm install express`, `npm i --save-dev @types/express @types/node`

express란 NodeJS를 사용하여 쉽게 서버를 구성할 수 있게 만든 클래스와 라이브러리의 집합체(프레임워크)이다.
<!---
express는 크게 네 가지 부분으로 이해할 수 있다.


- Application : 불러온 익스프레스 객체에는 하나의 함수가 할당되는데, 그 함수를 실행하면 익스프레스 객체가 생성된다. 익스프레스 class를 이용해 익스프레스 객체를 만든다고 생각하면 된다. 이것을 익스프레서 어플리케이션(Application)이라고 한다.

- Request : 콜백 함수에서 전달해 주는 첫 번째 파라미터 **req**는 익스프레스 요청(Request) 객체라고 한다. 요청 객체는 말 그대로 서버로 요청한 클라이언트에 대한 정보를 담고 있다. 이는 하나의 객체 형태로 되어 있고, key와 함수들로 구성되어 있다.

```
-  req.params: url 파라미터 정보를 조회
- req.query: 쿼리 문자열을 조회
- req.body: 요청 바디를 조회
```

- Response : 콜백 함수에서 전달해 주는 두 번째 파라미터 **res**는 익스프레스 응답(Response) 객체라고 한다. 응답 객체는 클라이언트의 요청에 응답하기 위한 함수들로 구성된 객체로, 다음과 같은 함수들을 사용한다.

```
- res.send()
- res.json()
- res.status()
```

- Routing : 어플리케이션을 이용해 라우팅 조직을 만들 수 있지만 익스프레스에는 별도로 **Router** 클래스를 제공한다. 라우터 클래스를 이용하면 라우팅 조직을 좀 더 구조적으로 만들 수 있다.
 --->
</br>

## 피자 주문 API 설계하기

> [REST API에 대한 정리글](https://github.com/algoribi/TIL/blob/main/TypeScript/03_API.md)

* GET / : 클라이언트가 URI에 접근하면 메뉴가 담긴 JSON을 보내준다.
* POST /orders : 클라이언트로부터 주문이 있는 JSON을 POST로 받아온 후 주문이 올바르다면 주문 결과가 담긴 JSON을 보내준다.