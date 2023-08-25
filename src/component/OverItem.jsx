import React, {useState} from "react";
import styled  from "styled-components";
import {RiCloseLine} from 'react-icons/ri';
import Modal from './Modal';
import { Link } from "react-router-dom";
import DetailPage from "./DetailPage";


export default function OverItem({backdrop_path, title, overview,setIsHover,movieId}){
    const [modal, setModal] = useState(false);
    const onClick = ()=>{
        setModal(true);
    }
    console.log(movieId);


    return(
        <>
            <HoverWrap>
            <HoverCloseBtn onClick={()=>setIsHover(false)}>
                        <RiCloseLine className='close'/>
                    </HoverCloseBtn>
                <Link to={`/movie/${movieId}`}>
                <ImgWrap>
                    <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}/>
                </ImgWrap>
                </Link>

                <ControlWrap onClick={()=>onClick()}>
                    <h2>{title}</h2>
                    <p>{overview}</p>
                </ControlWrap>
            </HoverWrap>
            {modal && (
                <Modal
                    backdrop_path = {backdrop_path}
                    title={title}
                    overview = {overview}
                    setModal={setModal} 


                    
                />
            )}
        </>
    )
}


const HoverWrap = styled.div`
    width: 500px;
    height: 500px;
    background: gray;
    //opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-150px, -150px);
    z-index: 999;
`

const ImgWrap = styled.div`
    width: 100%;
    overflow: hidden;
    img{
        width: 100%;
        
    }
`

const HoverCloseBtn = styled.button`
    cursor: pointer;
    color: #ffffff;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000;
    border-radius: 100%;

    .close{
        font-size: 60px;
        color: #ffffff;
        
    }
`

const ControlWrap = styled.div`
    padding: 12px;
    box-sizing: border-box;
    h2{
        font-size: 20px;
        color: #ffffff;
    }
    p{
        font-size : 14px;
        color: #ffffff;
    }
`