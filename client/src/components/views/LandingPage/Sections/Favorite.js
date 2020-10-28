import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Button} from 'antd';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = localStorage.getItem('userId');
    const movieTitle = props.movieTitle;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;
    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let variable = {
        userFrom : userFrom,
        movieId : movieId,
        movieTitle : movieTitle,
        moviePost : moviePost,
        movieRunTime : movieRunTime
    }

    useEffect(()=>{

        Axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber)
                }else{
                    alert('favoriteNumber 정보를 가져오는데 실패 했습니다.');
                }
            })

        Axios.post('/api/favorite/favorited', variable)
        .then(response =>{
            if(response.data.success){
                setFavorited(response.data.favorited > 0? true : false)
            }else{
                alert('favorited 정보를 가져오는데 실패 했습니다.');
            }
        })


    },[]);

    const changeToFavorite = () => { 

        if(Favorited) {

            Axios.post('/api/favorite/removeToFavorite', variable)
            .then(response =>{
                if(response){
                    console.log('삭제성공');
                    setFavorited(!Favorited);
                    setFavoriteNumber(FavoriteNumber-1);
                }else{
                    alert('favorite 삭제 실패');    
                }
            })
           
        }else{

            Axios.post('/api/favorite/addToFavorite', variable)
            .then(response =>{
                if(response.data.success){
                    console.log('추가성공');
                    setFavorited(!Favorited);
                    setFavoriteNumber(FavoriteNumber+1);
                }else{
                    alert('favorite 추가 실패');
                }
    
            })

        }
       
    }

    return (
        <div>
            <Button onClick={changeToFavorite}>{!Favorited ? 'Not Favorited' : 'Add to Favorite'} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
