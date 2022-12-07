# TireStock-Management-Web

small Project

무작정 페이지를 구성해보려 했으나, 정확히 무엇이 필요하고 어떻게 디자인할것인지 생각해두지 않아서 막히는 부분이 많았음.
프로토타입을 만들고, 어떤 기능들이 필요하고, 어떤것을 모듈화해야 재사용을 통해 효율을 높일 수 있을지 생각해봄.

이번 프로젝트에서 가장 유효한 부분은 Restful API 의 사용이다.
mongodb 의 ID 를 활용하여 백엔드에서의 restful한 api 디자인에 신경썼다.

===

> > 랜딩페이지 <<

# ![LandingPage](https://user-images.githubusercontent.com/75712211/197938497-b423dbb9-4b8d-41ff-939b-399f7467d2c6.png)

Figma 를 사용하여 대략적인 와이어프레임을 해보고, 그 과정에서 필요한 기능들을 추려내고 반복사용되는 유닛들을 모듈화하기로 결정.
DB에 들어갈 데이터 스키마도 대략적으로 설계완료.

Figma를 처음사용해서 조금 더디긴 했지만, 전체적인 디자인을 짜놓으니 그 위치에 들어가야 할 기능들이 쉽게 보였음.

### State

지난 프로젝트에서 모바일은 cookie 사용이 불가능한점을 알게되어 이번에도 유저의 login 상태관리는 지난 프로젝트와 마찬가지로 cookie(web)와 redux-persist(mobile) 를 사용하고자 한다.

추가로 지난 운동어플과 달리 굳이 공유해야할만 한 state가 많지 않기도 하고 drilling 의 깊이가 깊어봐야 3개 component 이기에 prop으로 전달해주었음.
