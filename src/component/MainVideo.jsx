// import React, {useState, useEffect} from "react";
// import { Link } from "react-router-dom";
// import {styled} from 'styled-components';
// import {FaPlay} from 'react-icons/fa';
// import {HiViewList} from 'react-icons/hi';

 
// // import movie from '../../public/videos/movie.json'; /* src만 연동할 수 있기 떄문에 가져올 수 없음 */
// // useEffect : 리액트 컴포넌트가 렌더링 될때마다 특정 작업을 실행할 수 있도록 하는 Hook. (계속 렌더링될때마다 출력함)

// export default function MainVideo(){
//     const [randomVideo, setRandomVideo] = useState(null); // json에 있는 동영상을 배열로 가져올 것이기 때문에 초기값은 null
//     // 비디오의 객체가 계속 바뀌기 때문에 기본값을 설정하고 로딩시마다 새로운 값을 받아오기 위한 설정

//     // 내부에 있는 json을 비동기식으로 연결 
//     useEffect(()=>{ // 비디오 json파일이 읽어왔을때 실행할 함수 
//         async function fetchVideos(){   
//             /*
//             // async , await : 비동기를 호출하는 함수 
//             async와 await는 useEffect hook에서 비동기 데이터를 가져올때 사용하는 api
//             async : 비동기 데이터를 수행하는 부분을 지정()
//             */

//             try{ // try는 작업을 시도하는 블록구문(예외 발생할 가능성이 있는 구문)
//                 const res = await fetch('/videos/movie.json'); // res는 보통 responsive를 지칭하며 줄여서 res라고 한다. 비동기 방식으로 연결할 파일을 지정.
//                 const data = await res.json(); // res.json를 가져옴. 데이터의 유형 지정
//                 const videos = data.movieList; // 지정된 파일의 객체명(json.객체명)을 지명 

//                 console.log(videos);

//                 if(videos.length > 0){
//                     const randomIndex = Math.floor(Math.random() * videos.length);
//                     setRandomVideo(videos[randomIndex]) // setRandomVideo에 대입
 
//                 }else{
//                     // 불러올 비디오의 파일이 없을 경우
//                     console.warn('no Video!')// warn 콘솔창에 경고창을 띄우기(노란색)
//                 }
//             }catch(error){ // 가져오는 동안 문제가 생기는 블록 구문 
//                 // try가 실행되는 동안 감지되는 예외를 처리하는 구문 
//                 // 어떠한 경우에서 파일을 불러오지 못하는 경우 
//                 console.error('video Error:', error);
//             }
//         }
//         // 내부에서 호출
//         fetchVideos();
//     },[]); // 종속성 배열

//     // 랜덤비디오를 못찾을 경우 (파일 경로(fetch)을 잘못 넣을때)
//     if(!randomVideo){
//         return <p>이미지를 로딩중입니다.</p>
//     }
//     // 종속성 배열
//     // useEffect는 기본적으로 마운트될때마다 계속 실행을 하기 때문에 무한 파싱이나 로딩이 걸릴 수 있다.
//     // 구성요소가 모두 렌더링될때 한번만 실행되도록 마지막 구문에 빈 배열을 추가해준다. (*무한로딩 방지)
//     return(
//         <>
//             <MainVideoWrapper>
//                 <video autoPlay muted loop src={randomVideo.url}></video>
//                 <div className="textBox">
//                     <div className="text">
//                         <h2>{randomVideo.title}</h2>
//                         <p>{randomVideo.text}</p>
//                     </div>
//                     <div className="linkBox">
//                         <Link className='dic-btn' to={randomVideo.link}>
//                              <FaPlay/> 재생</Link>
//                         <Link className='info-btn' to={randomVideo.link}>
//                             <HiViewList/> 자세히 보기</Link>
//                     </div>
//                 </div>
//             </MainVideoWrapper>
//         </>
        
//     )
// }

// const MainVideoWrapper = styled.div`
//     position: relative;
//     top : 0px;
//     left: 0px;
//     width: 100%;
//     height: 100vh;

//     video{
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//     }
//     .textBox{
//         position: absolute;
//         top:50%;
//         transform : translateY(-50%);
//         left : 5%;
//         display: flex;
//         flex-direction: column;
//         gap: 50px;
//         .text{
//             display: flex;
//             flex-direction: column;
//             gap: 12px;
//             h2{
//                 color: #ffffff;
//                 font-size : 60px;
//                 font-weight: bold;
//             }
//             p{
//                 color: #ffffff;
//                 font-size : 24px;

//             }
//         }
//         .linkBox{
//             display: flex;
//             gap: 24px;
//             a{
//                 font-size: 16px;
//                 color: #ffffff;
//                 border: solid 1px #ffffff;
//                 border-radius: 5px;
//                 padding: 10px 30px;
//                 transition: 500ms;
//                 background: rgba(255,255,255,0.3);
                
//                 &:hover{
//                     background: rgba(255,255,255,0.1);
                    
//                 }
//             }

//         }
//     }

// `


// /*

// 동기형 데이터 : 서버에 요청을 보냈을때 보낸 요청이 돌아왔을때 다음 동작이 수행하는 방식 
// 이전 작업이 완료될때까지 다음 작업은 실행하지 않는다. 

// -- 차이점
// 비동기형 (동시 작업이 아닌): 서버에 요청을 보냈을때 응답 상태와 상관없이 다음 작업을 실행 
// 동시에 여러 작업을 하게 되면 순차적으로 실행하지 않고 동시에 실행한다. 

// 동기형 (동시 작업)은 로직이 직관적으로 보여서 작업하는데 수월하지만 순차적으로 작업을 실행하기 때문에 
// 시간이 오래걸리는 작업에서는 단점으로 작용된다.

// => 비동기형은 구조는 복잡하지만 동시에 여러작업을 실행하기 때문에 효율적
 
// */

import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import request from "../api/request";
import {styled} from 'styled-components';

export default function MainVideo(){
    const [movie, setMovie] = useState(null);
    const [showImg, setShowImg] = useState(true); // 처음에 이미지가 보여야 하므로 값을 true로 설정한다.
    const [videoKey,setVideoKey] = useState(null);

    // 파일안에 있는 경로를 가져옴 
    useEffect(()=>{
        fetchData(); 
    },[]); 

    
    useEffect(()=>{
        if(showImg && videoKey){
            changeVideo();
        }
    },[showImg, videoKey]); 

    const fetchData = async()=>{
        try{
            // 원하는 장르를 가져옴
            const res = await axios.get(request.fetchNowPlayMovie);
            const movieId = 
            // axios에서 가져오는건 data를 꼭 기입해야한다.
            res.data.results[
                Math.floor(Math.random()* res.data.results.length)
            ].id;
            //console.log(res.data.results.length); // 20
            // setMovie(movieId); // 이미지
            
            
            
            const {data : movieDetail} = await axios.get(`movie/${movieId}`,{ // movie/${movieId} 유튜브 주소
                params : {append_to_response : 'videos'},
            })
            // 비디오와 이미지 
            if(movieDetail.videos && movieDetail.videos.results.length > 0){
                //console.log(movieDetail.videos.results[0].key);
                setMovie(movieDetail);
                setVideoKey(movieDetail.videos.results[0].key); 
                
                setTimeout(()=>{
                    setShowImg(false);
                },4000);
            }
           
        }catch(error){
            console.log('에러 내용:',error);
        }  
    }

    // 이미지 위에 비디오
    const changeVideo = () =>{
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = '';

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&mute=1&loop=1&playlist=${videoKey}`;
        iframe.width = "100%";
        iframe.height = "100%";
        videoContainer.appendChild(iframe);

    }


    return(
        <>
        {showImg && movie && (
            <MainVideoWrapper img={movie.backdrop_path}> {/*background사용시 props를 받아와야하기 때문에 작성해야한다. */}
                {/* <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/> */}
            </MainVideoWrapper>
        )}
        <VideoWrapper id="videoContainer">

        </VideoWrapper>
        </>
    )


}




const MainVideoWrapper = styled.div`
    background: url(https://image.tmdb.org/t/p/original/${(props)=>props.img});
    position: relative;
    top : 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background-position: center center;
    background-size: cover;

    video{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .textBox{
        position: absolute;
        top:50%;
        transform : translateY(-50%);
        left : 5%;
        display: flex;
        flex-direction: column;
        gap: 50px;
        .text{
            display: flex;
            flex-direction: column;
            gap: 12px;
            h2{
                color: #ffffff;
                font-size : 60px;
                font-weight: bold;
            }
            p{
                color: #ffffff;
                font-size : 24px;

            }
        }
        .linkBox{
            display: flex;
            gap: 24px;
            a{
                font-size: 16px;
                color: #ffffff;
                border: solid 1px #ffffff;
                border-radius: 5px;
                padding: 10px 30px;
                transition: 500ms;
                background: rgba(255,255,255,0.3);
                
                &:hover{
                    background: rgba(255,255,255,0.1);
                    
                }
            }

        }
    }

`

const VideoWrapper = styled.div`
    width: 100vw;
    height: 100vh;


`

{/* <div className="textBox">
//                     <div className="text">
//                         <h2>{randomVideo.title}</h2>
//                         <p>{randomVideo.text}</p>
//                     </div>
//                     <div className="linkBox">
//                         <Link className='dic-btn' to={randomVideo.link}>
//                              <FaPlay/> 재생</Link>
//                         <Link className='info-btn' to={randomVideo.link}>
//                             <HiViewList/> 자세히 보기</Link>
//                     </div>
//                 </div> */}



























