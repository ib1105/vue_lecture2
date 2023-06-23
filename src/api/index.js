import axios from 'axios';
 
//사용자정의 파라미터를 포함해서 새로운 axios 인스턴스를 생성해주는 함수
//ex) baseURL 사용가능 
// development : http://localhost:5000/posts/
// production : http://localhost:5001/posts/
function create(baseURL, options) {
	const instance = axios.create(Object.assign({ baseURL }, options)); //Object.assign = merge 기능
	return instance;
}
//export const posts = create('http://localhost:5000/posts/');
export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts/`);
//환경변수를 설정해서 개발, 실서버 데이터 들고 올 수 있음.