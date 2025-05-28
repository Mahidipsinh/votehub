import React, { useState, useEffect } from 'react';
import './CSS/BackgroundSlider.css';

const BackgroundSlider = () => {
    const [currentImage, setCurrentImage] = useState(1);
    const [images] = useState([
        require('./Images/img1.jpg'),
        require('./Images/img2.jpg'),
        require('./Images/img3.jpg'),
        require('./Images/img4.jpg'),
        require('./Images/img5.jpg'),
        require('./Images/img6.jpg'),
        require('./Images/img7.jpg'),
        require('./Images/img8.jpg'),
        require('./Images/img9.jpg')
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => (prev % images.length) + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="background-slider">
            <div className="sliding-image">
                {images.map((img, index) => (
                    <div 
                        key={index}
                        className={`slide-container ${currentImage === index + 1 ? 'active' : ''}`}
                    >
                        <img 
                            src={img}
                            alt={`Slide ${index + 1}`}
                            className="background-image"
                        />
                        <div className="overlay"></div>
                    </div>
                ))}
            </div>
            <div className="content">
                <h1>Welcome to VoteHub</h1>
                <p>Your trusted platform for secure and transparent online voting</p>
            </div>
            <div className="slider-controls">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`slider-dot ${currentImage === index + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentImage(index + 1)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BackgroundSlider;