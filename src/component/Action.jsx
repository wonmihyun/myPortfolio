//import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // useDispatch 상태관리 
import { fetchActionMovies } from "../store/actions/index";
import {styled} from 'styled-components';
import OverItem from './OverItem';

// 2023.08.14
// yarn add swiper 설치 
// swiper 세트 
import {Swiper, SwiperSlide} from 'swiper/react'; // 스와이퍼 적용 임포트 
import 'swiper/css'; // 스와이퍼 기본 css 적용 
import { Navigation, Pagination } from "swiper/modules"; // 스와이프 좌우버튼 활성 모듈
import 'swiper/css/navigation'; // 좌우버튼에 대한 css 
import 'swiper/css/pagination'; // 도트 네비게이션 적용 css 
import './SwiperReset.css';
import Modal from "./Modal";

 


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

    // 상세 페이지
    //const [modal, setModal] = useState(false);
    const [itemSelect, setItemSelect] = useState({});
    const [isHover,setIsHover] = useState(false);

 
    // const onClick = (movie) =>{
    //     setModal(true);
    //     setItemSelect(movie);
    // }

    const onMouseOver = (movie, index) =>{
        console.log('11');
        setIsHover(index);
        setItemSelect(movie);
        
    }

    // const onMouseOut = () =>{
    //     console.log('22');
    //     setIsHover(false);
    //     setItemSelect({});
    // }
 
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchActionMovies())     // action의 index를 가져옴 
    }, []);// 조건이 없으면 무한으로 실행되기 때문에 빈 배열을 넣어서 가조건을 생성(무한로딩 방지) 

    // useSelector = useDispatch로 받아온 상태값을 반환
    const actionData = useSelector(state => state.action.movies, []) || [];
    console.log(actionData.results);
    

    return(
        <> 
        <ActionWrapper> 
        <MovieTitle>액션 장르</MovieTitle>
        <Swiper 
            spaceBetween={10} // 슬라이드와 슬라이드 사이의 여백 (gap)
            slidesPerView={6} // 한번에 보여질 슬라이드의 갯수
            slidesPerGroup={6} // 한번에 움직일 슬라이드의 갯수
            navigation // 네비게이션 css 적용
            modules={[Navigation,Pagination]} // 모듈 적용 
            pagination ={{clickable:false}} //  clickable:true 클릭하면 해당페이지로 이동 
            loop // 무한반복
        >


        <div className="movieWrapper">
            {actionData.results && actionData.results.map((movie, index)=> (
                <SwiperSlide>
                    <Movie 
                    //onClick={()=>onClick(movie)}
                        onClick={()=>onMouseOver(movie, index)}
                        //onMouseLeave={()=>onMouseOut()}
                    >
                    
                    
                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>
                    </Movie>
                    {isHover === index && (
                        <OverItem {...itemSelect} setIsHover={setIsHover} movieId = {movie.id}
                        
                        />
                    )}
                </SwiperSlide>
            ))} 
        </div>

        </Swiper>
 
        </ActionWrapper> 
        {/* {modal && (
            <Modal {...itemSelect} setModal={setModal}/>
        )} */}
        </>
    )
}

const ActionWrapper = styled.div`
    transform:  translateY(-100px);
    box-sizing: border-box;
/* 
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
    } */
`;
const MovieTitle = styled.h2`
     font-size : 40px;
        color : #ffffff;
        font-weight: bold;
        margin-bottom: 20px;
        padding-left : 30px;

`

const Movie = styled.div`
    width : 300px;
    flex-shrink : 0;
    img {
        width : 100%;
        object-fit: cover;
    }

`