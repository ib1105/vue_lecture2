import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PostCreateView from '@/views/posts/PostCreateView.vue'
import PostDetailView from '@/views/posts/PostDetailView.vue'
import PostEditView from '@/views/posts/PostEditView.vue'
import PostListView from '@/views/posts/PostListView.vue'
import NotFoundView from '@/views/posts/NotFoundView.vue'
import NestedView from '@/views/nested/NestedView.vue'
import NestedOneView from '@/views/nested/NestedOneView.vue'
import NestedTwoView from '@/views/nested/NestedTwoView.vue'
import NestedHomeView from '@/views/nested/NestedHomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostListView
  },
  {
    path: '/posts/create',
    name: 'PostCreate',
    component: PostCreateView
  },
  {
    path: '/posts/:id',//여러개의 url을 하나의 컴포넌트에 매핑하고 싶을때 동적으로 사용한다. router객체의 params로 id값을 받을 수 있음.
    name: 'PostDetail',
    component: PostDetailView,
    //props: true, //props하고 boolean 값으로 true를 넣게 되면 :id 같은 파라미터가 해당 페이지컴포넌트에 props로 전달된다.
    props: route => ({id: parseInt(route.params.id)}) //위와 같은 말이다. 이런게 있다고 설명하면서 끼워맞춘 것
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostEditView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/nested',
    name: 'Nested',
    component: NestedView,
    //중첩 라우터 넣기
    children:[
      {
        path: '',
        name: 'NestedHome', //  /nested를 호출하면 부모 /nested도 나오고 자식 /nested + /'' 도 나온다.
        component: NestedHomeView,
      },
      {
        path: 'one', // /one 처럼 /를 넣으면 절대경로가 되기 때문에 localhost/one로 간다. 우린 localhost/nested/one를 원하기 때문에 /를 빼준다.
        name: 'NestedOne',
        component: NestedOneView,
      },
      {
        path: 'two',
        name: 'NestedTwo',
        component: NestedTwoView,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
