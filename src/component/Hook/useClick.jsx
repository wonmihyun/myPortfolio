import React, { useEffect } from "react";

export default function useClick(ref, handler){
    useEffect(()=>{
        const eventListner = (e) =>{
            if(ref.current || ref.current.contains(e.target)){
                return 
            } 
            handler(e);
        }

            document.addEventListener('mousedown',eventListner); 
            
            return() =>{
                // 컴포넌트가 언마운트시 이벤트 없애기 (이벤트 초기화)
                document.removeEventListener('mousedown',eventListner); 
            }

    },[ref,handler]); // 무한 로딩 방지 
}