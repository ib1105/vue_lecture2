<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />

    <PostFilter
      v-model:title="params.title_like"
      :limit="params._limit"
      @update:limit="changeLimit"
    />

    <hr class="my-4" />

    <AppLoading v-if="loading" />

    <AppError v-else-if="error" :message="error.message" />

    <template v-else-if="!isExist">
      <p class="text-center py-4 text-muted">No Results</p>
    </template>

    <template v-else>
      <AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
        <template v-slot="{ item }">
          <!-- 슬롯이란 컴포넌트에 콘텐츠나 다른 컴포넌트를 또 다른 방식으로 
			주입시킬 수 있는 방법이다. 이 방법을 활용하면 컴포넌트를 훨씬 
			재사용하기 용이하게 만들수 있다. -->
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
          ></PostItem>
          <!--
		click를 하면 detail 페이지로 넘어가는데 만약, 하위컴포넌트인
		postItem에서 button에 click에 stop 메서드를 안 넣으면
		button에도 click이벤트가 버블링이 되어 button 눌러도 detail로 넘어간다. 
		-->
        </template>
      </AppGrid>

      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="(page) => (params._page = page)"
      />
    </template>

    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreatedAt"
      />
    </Teleport>
    <!-- Teleport를 사용하면 이러한 위치를 다른 곳으로 이동시킬 수 있다. 
	#modal로 이동,
	-->

    <template v-if="previewId">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="previewId"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue'
import PostDetailView from '@/views/posts/PostDetailView.vue'
import PostFilter from '@/components/posts/PostFilter.vue'
import PostModal from '@/components/posts/PostModal.vue'

//import { getPosts } from '@/api/posts'
//import { ref, watchEffect } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { computed } from '@vue/reactivity'
import { useAxios } from '@/hooks/useAxios'

const router = useRouter()
// const posts = ref([]) //post라는 반응형데이터를 생성
// const error = ref(null) //에러상태
// const loading = ref(false) //로딩상태

const previewId = ref(null)
const selectPreview = (id) => (previewId.value = id)

const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 6,
  title_like: ''
})
//params 반응형 데이터는 watchEffect(getPosts) 안에 있기 때문에 params에서 데이터가 변경되면 getPosts메서드가 다시 실행된다.

const changeLimit = (value) => {
  params.value._limit = value
  params.value._page = 1
}

const { response, data: posts, error, loading } = useAxios('/posts', { params })

const isExist = computed(() => posts.value && posts.value.length > 0)

// pagination
//const totalCount = ref(0)
const totalCount = computed(() => response.value.headers['x-total-count'])
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit))

//script setup이 먼저 시작되고 fetchPosts() 함수를 실행
// const fetchPosts = async () => {
//   try {
//     /*
//   그런데 사실 Ajax 다음에 나온 것이 Async - Await는 아닙니다. 그 중간에는 Promise라는 것이 있는데, Promise에 대한 이해를 먼저 해야 Async - Await를 이해할 수 있습니다.
//   Promise 역시 ES6 문법에서 사용되는 객체로, Async - Await는 쉽게 말하자면 Promise를 간소화한 것으로 이해하시면 될 것 같습니다.
//   */

//     //{data} 이 부분은 구조분해 할당이다.
//     /*
//     구조 분해 할당 구문은 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식입니다.
//   */
//     loading.value = true
//     console.log('params.value :', params.value)
//     const { data, headers } = await getPosts(params.value)
//     posts.value = data
//     console.log('data !! : ', data)
//     totalCount.value = headers['x-total-count']
//   } catch (err) {
//     error.value = err
//   } finally {
//     //실패를 하건 성공을 하건 false 넣음
//     loading.value = false
//   }
// }
// watchEffect(fetchPosts) //watchEffect 안에서 사용하고 있는 반응형상태(params)가 변경이 되었을때 해당 콜백함수를 다시 실행할 수 있다.
//watchEffect는 watch와 다르게 초기에 한 번 실행함

const goPage = (id) => {
  //router.push(`/posts/${id}`);
  //push 메서드에서는 문자열 뿐만 아니라 아래처럼 객체도 넣을 수 있다.
  router.push({
    //router을 통해 해당 name가 있는 path로 이동됨
    name: 'PostDetail',
    params: {
      id
    }
  })
}

//modal
const show = ref(false)
const modalTitle = ref('')
const modalContent = ref('')
const modalCreatedAt = ref('')
const openModal = ({ title, content, createdAt }) => {
  show.value = true
  modalTitle.value = title
  modalContent.value = content
  modalCreatedAt.value = createdAt
}
</script>

<style lang="scss" scoped></style>
