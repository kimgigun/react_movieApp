import Axios from 'axios';
import React, { useEffect, useState} from 'react';
import './favorite.css';

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
        <div>
            <div>favorite 페이지</div>
            <div style={{width:'85%', margin:'3rem, auto'}}>
                <h2>Favorite Movies</h2>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie Runtime</th>
                            <th>remove from favorites</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {MovieList && MovieList.map((item, index) =>(
                            <tr key={index}>
                                <td>{item}</td>
                                <td></td>
                                <td></td>
                            </tr>    
                            )
                        )} */}
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FavoritePage
