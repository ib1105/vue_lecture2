<template>
  <Appcard>
    <h5 class="card-title">{{title}}</h5>
    <p class="card-text">{{ content }}</p>
    <p class="card-muted">{{ createdAt }}</p>
  </Appcard>
</template>

<script setup>
import Appcard from '@/components/Appcard.vue'
defineProps({
  title:{
    type: String,
    required: true,
  },
  content:{
    type: String,
  },
  createdAt:{
    type: [String, Date, Number],
  }
})
</script>

<style lang="scss" scoped>

</style>