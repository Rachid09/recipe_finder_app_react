import React from "react"
import './App.css'
import Heading from "./components/heading"
import Form from "./components/form"
import Forcast from "./components/forcast"


const API_KEY="ddcd9173ec756ce8e01fdd926375fdab";

class App extends React.Component{
  state={
    city:"",
    country:"",
    temperature:"",
    humidity:"",
    pressure:"",
    icon:"",
    description:"",
    error:""

  }

  getWeather =async (e)=>{
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    e.preventDefault();
    const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${API_KEY}`)
    const response=await api_call.json()
    if(city && country){
      this.setState({
        city:response.name,
        country:response.sys.country,
        temperature:response.main.temp,
        humidity:response.main.humidity,
        pressure:response.main.pressure,
        icon:response.weather[0].icon,
        description:response.weather[0].description,
        error:""
      })
    }
    else{
    this.setState({
      error:"please fill out input fields"
    })
    }
  }

  render(){
  return(
    <div className="container">
      <Heading />
      <Form  loadWeather={this.getWeather} />
      <div className="weather">
      <Forcast 
      temperature={this.state.temperature}
      country={this.state.country}
      icon={this.state.icon}
      description={this.state.description}
      error={this.state.error}
      humidity={this.state.humidity}
      pressure={this.state.pressure} />
</div>

    </div>
  )
  }
}
export default App