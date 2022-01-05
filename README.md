<p align="center"><img width="30%" src="https://cdn.discordapp.com/attachments/912302004271992882/927894338300682271/Araboza.png" /></p>

> `.Araboza`는 여러 사람들의 포트폴리오를 공유하고 관리하는 프로젝트입니다.

## 시작

```
$ git clone https://github.com/Araboza/Araboza_BackEnd.git
% cd Araboza_BackEnd

$npm
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 진행기간

2021.11.18 ~ 2022.01.03 (약 한달 반)

## 팀구성

- 프론트엔드 : 변찬우
- 백엔드 : 김시훈(필자),김현승
- 디자인 : 노가성

## 사용기능

- [NestJS](https://nestjs.com/)
- [Mysql](https://www.mysql.com/)
- [AWS](https://aws.amazon.com/ko/?nc2=h_lg)
- [JWT](https://jwt.io/)
- [TypeOrm](https://typeorm.io/#/)
- [Swagger](https://swagger.io/tools/swaggerhub/?&utm_medium=ppcg&utm_source=aw&utm_term=swagger&utm_content=511271175059&utm_campaign=SEM_SwaggerHub_PR_APAC_ENG_EXT_Prospecting&awsearchcpc=1&gclid=Cj0KCQiA_c-OBhDFARIsAIFg3exOt0n1S0lZmoHaE5ZTMlZu6VzgRv7BZ7X_FQD1Q5GonJ-DJF7lFDQaArcREALw_wcB&gclsrc=aw.ds)

## 구현기능

- `JWT`를 이용한 엑세스 토큰으로 로그인 및 회원가입
- `TypeOrm`으로 포트폴리오 생성,삭제,수정 등등 기능
- `Swagger`을 통한 정리사이트

# 프로젝트 진행 과정

## 시작

첫 시작으로 주제가 정해진 후엔 잘 진행되는가 싶다가 다같이 기능명세서를 작성하면서 굉장히 힘들어졌다 우선 서로 얘기가 잘안되다보니 어떻게 해야지 더욱 좋은 기능일까를 생각하면서 하고 이른 기능명세서를 처음부터 하는것ㅠ은 처음이다 보니 진행하면서 바뀐점이 너무 많아서 너무 힘든 시작이였다.

![img](https://cdn.discordapp.com/attachments/912302004271992882/927912578783543306/unknown.png)

## 디자인

디자인 부분에서는 우리팀 가성이가 너무 수고해줬다 자기 주전공이 아니였음에도 이렇게 깔끔하고 예쁜 사이트를 디자인해줘서 고마웠고 디자인이 걱정이였는데 너무 고맙고 수고했다고 해주고 싶다.  
![design](https://cdn.discordapp.com/attachments/912302004271992882/927913613317013544/unknown.png)

## 프런트

### 시작 전

이 프로젝트에 1년 동안 배운 기술들을 모두 적용하고 싶은 욕심에 많이 힘들어졌던 것 같다<br>
일단 CSR의 대표적인 라이브러리인 `React`, 뭔가 사용하면 가지가 철철 흐르는 `Redux`와 `Redux`의 가지에 가지를 더한 `Redux-saga`까지.<br>
사실 처음에는 `Nextjs`를 사용해서 SEO를 좀 더 강화하는 게 좋지 않을까 생각했지만<br>
그때 당시 `Nextjs`를 잘 다루지 못하는 것 같아서 거기까지는 하지 않았다.

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/Redux Saga-999999?style=flat-square&logo=Redux-Saga&logoColor=ffffff"/>

### 시작!

디자인에 맞춰 개발을 하고 있는데 생각해 보니 백에 그쪽에 api 명세서가 없었다<br>
그리고 서버도 아직 만들어지지 않아서 테스트도 못하고 있던 상황에서 아무 생각 없이 기능을 구현하고 있어서 나중에 생각했을 땐 망했다는 생각이 엄청 들었다<br>
어찌어찌 하면서 테스트도 못하는 상황에서 기능 구현과 퍼블리싱이 완성되었고 고통은 그때부터였다

### 백엔드와 연결

백엔드 코드를 짜기 전에 팀원과 같이 api 명세서를 작성하는데 api 명세서를 처음 짜봐서 뭐부터 작성해야 할지 많이 망막했다. 그래서 무지성으로 api 명세서를 작성했더니 많이 부족한 명세서가 탄생했다. 우선 request 값과 response 값을 적지 않아서 프런트 코드를 작성하면서 많은 불편함을 겪었고 처음에는 설명도 적지 않아서 정말 죽는 줄 알았다. 나중에는 `Swagger`라는 것을 활용해 훨씬 나아진 명세서를 보고 개발을 할 수 있었다.

### 마무리

백엔드와 연결을 마무리하고 나니 허점들이 하나씩 보이기 시작했다. 처음에는 포트폴리오를 작성하는 것부터 시작해서 삭제, 수정, 보여주기, user 보여주기, 다른 user는 수정/삭제 못하게 하기, 로그인, 로그아웃 등등 정말 많은 오류가 나서 고치느라 애 많이 먹었다.

## 백엔드

### 시작 전

이 프로젝트를 처음한다했을때 나의 주전공이 아닌 다른 것을 해야하는게 굉장히 힘들었다 기능명세서가 작성된 후 그때부터 `NestJS`를 공부하기 시작했는데 처음하는 언어이다 보니 이해하는것도 힘들었다 그래도 다행히 NestJS를 찬우랑 같이 공부하면서 재밌게 해서 찬우에게 너무 고마웠다.

## 시작!

처음 NestJS를 공부했을때 API로 공부했는데 API명세서가 없다보니 굉장히 힘들었다 그리고 우리팀의 언어는 그나마 백엔드를 할 수 있던 언어는 `JavaScript`라서 `Spring Boot`를 이용할 수 없었다ㅠ 그래도 다행히 우리와 맞는 `NestJS`를 찾게 되어 단점이 있지만 단기간에 할 수 있을거같아 `NestJS`로 하게되었다.

## 절반 정도 만들었을 때

명세서에 등시된대로 만들었지만 생각해보니 우리는 유저가 여러명이였다 그래서 쿠키를 다룰줄 알아야했는데 그것을 할지 몰라서 너무힘들었고 다른 팀원과 깃허브를 자주 하지않아서 서로 Conflict가 말도 안되게 나와서 너무 힘들었다.

## 완성

서로 우여곡절 끝에 백이 거의끝나고 백에서는 잘되었지만 프론트와 연결할떄 잘 안될떄가 많아서 찬우가 너무 힘들었다 찬우한테 너무 미안했지만 잘 끝내줘서 고마웠다.

## 배포

도메인을 구하여서 드림북을 통하여 이 아이디어를 크게 해보고싶은 마음이들어 AWS에서 배포해보고 싶어졌다.

# 결과

- 메인 페이지

![mainPage](https://cdn.discordapp.com/attachments/912302004271992882/927931722660741190/unknown.png)

- 로그인 페이지

![sf](https://cdn.discordapp.com/attachments/912302004271992882/927933968496599151/unknown.png)

- 포트폴리오 작성 페이지

![sfsd](https://cdn.discordapp.com/attachments/912302004271992882/927933104448999474/unknown.png)

- 포트폴리오 포여주는 페이지

![hello](https://cdn.discordapp.com/attachments/912302004271992882/927932653536161802/unknown.png)

![hello](https://cdn.discordapp.com/attachments/912302004271992882/927932556798738522/unknown.png)

- my 페이지

![sdf](https://cdn.discordapp.com/attachments/912302004271992882/927933576127869048/unknown.png)

# 프로젝트를 마무리 하면서

우선 우리들끼리 이렇게 프로젝트를 해본게 너무 신기했고 나도 내 전공이아닌곳을 해보게 되어서 너무 힘들었지만 잘되어서 너무 좋았다 우리팀너무 다 고맙고 약 1달 반 동안 너무수고많았다 우리 앞으로도 자주 만나고 프로젝트 많이 하자! 다 너무 고마워.

# 좋았던 부분

나에게 없던 협동심이 조금 생기게 되었고 다른 사람과의 대화가 엄청나게 중요하다는것을 꺠달았다 다음 아이디어페스티벌에선 더욱 빠르게 잘 만들고싶어지는 느낌이 엄청 들었다.
