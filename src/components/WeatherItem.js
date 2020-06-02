
import React from "react";
import moment from "moment";
import Image from "react-bootstrap/esm/Image";
import { FaHeart } from 'react-icons/fa';


function WeatherItem({disableFavourite,currentCity,weatherDetails, isFavourite, addFavourite, removeFavourite}) {
    return (
        <div className={"current-city-weather"} style={{backgroundColor: weatherDetails[0].IsDayTime? "lightskyblue" : "rgba(3,13,59,0.84)"}}>
            { disableFavourite ? null :
                <div onClick={isFavourite? ()=>removeFavourite(currentCity) :
                ()=> addFavourite(currentCity,weatherDetails)}>
            <FaHeart
                size={18}
                style={{color: isFavourite? "red" : "grey", position: "absolute", top: 10, right: 10,}}/>
            </div>}
            <div>{currentCity.name}</div>
            <div>{moment.parseZone(weatherDetails[0].LocalObservationDateTime).format("DD/MM/YYYY HH:mm")}</div>
            <div>{weatherDetails[0].WeatherText}</div>
            <Image src={require("../images/" + weatherDetails[0].WeatherIcon + ".png")}/>
            <div>{weatherDetails[0].Temperature.Metric.Value + " C"}</div>
            <div>{weatherDetails[0].Temperature.Imperial.Value + " F"}</div>
        </div>
    );
}

export default WeatherItem;