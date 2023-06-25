<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message" />
    <PostForm
      v-if="visibleForm"
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">목록</button>
        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 저장 </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '@/api/posts'
import PostForm from '@/components/posts/PostForm.vue'
import { useAlert } from '@/composables/alert'
// alert
const { vAlert, vSuccess } = useAlert()
//useAlert()를 호출해서 alert이라는 상태를 변경할 수 있는, vAlert, vSuccess 함수를 가져왔다.
//

const router = useRouter()

//form 객체 생성
const form = ref({
  title: null,
  content: null
})

const goListPage = () =>
  router.push({
    name: 'PostList'
  })

const visibleForm = ref(true)

const loading = ref(false)
const error = ref(null)
const save = async () => {
  try {
    loading.value = true
    await createPost({
      ...form.value,
      createdAt: Date.now()
    })
    router.push({ name: 'PostList' })
    vSuccess('등록이 완료되었습니다!')
  } catch (err) {
    vAlert(err.message)
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
