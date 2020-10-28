import React,{useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMAGE_BASE_URL} from "../../Config";
import MainImage from './Sections/MainImage';
import GridCards from '../Commons/GridCard';
import {Row} from 'antd';


function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [pageNum, setpageNum] = useState(0);

    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovie(endpoint);
    },[])

    const fetchMovie = (ePoint) =>{
        fetch(ePoint)
        .then(response => response.json())
        .then(response => {console.log(response);
            setMovies([...Movies, ...response.results])
            setMainMovieImage(response.results[0])
            setpageNum(pageNum+1);
            }
        )
    }

    const loadMoreItem = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum+1}`;
        fetchMovie(endpoint);
    }


    return (
        <>
            <div style={{width:"100%", margin:"0"}}>

                {MainMovieImage && 
                    <MainImage 
                        image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                        title={MainMovieImage.original_title}
                        text={MainMovieImage.overview}
                    ></MainImage>
                }
                <div style={{width:'85%', margin:'1rem auto'}}>

                    <h2>Movies by latest</h2>
                    <hr/>
                    <Row gutter={[16, 16]}>
                        {Movies && Movies.map((movie, index)=>(
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={movie.poster_path ? 
                                        `${IMAGE_BASE_URL}w300${movie.poster_path}` : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                    landingPage={true}
                                />
                            </React.Fragment>
                        ))}
                    </Row> 
                </div>

                <br/>
                <div style={{display:"flex", justifyContent:'center'}}>
                    <button onClick={loadMoreItem}>Load more</button>
                </div>

            </div>
        </>
    )
}

export default LandingPage