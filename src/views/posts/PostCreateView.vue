<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
    <hr class="my-4" />
    <PostForm
      v-if="visibleForm"
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">목록</button>
        <button class="btn btn-primary">저장</button>
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

const save = async () => {
  try {
    await createPost({
      ...form.value,
      createdAt: Date.now()
    })
    router.push({ name: 'PostList' })
    vSuccess('등록이 완료되었습니다!')
  } catch (error) {
    console.error(error)
    vAlert(error.message)
  }
}
</script>

<style lang="scss" scoped></style>
