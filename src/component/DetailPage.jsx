import React , {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

export default function DetailPage(){ 
    const {movieId} = useParams();
    const [movie, setMovie] = useState({});

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(
                `/movie/${movieId}`    
            )
            setMovie(request.data);

                console.log(movieId)
        }
        fetchData();
    },[movieId]);

    return (
        <>
        <div>
            {/* {Object.keys(movie)} */}
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>
        </div>
        </>
    )
}