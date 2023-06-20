<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ post.createdAt }}</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getPostById, deletePost } from '@/api/posts'
import { ref } from 'vue'

const props = defineProps({
  //라우터에서 props로 전달
  id: Number
})

//const route = useRoute(); // ussRoute()로 route 객체를 가져올 수 있다.
const router = useRouter()
//const id = route.params.id;
const post = ref({})
/**
 * ref
 * 장) 객체 할당 가능
 * 단) form.value.title, form.value.content -> .value를 계속 붙여야 한다.
 * 장) 일관성
 *
 * reactvie
 * 단) 객체 할당 불가능
 * 장) form.title, form.content -> .value를 안 붙여도 된다.
 *
 * ----
 * 강사는 페이지컴포넌트의 경우 웬만해선 ref를 쓴다고 한다. 일관성이 좋기 때문.
 */

const fetchPost = async () => {
  try {
    const { data } = await getPostById(props.id)
    setPost(data)
  } catch (error) {
    console.error(error)
  }
}

const setPost = ({ title, content, createdAt }) => {
  post.value.title = title
  post.value.content = content
  post.value.createdAt = createdAt
}
fetchPost()
console.log('getPostById : ', getPostById(props.id))
const goListPage = () =>
  router.push({
    name: 'PostList'
  })

const goEditPage = () =>
  router.push({
    name: 'PostEdit',
    params: {
      id: props.id
    }
  })

const remove = async () => {
  try {
    if (confirm('삭제 하시겠습니까?') === false) {
      return
    }
    await deletePost(props.id)

    //삭제가 되면 PostList로 이동
    router.push({ name: 'PostList' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
