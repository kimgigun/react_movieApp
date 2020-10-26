import React from 'react';
import {Col} from 'antd';

function GirdCards(props) {
    if(props.landingPage){
        return (
            <Col lg={6} md={8} xs={24}>
                <div>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{height:'100%'}} src={props.image} alt={props.movieName}/>
                    </a>
                </div>
                
            </Col>
        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div>
                    <img style={{width:'100%', height:'320px'}} src={props.image} alt={props.charactorName}/>
                </div>
                
            </Col>
        )
    }
}

export default GirdCards
