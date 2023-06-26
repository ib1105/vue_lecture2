import { defineStore } from 'pinia'
//다른컴포넌트에서 자주 사용하는 컴포넌트의 상태를 컴포넌트 자체적으로 관리하다보면 단순했던 단방향의 데이터 흐름이 깨지며 이는 곧 유지할 수 없는 코드가 된다. 우리는 이렇게 단순한 상태관리 패턴이 깨지 않도록 컴포넌트간 공유해야할 상태를 특정 컴포넌트가 아닌 중앙집중형으로 관리해야한다.
// 이 상태관리 라이브러리는 PINIA이다.

//이 강의에서는 중앙저장소(pinia)를 store로 정의한다.
//store도 composable 함수와 마찬가지로 use로 시작하는게 관례
export const useCounterStore = defineStore('counter', {
  //counter은 애플리케이션 전체에서 store의 고유 ID라 보면된다.
  state: () => ({
    //컴포넌트의 상태
    counter: 1
  }),
  getters: {
    //컴포넌트의 컴퓨티드
    doubleCount: (state) => state.counter * 2,
    doubleCountPlusOne() {
      return this.doubleCount + 1
    }
  },
  actions: {
    //컴포넌트의 메서드
    increment() {
      this.counter++
    }
  }
})

//이렇게 state, getters, actions를 정의하고 다른 컴포넌트에서 가져다 쓰기만 하면 된다.
//예시 AboutView.vue
