import React from "react"

const Form=(props)=>{
    return(
        <form onSubmit={props.loadWeather}>
            <input type="text" placeholder="choose a city" name="city" /> 
            <input type="text" placeholder="choose a country" name="country" />
            <button>Get weather</button>
        </form>
    )
}

export default Form