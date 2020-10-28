import Axios from 'axios';
import React, { useEffect, useState} from 'react';
import './favorite.css';
import {Button, Popover} from 'antd';

function FavoritePage(props) {

    const [MovieList, setMovieList] = useState([]);


    useEffect(()=>{

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
    },[]);

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
                        {MovieList && MovieList.map((item, index) =>(
                            <tr key={index}>
                                <td>{item.movieTitle}</td>
                                <td>{item.movieRunTime} min</td>
                                <td><Button>remove</Button></td>
                            </tr>    
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FavoritePage
