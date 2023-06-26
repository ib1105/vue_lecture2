<template>
  <div>
    <h2>About View</h2>
    <p>{{ $route.path }}</p>
    <button class="btn btn-primary" @click="$router.push('/')">Home으로 이동</button>
    <h2>Store</h2>
    <p>counter: {{ counter }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <p>doubleCountPlusOne: {{ doubleCountPlusOne }}</p>
    <button @click="increment()">Click!!</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

//route 객체를 setup 안에서 사용하고 싶을 때
const route = useRoute()
console.log('route.path: ', route.path)

const store = useCounterStore()

//template에서 사용하려면 pinia 상태관리 데이터를 정의해준다.
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store) //구조분해할당. 일반적으로 const @@@ = store 하면 @@@는 반응형데이터가 아니다.
const { increment } = store //increment는 실행하는 함수이기때문에 그냥 구조분해 할당을 통해서 가져올 수 있음.
//즉 state를 구조분해할당해서 가져올 때는 storeToRefs()를 사용하면 되고, actions를 구조분해할당해서 가져올 때는 그냥 구조분해할당을 해서 가져오면 된다.

counter.value = 100 //pinia에서는 state를 직접 수정할 수 있다.
// increment();
// increment();
// increment();
</script>

<style lang="scss" scoped></style>
