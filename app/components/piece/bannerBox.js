import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/css/image-gallery.css";

export default class BannerBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    render(){
        let images = this.props.images;

        return (
            <ImageGallery
                items={ images }
                // autoPlay={true}
                onClick={() => {
                    let id = this.state.slideIndex;
                    console.log(images[id].href);
                }}
                onSlide={(currentIndex) => {
                    this.setState({
                        slideIndex: currentIndex,
                    });
                }}

                showFullscreenButton={false}
                showThumbnails={false}
                showPlayButton={false}
                showBullets={true}
            />
        );
    }
}