<template>
  <!-- 
	url 요청이 /로 들어왔을 때 HomeView.vue
	/about 요청이 들어오면 AboutView.vue

    -->
  <main>
    <div class="container py-4"></div>
    <RouterView></RouterView>
    <!-- RouterView: 현재 라우터가 제공하는 컴포넌트가 렌더링 (개발자도구 - vue 구조보기) -->
  </main>
</template>

<script setup></script>

<style lang="scss" scoped></style>
