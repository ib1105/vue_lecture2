<template>
	<div>
		<ul class="nav nav-pills">
			<li class="nav-item">
				<RouterLink
					class="nav-link"
					active-class="active"
					:to="{ name: 'NestedOne', replace: true }"
				>
					Nested One
          <!-- replace를 사용하면 페이지가 대체된다는 뜻이다. 만약 뒤로가기 누르면 그전에 했던 페이지로 넘어가는데,
             replace를 사용한다면 화면자체가 대체되므로 뒤로가기하면 그 전전에 했던 내용으로 간다. -->
				</RouterLink>
			</li>
			<li class="nav-item">
				<RouterLink
					class="nav-link"
					active-class="active"
					:to="{ name: 'NestedTwo', replace: true }"
				>
					Nested Two
				</RouterLink>
			</li>
		</ul>
		<hr class="my-4" />
    <!-- 특정url에 따라서 <RouterView>에 랜더링 된다. -->
		<RouterView></RouterView>
    <!-- RouterView: 현재 라우터가 제공하는 컴포넌트가 렌더링 (개발자도구 - vue 구조보기) -->
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>