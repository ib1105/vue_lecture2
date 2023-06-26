import { defineStore } from 'pinia'
// 다른컴포넌트에서 자주 사용하는 컴포넌트의 상태를 컴포넌트 자체적으로 관리하다보면 단순했던 단방향의 데이터 흐름이 깨지며 이는 곧 유지할 수 없는 코드가 된다. 우리는 이렇게 단순한 상태관리 패턴이 깨지 않도록 컴포넌트간 공유해야할 상태를 특정 컴포넌트가 아닌 중앙집중형으로 관리해야한다.
// 이 상태관리 라이브러리는 PINIA이다.
export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: []
  }),
  actions: {
    vAlert(message, type = 'error') {
      this.alerts.push({ message, type })
      setTimeout(() => {
        this.alerts.shift()
      }, 2000)
    },
    vSuccess(message) {
      this.vAlert(message, 'success')
    }
  }
})
