import axios from "axios";

const API_KEY = '82776dd4e021405937c471b1f995902b'; // 각 계정마다 배정받는 고유 key값 
const BASE_URL = `https://api.themoviedb.org/3`; // 정보를 받아올 url의 공통 주소를 변수화 시킴

const instance = axios.create({
    baseURL : BASE_URL,
    params : {
        api_key : API_KEY,
        language : 'ko-KR'
    },
})

export default instance;

 