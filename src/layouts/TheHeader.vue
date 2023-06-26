<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">GYM CODING</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <!-- viewRouter에서는 페이지를 이동할 때는 일반 a태그를 사용하는 대신 커스텀 컴포넌트인
			<RouterLink>를 사용하여 다른 페이지 링크를 만들어야 한다.
				이를 통해 vue Router는 페이지를 리로딩하지 않고 URL에 매핑된 페이지를 렌더링 할 수 있다.
			즉, 리로딩되지 않는 SinglePage 애플리케이션이 된다. -->
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/"> Home </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/about"> About </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/posts">게시글</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/nested">Nested</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">a Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">a About</a>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/my"> MyPage </RouterLink>
            </li>
          </ul>
          <div class="d-flex">
            <button class="btn btn-outline-light" type="button" @click="goPage">글쓰기</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goPage = () => {
  router.push({
    name: 'PostCreate'
  })
}
</script>

<style lang="scss" scoped></style>
