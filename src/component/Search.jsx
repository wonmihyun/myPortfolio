import React,{useEffect, useState} from "react";
import {BiSearch} from 'react-icons/bi';
import {MdClear} from 'react-icons/md';

import { useNavigate } from "react-router-dom";
import {styled} from 'styled-components';
import axios from "axios";




export default function Search(){
    const [text, setText] = useState('');
    const navigate = useNavigate(); // 페이지를 이동할때 사용하는 Router Hook
    // Link와 같은 역할을 하지만 이벤트나 어떤 행동이후에 동작하도록 할때에는 useNavigate() hook을 이용한다.
    
    const [visible, setVisible] = useState(false);
    const [showClearBtn , setShowClearBtn] = useState(false);
    const [list, setList] = useState(false);  
    // 검색어를 입력했을때의 상태값을 저장하여 새로운 container를 생성
    const [movieList, setMovieList] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    let data = []; // data에 영화 리스트를 받아올 변수 

    const API_KEY = '82776dd4e021405937c471b1f995902b'; // API KEY 
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&sort_by=&include_adult=false&query=${text}&language=ko-KR&page=1`;
    // text : 검색어 

    // 검색창에 검색어가 없는 경우
    useEffect(()=>{
        if(!text){
            setList(false); 
            setIsSearchActive(false); // 스크롤 
        }
    },[text]) // 무한 방지 로딩 

    
    useEffect(()=>{
        if(isSearchActive){  
            document.body.classList.add('on');  // isSearchActive true
        }else{
            document.body.classList.remove('on');  // false
        }
    },[isSearchActive]);



    const toggleInputOpen = (e) =>{
        e.preventDefault() // 기본 이벤트의 동작을 중지 
        /* React에서는 false를 반환해도 기본 동작을 방지할 수 없습니다. 
           반드시 preventDefault를 명시적으로 호출해야 합니다. 
           리액트는 기본동작이 기본적으로 중지되지 않으므로 명시적으로 항상
           e.preventDefault() 를 추가해야한다. (이벤트 중첩 방지)*/
           if(text.trim() !== ''){ // trim() 새 문자를 반환
               setVisible(true);
               //setShowClearBtn(!showClearBtn); // true
            }  
            else{
                setVisible((prev) => !prev); 
            }
    }

    const inputKeyPress = (e)=>{
        if(visible && e.key === 'Enter'){  
            e.preventDefault();
            navigate(`/videos/${text}`) // input검색시 실시간으로 바뀌는 경로 
        }

    }
    
    const onClear = (e) => {
        e.preventDefault();
        setText('');
        setShowClearBtn(false);
    }

    // 검색창
    const fetch = async()=>{
        const res = await axios.get(url);
        data = res.data.results || []; 
        setMovieList(data);  
        //console.log(data);  
         
    }



    return(
        <> 
        <SearchForm visible = {`${visible}`} className={visible ? 'on' : null}>
            {/*검색 아이콘*/}
            <button className="search-btn" onClick={toggleInputOpen}>
                <BiSearch/>  
            </button>
            {visible && (
                <input type='text'
                placeholder="제목,사람,장르"
                value={text}
                onChange={(e)=> {
                    setText(e.target.value)
                    setShowClearBtn(e.target.value.trim() !== '')
                    fetch(setMovieList());
                    setList(true);
                    setIsSearchActive(true);
                    
                }}
                onKeyPress={inputKeyPress} // onKeyPress 자판 키를 누르고 있음
                />
            )}
            {showClearBtn && (
                 <button className="clear-btn" onClick={onClear}>
                    {/*X버튼*/}
                    <MdClear/>
                 </button>
            )}
        </SearchForm>

        <ResultContainer className={(list ? "on" : "")}>
                <div className="searchMovie">
                    <h3>{text}(으)로 검색한 결과입니다.</h3>
                    {list ? (
                        <div className="listContainer">
                            {movieList && movieList.map(movie => (
                                <List props={movie} key={movie.id}/>
                            ))}
                            </div>
                    ) : (
                        <p>loading..</p>
                    )}
                </div>
        </ResultContainer>
        </>
    )
}

const List = (props) => {
    const {backdrop_path, title} = props.props; // backdrop_path 이미지 링크 주소 , title 제목
    const imgUrl = backdrop_path;

    return(
        <div className="listItem">
            <img src={`https://image.tmdb.org/t/p/original/${imgUrl}`} alt={title}></img>
        </div>
    )

}


const SearchForm = styled.form`
    display: flex;
    padding: 2px;
    border: solid 1px transparent;
    overflow: hidden;
    position: relative;
    top: 0;
    left: 0;
     

    &.on{
        border-color : #ffffff;
        background: rgba(0,0,0,0.7);
        transition: 500ms;
    }
    button{
        color: #ffffff;
        font-size:20px;
        display: flex;
        align-items: center;
    }
    input{
        width : ${({visible})=>(visible ? '200px' : '0px')};
        color: #ffffff;
        
    }
    // input창 크기가 변하지 않게 고정해줌 
    .clear-btn{
        position: absolute;
        right: 0px;
        top: 0px;

    }
    
`

const ResultContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #000000;
    display: none;
    z-index: -1;
    padding-top: 100px;
    overflow: scroll;
    

    &.on{
        display: block;
    }

    .searchMovie{
        width: 100%;
        height: 100%;
        position: relative;
        top:0px;
        left: 0px;

        h3{
            color: #ffffff;
            font-weight: bold;
            font-size: 36px;
            text-align: center;
        }
    }

    .listContainer{
        width: 100%;
        height: 100%;
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        .listItem{
            img{
                width : 350px;

            }
        }
    }
`