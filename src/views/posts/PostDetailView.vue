<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createdAt).format('YYYY. MM. DD HH:mm:ss') }}
    </p>
    <hr class="my-4" />
    <AppError v-if="removeError" :message="removeError.message" />
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
        <button class="btn btn-outline-danger" @click="remove" :disabled="removeLoading">
          <template v-if="removeLoading">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 삭제 </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { deletePost } from '@/api/posts';
//import { getPostById, deletePost } from '@/api/posts'
import { ref } from 'vue'
import { useAlert } from '@/composables/alert'
import { useAxios } from '@/hooks/useAxios';

//const error = ref(null)
//const loading = ref(false)

const props = defineProps({
  //라우터에서 props로 전달
  id: [String, Number]
})

//const route = useRoute(); // ussRoute()로 route 객체를 가져올 수 있다.
const router = useRouter()
const { vAlert, vSuccess } = useAlert()

//const id = route.params.id;
//const post = ref({
  // title: null,
  // content: null,
  // createdAt: null
//})
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

 const { error, loading, data: post } = useAxios(`/posts/${props.id}`);

 //composition api를 이용하여 composable 형식으로 바꿈(공통된 것 재사용을 위해)
 const {
	error: removeError,
	loading: removeLoading,
	execute,
} = useAxios(
	`/posts/${props.id}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('삭제가 완료되었습니다.');
			router.push({ name: 'PostList' });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);
// const fetchPost = async () => {
//   try {
//     loading.value = true
//     const { data } = await getPostById(props.id)
//     setPost(data)
//   } catch (err) {
//     error.value = err
//   } finally {
//     loading.value = false
//   }
// }

// const setPost = ({ title, content, createdAt }) => {
//   post.value.title = title
//   post.value.content = content
//   post.value.createdAt = createdAt
// }
// fetchPost()
//console.log('getPostById : ', getPostById(props.id))


//const removeError = ref(null)
//const removeLoading = ref(false)
//composition api를 이용하여 composable 형식으로 바꿈(공통된 것 재사용을 위해)
const remove = async () => {
	if (confirm('삭제 하시겠습니까?') === false) {
		return;
	}
	execute();
};
// const remove = async () => {
//   try {
//     if (confirm('삭제 하시겠습니까?') === false) {
//       return
//     }
//     removeLoading.value = true
//     await deletePost(props.id)
//     vSuccess('삭제가 완료되었습니다.')
//     //삭제가 되면 postlist 이동
//     router.push({ name: 'PostList' })
//   } catch (err) {
//     vAlert(err.message)
//     removeError.value = err
//   } finally {
//     removeLoading.value = false
//   }
// }

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
</script>

<style lang="scss" scoped></style>
