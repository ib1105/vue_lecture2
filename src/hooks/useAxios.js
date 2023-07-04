import axios from 'axios'
import { isRef, ref, unref, watchEffect } from 'vue'

//defaults라는 속성에 설정을 하게 되면 전체적으로 적용이 된다.
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

const defaultConfig = {
  method: 'get' //default: get, get을 많이 사용하기 때문에
}

const defaultOptions = {
  immediate: true
}

export const useAxios = (url, config = {}, options = {}) => {
  const response = ref(null)
  const data = ref(null) //공통모듈이기 때문에 posts보다는 data로 사용
  const error = ref(null)
  const loading = ref(false)

  const { onSuccess, onError, immediate } = {
    ...defaultOptions,
    ...options
  }

  const { params } = config
  const execute = (body) => {
    data.value = null
    error.value = null
    loading.value = true
    axios(unref(url), {
      //url, config 속성을 넣음
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === 'object' ? body : {}
    })
      .then((res) => {
        response.value = res
        data.value = res.data //성공했을 때
        if (onSuccess) {
          onSuccess(res)
        }
      })
      .catch((err) => {
        error.value = err //실패했을 때
        if (onError) {
          onError(err)
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
  if (isRef(params) || isRef(url)) {
    watchEffect(execute)
  } else {
    if (immediate) {
      execute()
    }
  }
  return {
    response,
    data,
    error,
    loading,
    execute
  }
}
