<template>
  <div>
    <h2>Home View</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <!-- name는 index에서 지정한 이름 -->
    <button class="btn btn-primary" @click="goAboutPage">About 으로 이동</button>
    <hr class="my-4" />
    <AppGrid :items="items" v-slot="{ item }">
      <AppCard>{{ item }}</AppCard>
    </AppGrid>
    <hr class="my-4" />
    <!-- <h2>{{ $person.name }}</h2>
    <button class="btn btn-primary" @click="person.say">click person</button> -->
    <h2>{{ position }}</h2>
    <h2>x: {{ x }}, y: {{ y }}</h2>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$person.name);
    // this.$person.say();
  }
}
</script>

<script setup>
import { reactive, ref, toRef, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goAboutPage = () => {
  router.push('/about')
}

const items = ref(['사과', '딸기', '포도', '바나나'])

// const person = inject('person')
// console.log('person.name: ', person.name)
const position = reactive({
  //반응형객체
  x: 100,
  y: 1000
})
// const x = position.x; //이것처럼 반응형객체에서 x를 따로 뽑아내면 여기에 있는 x와 반응형객체(position)에 있는 x는 다른 속성이다.
//두 x 모두 동기화 시키기 위해서는 toRef함수를 쓰면 된다.
// const { x, y } = position;
// const x = ref(position.x);
// const y = ref(position.y);
// console.log('x: ', typeof x.value);
// console.log('y: ', typeof y.value);
// const x = toRef(position, 'x');
// const y = toRef(position, 'y');
const { x, y } = toRefs(position) //구조분해할당
</script>

<style lang="scss" scoped></style>
