import React from 'react'


import hero_img from '../src/assets/hero_img.png'
import './styles/hero.css'

const Hero = () => {

    console.log(hero_img)

    return (
        <div className="hero-main">
            <div class="hero-text">
                <h3>
                    <span class="line"></span>
                    OUR BESTSELLERS
                </h3>
                <h1>Latest Arrivals</h1>
                <a href="#" class="shop-now">
                    Shop Now <span class="line"></span>
                </a>
            </div>

            <div className="hero-image">
                <img src={hero_img} alt="Hero section showcasing our latest arrivals" />

            </div>
        </div>
    )
}

export default Hero