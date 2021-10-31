import React from "react"

const Forcast=(props)=>{
    return(
        <div className="weather">
            {props.country && props.city && <p>location:
            {props.city} && {props.country}</p>}
            {props.temperature && <p>temperature : {props.temperature}</p>}
            {props.humidity && <p>humidity : {props.humidity}</p>}
            {props.pressure && <p>pressure : {props.pressure}</p>}
            {props.icon && <img src={`http://openweathermap.org/img/wn/${props.icon}.png`} alt="weather" />}
            {props.description && <p>conditions :{props.description}</p>}
            {props.error && <p>{props.error}</p>}



        </div>
    )
}

export default Forcast