<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <!-- col 12가 max, col-4로 적으면 12/4 이기 때문에 한 row에는 3개의 col이 생긴다. -->
        <PostItem :title="post.title" :content="post.content" :created-at="post.createdAt" @click="goPage(post.id)"></PostItem>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue'
import {getPosts} from '@/api/posts'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const posts = ref([]); //post라는 반응형데이터를 생성

const fetchPosts = () =>{
  posts.value = getPosts();
}
fetchPosts(); //script setup이 먼저 시작되고 fetchPosts() 함수를 실행

const goPage = id => {
  //router.push(`/posts/${id}`);
  //push 메서드에서는 문자열 뿐만 아니라 아래처럼 객체도 넣을 수 있다.
  router.push({
    //router을 통해 해당 name가 있는 path로 이동됨
    name:'PostDetail',
    params:{
      id,
    }
  })
}

</script>

<style lang="scss" scoped>

</style>