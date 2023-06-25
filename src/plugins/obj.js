const objPlugins = {
  //객체플러그인은 install 함수를 포함하고 있어야 한다.
  //install 함수는 객체와 파라미터 매개변수를 갖는다.
  install(app, options) {
    console.log('objPlugins app: ', app)
    console.log('objPlugins options: ', options)
    // app.component() 전역 컴포넌트
    // app.config.globalProperties 전역 애플리케이션 인스턴스에 속성 추가
    // app.directive 커스텀 디렉티브
    // app.provide() 리소스
  }
}
export default objPlugins
