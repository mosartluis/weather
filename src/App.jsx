import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import dayClear from './img/day-clear.png'



function App() {
  const [latLon, setLatLon] = useState({})
  const [weather, setWeather] = useState({})
  const [temperature, setTemperature] = useState('')
 
const getElement = array => {
  const tempCels = ((weather?.main?.temp -273.15).toFixed(1))
  console.log(tempCels)
}

function changeTemperature(){
  const dataTemperature = temperature.split('°');
  const temperatureCopy = Number(dataTemperature[0]);
  const unit = dataTemperature[1];
  if(unit === 'C'){
    const newTemperature = `${((temperatureCopy * 9/5) + 32 ).toFixed(2)}°F`;  
    setTemperature(newTemperature);
  }else {
    const newTemperature = `${((temperatureCopy - 32)* 5/9).toFixed(2)}°C`
    setTemperature(newTemperature);
  }
}

  useEffect(() =>{
  const success = pos => {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    setLatLon({lat, lon})
  }  

  navigator.geolocation.getCurrentPosition(success)
}, [])

useEffect(() => {
  if(Object.keys(latLon).length > 0){
    const API_KEY = '197380db3844d7bf24a2684a382a7de0'  
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${API_KEY}`
  
    axios.get(URL)
      .then(res => {
        console.log(res.data)
        setWeather(res.data)
        console.log(`${(res.data.main.temp -273.15).toFixed(2)}°C`)
        setTemperature(`${(res.data.main.temp -273.15).toFixed(2)}°C`)
      })
      .catch(err => console.log(err))
  }
}, [latLon])


return (
  <article className='card' style={{background: dayClear}}>
      <div className="App">
        <h1 className='AppName'>City: {`${weather?.name} ${weather?.sys?.country}`}</h1>
        <h2 className='AppClouds'>Cloud: {(weather?.clouds?.all)}</h2>
        <h2 className='AppTemp'>Temperature: {temperature}</h2>
        <img className='AppImg' src={dayClear}/>       
        <h2><button className='AppBtn' onClick={() => changeTemperature()}>&#62;</button></h2>
        
      </div>
      <div className="weather-more-info">
        <div className="wind">
          <div className="icon">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wind" className="svg-inline--fa fa-wind fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z">
                  </path>
                </svg>
          </div>
          <div className="value">
                <span>{`${weather?.wind?.speed}`}</span>
                <span> m/s Wind</span>                
          </div>
        </div>
        <div className="humidity">
          <div className="icon">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud-rain" className="svg-inline--fa fa-cloud-rain fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M416 128c-.6 0-1.1.2-1.6.2 1.1-5.2 1.6-10.6 1.6-16.2 0-44.2-35.8-80-80-80-24.6 0-46.3 11.3-61 28.8C256.4 24.8 219.3 0 176 0 114.1 0 64 50.1 64 112c0 7.3.8 14.3 2.1 21.2C27.8 145.8 0 181.5 0 224c0 53 43 96 96 96h320c53 0 96-43 96-96s-43-96-96-96zM88 374.2c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0zm160 0c-12.8 44.4-40 56.4-40 87.7 0 27.7 21.5 50.1 48 50.1s48-22.4 48-50.1c0-31.4-27.2-43.1-40-87.7-2.2-8.1-13.5-8.5-16 0z">                  
                  </path>
                </svg>
          </div>
          <div className="value">
          <span>{`${weather?.main?.humidity}`}</span>
            <span> Humidity</span>
          </div>
        </div>
        <div className="pressure">
          <div className="icon">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="temperature-low" className="svg-inline--fa fa-temperature-low fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M416 0c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm-160-16C256 50.1 205.9 0 144 0S32 50.1 32 112v166.5C12.3 303.2 0 334 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-34-12.3-64.9-32-89.5V112zM144 448c-44.1 0-80-35.9-80-80 0-25.5 12.2-48.9 32-63.8V112c0-26.5 21.5-48 48-48s48 21.5 48 48v192.2c19.8 14.8 32 38.3 32 63.8 0 44.1-35.9 80-80 80zm16-125.1V304c0-8.8-7.2-16-16-16s-16 7.2-16 16v18.9c-18.6 6.6-32 24.2-32 45.1 0 26.5 21.5 48 48 48s48-21.5 48-48c0-20.9-13.4-38.5-32-45.1z">
                </path>
            </svg>
          </div>
          <div className="value">
          <span>{`${weather?.main?.pressure}`} mb</span>
            <span> Pressure</span>
          </div>
        </div>
      </div>
  </article> 



)
}

export default App
