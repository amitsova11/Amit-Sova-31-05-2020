import React from 'react';
import '../styles/weather.scss';
import WeatherAutocomplete from "../components/WeatherAutocomplete";
import fetch from "cross-fetch";
import WeatherItem from "../components/WeatherItem";
import DailyWeatherItem from "../components/DailyWeatherItem"
class Weather extends React.Component{

    constructor(props){
        super(props)
        this.state={
            currentCity:{
                name:"Tel Aviv",
            }
        };
    }

    async componentDidMount() {
        //check if there has been a redirection from favourites screen
        if (this.props.location.state){
            const {selectedFromFavourites} = this.props.location.state;
            if (selectedFromFavourites)
                await this.setWeather(selectedFromFavourites)
        }
        else if (this.props.currentCity)
            await this.setWeather(this.props.currentCity)
        else
            await this.setWeather({name: "Tel Aviv", key: "215854" })
    }

    setWeather = async (value)=>{
        try {
            let weatherURL = "http://dataservice.accuweather.com/currentconditions/v1/" + value.key + "?apikey=PQCuIPYAQGdQvHhTICCOp0agNU2iQAVC";
            const weatherResponse = await fetch(weatherURL);
            let fiveDaysForecastUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + value.key + "?apikey=PQCuIPYAQGdQvHhTICCOp0agNU2iQAVC";
            const fiveDaysResponse = await fetch(fiveDaysForecastUrl);
            const weatherDetails = await weatherResponse.json();
            const fiveDaysDetails = await fiveDaysResponse.json();
            this.setState({
                weatherDetails,fiveDaysDetails,currentCity: value
            });
        } catch (e) {
            alert("Bad response from AccuWeather API - the number of allowed daily API calls has been exceeded");
            return;
        }
    }

    render() {
        let {weatherDetails,fiveDaysDetails,currentCity} = this.state;
        let {addFavourite, removeFavourite, favourites} = this.props;
        let isFavourite = false;
        //check if the current city is a favourite
        for (const item of favourites) {
            if (item.name === currentCity.name)
                isFavourite = true;
        }
        return (
            <div className="weather-container">
                <WeatherAutocomplete setWeather={this.setWeather}/>
              {weatherDetails && <WeatherItem
                  currentCity={currentCity}
                  weatherDetails={weatherDetails}
                  addFavourite = {addFavourite}
                  removeFavourite={removeFavourite}
                  isFavourite={isFavourite}
              /> }
                {fiveDaysDetails && <div className={"five-days-forecast"}>
                    <div style={{padding: "5px", borderRadius: 10,marginTop:10, marginBottom: 10}}>{fiveDaysDetails.Headline.Text}</div>
                    <div className={"five-days-row"}>
                        {fiveDaysDetails.DailyForecasts.map((item,index)=>
                        <DailyWeatherItem key={index} item={item}/>
                        )}
                    </div>
                </div>
                    }
            </div>
        );
    }
}

export default Weather;