import React, { useEffect, useState } from 'react'

const Clima = ({climate}) => {
    const [click, setClick] = useState(true)

    const celcius= Math.round(climate?.main.temp - 273.15)
    const kelvin= Math.round(climate?.main.temp)

    const onclick=()=>{
        setClick(false)
        if (click===false) {
            setClick(true)
        }
        else{setClick(false)}
    }

    return (
        <main className='hero'>
            <section className='Card'>
                <header className='head'>
                    <h1>Weather Data</h1>
                    <h4>City: {`${climate?.name}, ${climate?.sys.country}`}</h4>
                </header>
                <article className='hero-body'>
                    <div className='temperature'>
                        <img className='meteorologic' src={`http://openweathermap.org/img/wn/${climate?.weather[0].icon}.png`}/>
                        <h4>{click? `${celcius}°C`:`${kelvin} K`}</h4>
                    </div>
                    <div className='description'>
                        <div className='title'>
                            <h4>
                                {<i className='bx bxs-quote-alt-left'></i>}{climate?.weather[0].description}<i className='bx bxs-quote-alt-right' ></i>
                            </h4>
                        </div>
                        <div className='data'>
                            <p className='windSpeed'><i className='bx bx-wind'></i><b>Wind Speed</b>{climate?.wind.speed} m/s</p>
                            <p className='cloud'><i className='bx bxl-google-cloud'></i><b>Cloude</b>{climate?.clouds.all}%</p>
                            <p className='pressure'><i className='bx bxs-thermometer'></i><b>Pressure</b>{climate?.main.pressure} mb</p>
                            <p className='humidity'><i className='bx bxs-droplet'></i><b>Humidity</b>{climate?.main.humidity}%</p>
                        </div>
                    </div>
                </article>
                <div>
                <button onClick={onclick}>{click?'Change to K':'Change to °C'}</button>
                </div>
            </section >
        </main >
    )
}

export default Clima