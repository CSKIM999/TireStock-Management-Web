# TireStock-Management-Web

    small Project

    무작정 페이지를 구성해보려 했으나, 정확히 무엇이 필요하고 어떻게 디자인할것인지 생각해두지 않아서 막히는 부분이 많았음.
    프로토타입을 만들고, 어떤 기능들이 필요하고, 어떤것을 모듈화해야 재사용을 통해 효율을 높일 수 있을지 생각해봄.

    이번 프로젝트에서 가장 유효한 부분은 Restful API 의 사용이다.
    mongodb 의 ID 를 활용하여 백엔드에서의 restful한 api 디자인에 신경썼다.

---

---

## Landing Page

# ![LandingPage](https://user-images.githubusercontent.com/75712211/197938497-b423dbb9-4b8d-41ff-939b-399f7467d2c6.png)

    Figma 를 사용하여 대략적인 와이어프레임을 해보고, 그 과정에서 필요한 기능들을 추려내고 반복사용되는 유닛들을 모듈화하기로 결정.
    DB에 들어갈 데이터 스키마도 대략적으로 설계완료.

    Figma를 처음사용해서 조금 더디긴 했지만, 전체적인 디자인을 짜놓으니 그 위치에 들어가야 할 기능들이 쉽게 보였음.

## State

    지난 프로젝트에서 모바일은 cookie 사용이 불가능한점을 알게되어 이번에도 유저의 login 상태관리는 지난 프로젝트와 마찬가지로 cookie(web)와 redux-persist(mobile) 를 사용하고자 한다.

    추가로 지난 운동어플과 달리 굳이 공유해야할만 한 state가 많지 않기도 하고 drilling 의 깊이가 깊어봐야 3개 component 이기에 prop으로 전달해주었음.

    이미지 썸네일URL 은 생성 후 사용하지 않는경우 revoke 해주지 않으면 메모리 누수를 야기함.
    Post 페이지를 벗어나는 경우 (더 이상 해당 썸네일이 필요하지 않을경우) 해당 썸네일 URL 을 전부 revoke 해주어야함.
    따라서 Upload 이미지 썸네일 url 또한 redux state 에 넣어주었음 persist 를 사용해서 해당 redux state를 유지하고, auth hoc 를 거쳐갈 때 현재 location 과 state 의 path 가 다를경우 state 에 담긴 모든 url 을 revoke 해주는 방향.

## Truble Shooting log

> ## CASE 1
>
> - WHAT?
>
>   ```
>   Register 구현도중 Dialog의 다음 Input 으로 행이동 하기 위해 Tab 을 누르니 Menu까지 닫힘
>
>   <Menu 위에 Register 혹은 Login Dialog 를 렌더링할때 Tab 키를 누르면 Menu가 닫히는 문제 발생>
>   ```
>
> - WHY?
>   ```
>   찾아보니 KeyDown(Tab) 이벤트가 Mui-Menu 의 기반인 Modal의 Close Signal 이라고 함.
>   즉, (Tab)Keydown Event가 부모 요소인 Menu 까지 Bubbling 해서 닫히는 문제였음
>   굳이 handleListkeyDown 으로 찾아들어가서 고칠 순 있지만. 더 편한 방법 선택.
>   ```
> - HOW?
>   ```
>   어차피 Menu 위에 Dialog를 Render 하는 경우가 많지 않다.
>   그냥 편하게 Diaglog 에 Keydown EventListener 를 추가하고 Tab 의 경우에만 stopPropagation 처리.
>   ```
