import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PostCreateView from '@/views/posts/PostCreateView.vue'
import PostDetailView from '@/views/posts/PostDetailView.vue'
import PostEditView from '@/views/posts/PostEditView.vue'
import PostListView from '@/views/posts/PostListView.vue'

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
    component: PostDetailView
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostEditView
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
