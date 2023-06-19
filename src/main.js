import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

createApp(App).use(router).mount('#app')
//use(router)을 사용함으로써 모든 자식 객체에서 router(페이지 이동할 수 있는 객체), route(현재 페이지 컴포넌트에 관한 정보) 같은 객체를 사용할 수 있다.
import 'bootstrap/dist/js/bootstrap.js'
