import Axios from 'axios';
import React, { useEffect, useState} from 'react';
import './favorite.css';
import {Button, Popover} from 'antd';
import Favorite from '../LandingPage/Sections/Favorite';
import {IMAGE_BASE_URL} from '../../Config'
import { removeFileItem } from 'antd/lib/upload/utils';

function FavoritePage(props) {

    const [MovieList, setMovieList] = useState([]);


    useEffect(()=>{
        getMovieList() 
    },[]);

    const getMovieList = ()=>{

        Axios.post('api/favorite/getFavoriteList',{userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success){
                console.log('data');
                console.log(response.data);
                setMovieList(response.data.list);
            }else{
                alert('favorite 리스트 가져오기 실패')
            }
        })
    }

    const removeMovie = (movieId, userFrom)=>{
        Axios.post('api/favorite/removeToFavorite',{movieId: movieId, userFrom:userFrom})
        .then(response => {
            if(response.data.success){
                console.log('data');
                console.log(response.data);
                getMovieList(); 
            }else{
                alert('Favorite Movie 삭제 실패')
            }
        })
     }

    const rendCard = MovieList && MovieList.map((item, index) =>{ 

        const content = 
            <div>
                {item.moviePost ? 
                <img src={`${IMAGE_BASE_URL}w500${item.moviePost}`}></img> : "no image"}
            </div>
     
        return   <tr key={index}>
            <Popover content={content} title={item.movieTitle}>
                <td>{item.movieTitle}</td>
            </Popover>
            <td>{item.movieRunTime} min</td>
            <td><Button onClick={()=>removeMovie(item.movieId, item.userFrom)}>remove</Button></td>
        </tr>    
     }
    )

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <div style={{width:'85%', margin:'3rem auto'}}>
                <h2>Favorite Movies</h2>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie Runtime</th>
                            <th>Remove From Favorites</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rendCard}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FavoritePage
