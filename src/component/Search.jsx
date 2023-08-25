import React,{useState} from "react";
import {BiSearch} from 'react-icons/bi';
import {MdClear} from 'react-icons/md';

import { useNavigate } from "react-router-dom";
import {styled} from 'styled-components';


export default function Search(){
    const [text, setText] = useState('');
    const navigate = useNavigate(); // 페이지를 이동할때 사용하는 Router Hook
    // Link와 같은 역할을 하지만 이벤트나 어떤 행동이후에 동작하도록 할때에는 useNavigate() hook을 이용한다.
    
    const [visible, setVisible] = useState(false);
    const [showClearBtn , setShowClearBtn] = useState(false);


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



    return(
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