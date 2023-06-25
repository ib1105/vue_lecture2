export default {
  install(app, options) {
    const person = {
      name: '짐코딩',
      say() {
        alert(this.name)
      },
      ...options
    }

    //이러한 객체를 애플리케이션 전체에서 사용하고 싶을 땐 plugin 추가하면 된다.
    app.config.globalProperties.$person = person
    app.provide('person', person) //provide => inject로 받아옴
  }
}
