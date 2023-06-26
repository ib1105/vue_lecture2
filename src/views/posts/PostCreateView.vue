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
import { useAxios } from '@/hooks/useAxios';

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

//const loading = ref(false)
//const error = ref(null)
const { error, loading, execute } = useAxios(
	'/posts',
	{
		method: 'post',
	},
	{
		immediate: false, //바로 호출하지 않음. (save()함수를 누르기 전에 이 axios 함수고 호출되면 안되기 때문에)
		onSuccess: () => {
			router.push({ name: 'PostList' });
			vSuccess('등록이 완료되었습니다!');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

//composition api를 이용하여 composable 형식으로 바꿈(공통된 것 재사용을 위해)
const save = async () => {
	execute({ ...form.value, createdAt: Date.now() });
};
// const save = async () => {
//   try {
//     loading.value = true
//     await createPost({
//       ...form.value,
//       createdAt: Date.now()
//     })
//     router.push({ name: 'PostList' })
//     vSuccess('등록이 완료되었습니다!')
//   } catch (err) {
//     vAlert(err.message)
//     error.value = err
//   } finally {
//     loading.value = false
//   }
// }

const goListPage = () =>
  router.push({
    name: 'PostList'
  })

const visibleForm = ref(true)
</script>

<style lang="scss" scoped></style>
