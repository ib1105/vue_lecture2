<template>
  <!-- 
	url 요청이 /로 들어왔을 때 HomeView.vue
	/about 요청이 들어오면 AboutView.vue

    -->
  <main>
    <div class="container py-4"></div>
    <RouterView></RouterView>
  </main>
</template>

<script setup></script>

<style lang="scss" scoped></style>
