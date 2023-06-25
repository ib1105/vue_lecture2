<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm v-model:title="form.title" v-model:content="form.content" @submit.prevent="edit">
      <template #actions>
        <button type="button" class="btn btn-outline-danger" @click="goDetailPage">취소</button>
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
    <!-- <AppAlert :items="alerts" /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPostById, updatePost } from '@/api/posts'
import PostForm from '@/components/posts/PostForm.vue'
import { useAlert } from '@/composables/alert.js'

const route = useRoute()
const router = useRouter()
const id = route.params.id

// alert
const { vAlert, vSuccess } = useAlert()

const form = ref({
  title: null,
  content: null
})
const fetchPost = async () => {
  try {
    const { data } = await getPostById(id)
    setForm(data)
  } catch (error) {
    console.error(error)
    vAlert(error.message)
  }
}
const setForm = ({ title, content }) => {
  form.value.title = title
  form.value.content = content
}
fetchPost()

const edit = async () => {
  try {
    await updatePost(id, { ...form.value }) //첫번째 객체에는 id, 두번째 객체에는 form객체를 넣는다.
    //수정 후 상세페이지로 이동
    // router.push({ name: 'PostDetail', params: { id } });
    router.push({ name: 'PostDetail', params: { id } })
    vSuccess('수정이 완료되었습니다!')
  } catch (error) {
    console.error(error)
    vAlert(error.message)
  }
}

const goDetailPage = () =>
  router.push({
    name: 'PostDetail',
    params: { id }
  })

const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('')
const alerts = ref([])

// const vAlert = (message, type = 'error') => {
//   alerts.value.push({ message, type })
//   //배열이 있으면 [ [message,type] [message,type] [message,type] ... ]
//   //이렇게 배열에 들어가고 아래에 shift() 함수를 통해 첫번째 부터 사라짐

//   showAlert.value = true
//   alertMessage.value = message
//   alertType.value = type
//   setTimeout(() => {
//     alerts.value.shift()
//     //2초 후에 알림 사라지기
//     showAlert.value = false
//   }, 2000)
// }
</script>

<style lang="scss" scoped></style>
