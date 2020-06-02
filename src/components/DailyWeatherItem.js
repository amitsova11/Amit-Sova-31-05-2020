
import React from "react";
import moment from "moment";
import Image from "react-bootstrap/esm/Image";

function DailyWeatherItem({item}) {
    return (
        <div className={"daily-forecast"}>
            <Image src={require("../images/" + item.Day.Icon + ".png")}/>
            <div>{moment.parseZone(item.Date).format("DD/MM/YYYY")}</div>
            <div>{"Max: " + item.Temperature.Maximum.Value + " F"}</div>
            <div>{"Min: " + item.Temperature.Minimum.Value + " F"}</div>
            <div>{"Day: " + item.Day.IconPhrase}</div>
            <div>{"Night: " + item.Night.IconPhrase}</div>
        </div>
    );
}

export default DailyWeatherItem;