<template>
  <div>
    <h2>About View</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <!-- name는 index에서 지정한 이름 -->
    <button class="btn btn-primary" @click="$router.push('/')">Home 으로 이동</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

//route 객체를 setup 안에서 사용하고 싶을 때
const route = useRoute()
console.log('route.path: ', route.path)
</script>

<style lang="scss" scoped></style>
