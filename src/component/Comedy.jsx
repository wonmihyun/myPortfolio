//import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // useDispatch 상태관리 
import { fetchComedyMovies } from "../store/actions/index";
import Movie from "./Movie";
import {styled} from 'styled-components';
// react-redux = 리액트 상태 관리 라이브러리 
// 설치 방법 : yarn add react-redux 설치 
// 스토어 데이터를 사용하기 위해서는 redux를 사용한다.


// export default function Action(){
//     useEffect(()=>{
//         fetchApi();
//     },[])
// }
// const API_KEY = '82776dd4e021405937c471b1f995902b'; //각 계정마다 배정받는 고유 key값 (TMDB 사이트 회원가입후 api 주소)
// const BASE_URL = `https://api.themoviedb.org/3`;// 정보를 받아올 url의 공통 주소를 변수화
// const Genre = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US` // 전체 장르

// const fetchApi = async()=>{
//     const res = await axios.get(Genre);
//     console.log(res.data)
// }


export default function Action(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchComedyMovies())     // action의 index를 가져옴 
    }, []);// 조건이 없으면 무한으로 실행되기 때문에 빈 배열을 넣어서 가조건을 생성(무한로딩 방지) 

    // useSelector = useDispatch로 받아온 상태값을 반환
    const actionData = useSelector(state => state.comedy.movies, []) || [];
    console.log(actionData.result);
    

    return(
        <>
        <ActionWrapper>
        <h2 className="movieTitle">코메디 장르</h2>
        <div className="movieWrapper">
            {actionData.results && actionData.results.map(movie => (
                <Movie props={movie}/>
            ))} 
        </div>
        </ActionWrapper>
        </>
    )
}

const ActionWrapper = styled.div`
    transform:  translateY(-100px);
    padding-left : 30px;
    box-sizing: border-box;

    .movieTitle{
        font-size : 40px;
        color : #ffffff;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .movieWrapper{
        display: flex;
        overflow: hidden;
        align-items: center;
        gap: 6px;
        .movieItem{
            width: 250px; 
            flex-shrink: 0;

            img{
                width:100%
            }
        }
    }
`;
