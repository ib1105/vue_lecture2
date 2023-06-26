<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message" />
    <PostForm v-model:title="form.title" v-model:content="form.content" @submit.prevent="edit">
      <template #actions>
        <button type="button" class="btn btn-outline-danger" @click="goDetailPage">취소</button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 수정 </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPostById, updatePost } from '@/api/posts'
import PostForm from '@/components/posts/PostForm.vue'
import { useAlert } from '@/composables/alert.js'
import { useAxios } from '@/hooks/useAxios';

//const error = ref(null)
//const loading = ref(false)
const route = useRoute()
const router = useRouter()
const id = route.params.id

// alert
const { vAlert, vSuccess } = useAlert()

const { data: form, error, loading } = useAxios(`/posts/${id}`);

// const form = ref({
//   title: null,
//   content: null
// })

//composition api를 이용하여 composable 형식으로 바꿈(공통된 것 재사용을 위해)
const {
	error: editError,
	loading: editLoading,
	execute,
} = useAxios(
	`/posts/${id}`,
	{ method: 'patch' },
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('수정이 완료되었습니다!');
			router.push({ name: 'PostDetail', params: { id } });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);
// const fetchPost = async () => {
//   try {
//     loading.value = true
//     const { data } = await getPostById(id)
//     setForm(data)
//   } catch (err) {
//     error.value = err
//   } finally {
//     loading.value = false
//   }
// }
// const setForm = ({ title, content }) => {
//   form.value.title = title
//   form.value.content = content
// }
// fetchPost()

//const editError = ref(null)
//const editLoading = ref(false)
//composition api를 이용하여 composable 형식으로 바꿈(공통된 것 재사용을 위해)
const edit = () => {
	execute({
		...form.value,
	});
};
// const edit = async () => {
//   try {
//     editLoading.value = true
//     await updatePost(id, { ...form.value }) //첫번째 객체에는 id, 두번째 객체에는 form객체를 넣는다.
//     //수정 후 상세페이지로 이동
//     // router.push({ name: 'PostDetail', params: { id } });
//     router.push({ name: 'PostDetail', params: { id } })
//     vSuccess('수정이 완료되었습니다!')
//   } catch (err) {
//     vAlert(err.message)
//     editError.value = err
//   } finally {
//     editLoading.value = false
//   }
// }

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
