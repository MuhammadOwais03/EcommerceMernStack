import React from 'react'
import exchange_icon from '../src/assets/exchange_icon.png'
import quality_icon from '../src/assets/quality_icon.png'
import support_icon from '../src/assets/support_img.png'
import './styles/service.css'


export const Service = () => {
    return (
        <div className="service-container">
            <div className="ser">
                <img src={exchange_icon} alt="" />
                <p className='bold' >Easy Exchange</p>
                <p className='light' >We offer hassle free exchange policy</p>
            </div>
            <div className="ser">
                <img src={quality_icon} alt="" />
                <p className='bold' >Easy Exchange</p>
                <p className='light' >We offer hassle free exchange policy</p>
            </div>
            <div className="ser">
                <img src={support_icon} alt="" />
                <p className='bold' >Easy Exchange</p>
                <p className='light' >We offer hassle free exchange policy</p>
            </div>


        </div>
    )
}
