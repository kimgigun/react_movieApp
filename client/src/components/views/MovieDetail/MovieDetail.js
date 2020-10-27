import React, {useEffect, useState} from 'react';
import MainImage from '../LandingPage/Sections/MainImage';
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../../Config';
import MovieInfo from '../LandingPage/Sections/MovieInfo';
import {Row, Button} from 'antd';
import GridCards from '../Commons/GridCard';
import Favorite from '../LandingPage/Sections/Favorite';

function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    console.log('movieId:'+movieId);
    const [Movie, setMovie] = useState([]);
    const [Cast, setCast] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);


    useEffect(()=>{
        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        fetch(endPointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response);
        })

        fetch(endPointCrew)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setCast([...response.cast]);
        })

    }, []);

    const toggleCastView = ()=>{
        ActorToggle ? setActorToggle(false) : setActorToggle(true)
    }

    return (
        <div>
            {/* header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            ></MainImage>

            {/* Body */}

            <div style={{width:'85%', margin:'1rem auto'}}>
                <MovieInfo movie={Movie}/>
            <br/>
            
            <div style={{display:'flex', justifyContent:'flex-end', margin:'1rem auto'}}>
                <Favorite movieInfo={Movie} movieId={movieId} useFrom={localStorage.getItem('useId')}/>
             </div>


            <div style={{display:'flex', justifyContent:'center', margin:'1rem auto'}}>
                <Button onClick={toggleCastView}>Toggle Actor View</Button>
            </div>

           

            {ActorToggle && 
                <Row gutter={[16, 16]}>
                    {Cast && Cast.map((cast, index)=>(
                        <React.Fragment key={index}>
                            <GridCards 
                                image={cast.profile_path ? 
                                    `${IMAGE_BASE_URL}w400${cast.profile_path}` : null}
                                charactorName={cast.name}
                            />
                        </React.Fragment>
                    ))}
                </Row> 
            }

            </div>

            
            
        </div>
    )
}

export default MovieDetail
