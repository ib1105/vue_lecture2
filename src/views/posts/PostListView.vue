<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<form @submit.prevent>
			<div class="row g-3">
				<div class="col">
					<input v-model="params.title_like" type="text" class="form-control" />
				</div>
				<div class="col-3">
					<select v-model="params._limit" class="form-select">
						<option value="3">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form>
		<hr class="my-4" />
		<div class="row g-3">
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem
					:title="post.title"
					:content="post.content"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
				></PostItem>
			</div>
		</div>
		<nav class="mt-5" aria-label="Page navigation example">
			<ul class="pagination justify-content-center">
				<li class="page-item" :class="{ disabled: !(params._page > 1) }">
					<a
						class="page-link"
						href="#"
						aria-label="Previous"
						@click.prevent="--params._page"
					>
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li
					v-for="page in pageCount"
					:key="page"
					class="page-item"
					:class="{ active: params._page === page }"
				>
					<a class="page-link" href="#" @click.prevent="params._page = page">{{
						page
					}}</a>
				</li>
				<li
					class="page-item"
					:class="{ disabled: !(params._page < pageCount) }"
				>
					<a
						class="page-link"
						href="#"
						aria-label="Next"
						@click.prevent="++params._page"
					>
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
		<hr class="my-5" />
		<AppCard>
			<PostDetailView :id="2"></PostDetailView>
		</AppCard>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import { getPosts } from '@/api/posts';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';

const router = useRouter();
const posts = ref([]); //post라는 반응형데이터를 생성
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});
//params 반응형 데이터는 watchEffect(getPosts) 안에 있기 때문에 params에서 데이터가 변경되면 getPosts메서드가 다시 실행된다.

// pagination
const totalCount = ref(0);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

//script setup이 먼저 시작되고 fetchPosts() 함수를 실행
const fetchPosts = async () => {
	try {
    /*
  그런데 사실 Ajax 다음에 나온 것이 Async - Await는 아닙니다. 그 중간에는 Promise라는 것이 있는데, Promise에 대한 이해를 먼저 해야 Async - Await를 이해할 수 있습니다.
  Promise 역시 ES6 문법에서 사용되는 객체로, Async - Await는 쉽게 말하자면 Promise를 간소화한 것으로 이해하시면 될 것 같습니다.
  */

    //{data} 이 부분은 구조분해 할당이다.
    /*
    구조 분해 할당 구문은 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식입니다.
  */

	console.log('params.value :', params.value);
    const { data, headers } = await getPosts(params.value);
      posts.value = data;
			console.log('data !! : ', data);
      totalCount.value = headers['x-total-count'];
	} catch (error) {
		console.error(error);
	}
};
watchEffect(fetchPosts); //watchEffect 안에서 사용하고 있는 반응형상태(params)가 변경이 되었을때 해당 콜백함수를 다시 실행할 수 있다.
//watchEffect는 watch와 다르게 초기에 한 번 실행함

const goPage = id => {
  //router.push(`/posts/${id}`);
  //push 메서드에서는 문자열 뿐만 아니라 아래처럼 객체도 넣을 수 있다.
  router.push({
    //router을 통해 해당 name가 있는 path로 이동됨
		name: 'PostDetail',
		params: {
			id,
		},
	});
};
</script>

<style lang="scss" scoped></style>
