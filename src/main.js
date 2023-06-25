import 'bootstrap/dist/css/bootstrap.min.css'
import funcPlugins from './plugins/func'
import objPlugins from './plugins/obj'
import person from './plugins/person'

import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

//import globalComponents from '@/plugins/global-components'
import globalDirectives from './plugins/global-directives'
// import focus from '@/directives/focus';
import dayjs from './plugins/dayjs'

const app = createApp(App)
//app.use(globalComponents)

//app.use(funcPlugins) //플러그인
//app.use(objPlugins, { name: '짐코딩' })
//app.use(person, { name: '홍길동' })
app.use(router)
app.use(dayjs)
app.use(globalDirectives)
app.mount('#app')

//createApp(App).use(router).mount('#app')
//use(router)을 사용함으로써 모든 자식 객체에서 router(페이지 이동할 수 있는 객체), route(현재 페이지 컴포넌트에 관한 정보) 같은 객체를 사용할 수 있다.
import 'bootstrap/dist/js/bootstrap.js'
