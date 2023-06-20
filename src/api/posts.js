// axios를 사용하여 json 데이터를 조회
const posts = [
  {id: 1, title: "제목1", content: "내용1", createdAt: "2020-01-01"},
  {id: 2, title: "제목2", content: "내용2", createdAt: "2020-02-02"},
  {id: 3, title: "제목3", content: "내용3", createdAt: "2020-03-03"},
  {id: 4, title: "제목4", content: "내용4", createdAt: "2020-04-04"},
  {id: 5, title: "제목5", content: "내용5", createdAt: "2020-05-05"},
];

export function getPosts() {
	return posts;
}

export function getPostById(id) {
  //아이템 id와 일치하는 id를 찾는 함수
	return posts.find(item => item.id === id);
}