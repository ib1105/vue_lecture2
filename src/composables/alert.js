import { ref } from 'vue'

const alerts = ref([])

//composable 함수를 시작할 때는 use로 시작하는 함수로 정의해야하는게 관례이다.
//composable 이라는 개념은 이러한 composition api를 사용해서 상태저장 비즈니스 로직을 호출하고, 재사용하는 것을 말한다.
export const useAlert = () => {
  // alert
  const vAlert = (message, type = 'error') => {
    alerts.value.push({ message, type })
    setTimeout(() => {
      alerts.value.shift()
    }, 2000)
  }
  const vSuccess = (message) => vAlert(message, 'success')
  return {
    alerts,
    vAlert,
    vSuccess
  }
}
