import React from 'react';
import '../styles/favourites.scss';
import WeatherItem from "../components/WeatherItem";
import {Link} from "react-router-dom"


class Favourites extends React.Component{

    constructor(props){
        super(props)
        this.state={};
    }

    render() {
        const {favourites} = this.props;
        return (
            <div className="favourites-container">
                {favourites.map((item,index)=>
                    <div key={index} style={{marginBottom: 10, marginRight: 10}}>
                        <Link to={{pathname: "/weather", state:{selectedFromFavourites: item}}} style={{textDecoration: "none"}}
                              >
                            <WeatherItem
                                currentCity={item}
                                weatherDetails={item.weatherDetails}
                                disableFavourite = {true}/>
                        </Link>
                    </div>)
                }
            </div>
        );
    }
}

export default Favourites;
