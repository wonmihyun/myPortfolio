/*
aixos 
자바스크립트에서 외부에서 api를 연동하기 위한 fetch api의 리액트 버전 
aixos를 더 선호한다. 

설치 방법 : yarn add axios
*/

import axios from "axios";

export const FETCH_ACTION_MOVIES = 'FETCH_ACTION_MOVIES';
export const FETCH_COMEDY_MOVIES = 'FETCH_COMEDY_MOVIES';


const API_KEY = '82776dd4e021405937c471b1f995902b'; // 각 계정마다 배정받는 고유 key값 
//TMDB 회원가입후 API
const BASE_URL = `https://api.themoviedb.org/3`; // 정보를 받아올 url의 공통 주소를 변수화 시킴

/*액션 */
export const fetchActionData = (data) =>{
    return {
        type : FETCH_ACTION_MOVIES,
        data 

    } 
}

/*액션 */
export const fetchActionMovies = () =>{
    return (dispatch) => {
        // dispatch = 외부에서 데이터를 가져올때 사용하는 reducer의 기능으로 useState를 대체한다.
        return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`)
        .then(res => {  // axioos에서 콜백함수를 대체하는 return문과 같은 구문 
            dispatch(fetchActionData(res.data))
        }) 

    }
}


/* 코미디 */
export const fetchComedyData = (data) =>{
    return {
        type : FETCH_COMEDY_MOVIES,
        data 

    } 
}

/* 코미디 */
export const fetchComedyMovies = () =>{
    return (dispatch) => {
        // dispatch = 외부에서 데이터를 가져올때 사용하는 reducer의 기능으로 useState를 대체한다.
        return axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`)
        .then(res => {  // axioos에서 콜백함수를 대체하는 return문과 같은 구문 
            dispatch(fetchComedyData(res.data))
        }) 

    }
}


