<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">{{ content }}</p>
    <p class="text-muted">{{ createdDate }}</p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-0" @click.stop="$emit('modal')">
          <!-- click.stop으로 click 이벤트 내려왔을 때 루트에 버블링되는 것을 막아둔다. -->
          <i class="bi bi-emoji-sunglasses"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
import { computed, inject } from 'vue'

//props로 받은 데이터를 computed()를 활용하여 날짜 형식을 선언해주기 위해 const를 썻다.
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  createdAt: {
    type: [String, Date, Number]
  }
})

defineEmits(['modal'])

const dayjs = inject('dayjs')
const createdDate = computed(() => dayjs(props.createdAt).format('YYYY. MM. DD HH:mm:ss'))
</script>

<style lang="scss" scoped></style>
