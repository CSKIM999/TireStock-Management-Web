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
>
> ## CASE 2
>
> - WHAT?
>
>   ```
>   이미지 파일을 내가 업로드하고 다른사람이 받아볼 수 있어야하는데, 구현하려했던 MongoDB 만을 사용해서는 불가능.
>
>   원래 사용하려했던 local 에 upload 폴더를 만드는 방식은 나만 볼 수 있고 다른사람이 못봄.
>   ```
>
> - WHY?
>   ```
>   MongoDB 는 문서기반, AWS,GSC 어쩌구 저쩌구 클라우드들은 객체기반임.
>   따라서 문서를 다루기엔 MongoDB 가 아주 탁월하나, 이미지를 다룰수가 없음.
>   다룰 순 있지만, 이진작업을 통해야 하기때문에 성능과 확장성에 확실한 부정적 영향을 준다고 함.
>   그래서 AWS 나 GSC 같은 클라우드서비스들은 비디오, 이미지와같은 대용량 파일에 적합함.
>   그것도 그렇고 MongoDB 용량 꼴랑 500MB 인데 한개 1MB짜리 사진이 올라가는것도 좀 웃기긴 함
>   ```
> - HOW?
>
>   ```
>   억지억지로 이진화해서 집어넣을까도 생각해봤는데, 성능 안좋아진다는 사실을 알면서도 억지로 진행하는건 용납못하겠음.
>   이미 MongoDB로 너무 많이 구현해놔서 이제와서 틀기는 좀 무리가 있겠고, 다른 방법을 찾아야했음.
>   클라우드를 사용해서 클라우드에 실제 파일을 저장, 해당 파일의 URL 을 MongoDB 에 저장하는 방식을 추천받음.
>   이미지를 내가 사용하던 OCI 의 클라우드에 저장하고, 동시에 URL은 MongoDB 에 저장하는 방식으로 해야겠음.
>   젠장.
>   액세스키를 받아서 서버에서 사용하면 배포시에도 문제없이 클라우드에 이미지업로드 가능.
>   업로드 된 이미지 URL은 도메인 위에서 모두 접근 가능할 것.
>   DONE )
>   OCI 버킷에 이미지 업로드하기
>       >> 완성은 했지만 배포단계를 위해 업로드만 가능한 IAM 계정을 설정해주어야함. (현재는 admin)
>   오라클은 다 좋다. 성능, 구조적 추가비용 지출 없음.
>   근데 자료가 진짜 징그러울정도로 없다.
>   돌고 돌아 공식문서와 ORACLE 깃허브에서 예제를 찾아서 해결하는 중.
>   TODO )
>   url에 접속하면 render 대신 download 가 진행됨. 같은 문제를 s3로 검색해보니 contentType 때문이라고 함.
>   분명 FE에서 전달할때 컨텐츠타입 image로 변환해서 던지기도 해보고 결과적으로 OCI버킷에서 객체 세부정보에서 확인해도
>   image/jpeg 로 나오는디 그래도 여전히 download 진행. 개같은거. 그냥 uploadManager 정의 타고 올라가서 확인해보기로 함.
>   Axios 의 컨텐츠타입 설정 헤더는 Content-type인데 어찌저찌 타고 올라가서 확인해보니 여기선 다음과 같다
>   uploadManager
>       >upload Method ( req , cb ) params
>           > uploadRequest ( content , singleUpload , requestDetail ) params
>               > requestDetail ~= putObjectRequest ((TS 의 Omit 을 사용해서 아직 잘은 모르겠음.))
>                   > putObjectRequest ( namespaceName . . . ★★★ contentType ★★★ . . . )
>   여태 뻘짓했는데 결과적으론 컨텐츠 타입은 requestDetail 의 arg 로 "contentType:'image/jpeg'" 를 넣어주어야 했던 것.
>   이젠 url 접속하면 render 가 정상적으로 진행 됨.
>   도대체가 정보가 없어서 s3로 검색
>
>   업로드 한 이미지 URL을 생성해서 MongoDB에 저장하기
>
>
>   ```
>
> ## CASE 3
>
> - WHAT?
>
>   ```
>   CASE2 해결위해 테스트 도중 multer 를 이용한 다중업로드 시 파일 몇개 업로드가 실패하는 경우가 발생.
>   디렉토리를 읽어오고 삭제하는 과정에서 문제가 생기나 싶어서 디렉토리 삭제 로직도 잠시 꺼놨는데, 그래도 똑같이 발생.
>   심지어 랜덤으로 정상업로드 되는 경우도 있고, 한두개만 되는 경우도 생김.
>   ```
>
> - WHY?
>
>   ```
>   upload middleware 가 문제인가 싶어서 동기처리해봤으나 역시나 같은 문제가 계속 발생.
>   프론트에서 제대로 보내고있나 의문이 들어서 req.files 를 통해서 확인해보고,
>   이어서 어떤 파일이 누락되었나 검토해보던 도중 filename이 "같은" 두 파일 발견.
>   filename은 file.fieldname - Date.now() + .jpg 식으로 저장됐음.
>   즉, Date.now() 가 같은 값을 반환하는 그 찰나에 두개의 파일이 저장돼서 생긴 문제였던 것.
>   ```
>
> - HOW?
>
>   ```
>   우연히 다른 자료 찾아보다가 filename을 나와 비슷하지만 희한하게 랜덤값을 넣어주는 자료를 봤었음.
>   그 당시엔 뭐 보안이나 그런 이유로 랜덤값을 넣어줬었나, 했었는데 아마도 나와 같은 문제를 겼었던 것 같음.
>   fieldname 과 Date.now 사이에 1e9를 곱해준 랜덤정수를 넣어주기로 했음.
>   10억분의 1 확률로 잭팟이 터지면 그냥 축하해주자.
>   ```
