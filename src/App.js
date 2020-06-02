import React from 'react';
import './App.css';
import Topbar from "./components/Topbar";
import Weather from "./screens/Weather";
import Favourites from "./screens/Favourites";
import {BrowserRouter,Switch,Route} from "react-router-dom";


class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            favourites:[],
        };
    }

    async componentDidMount() {
       let favourites = await localStorage.getItem("favourites")
        if (favourites)
            this.setState({favourites: JSON.parse(favourites)})
    }

    addFavourite = (currentCity, weatherDetails)=>{
        const {favourites} = this.state;
        const favourite = {...currentCity, weatherDetails}
        favourites.push(favourite);
        this.setState({favourites, currentCity})
        localStorage.setItem("favourites", JSON.stringify(favourites))
    }

    removeFavourite = (currentCity) =>{
        let {favourites} = this.state;
        favourites = favourites.filter(item => item.name !== currentCity.name);
        this.setState({favourites, currentCity})
        localStorage.setItem("favourites", JSON.stringify(favourites))
    }

    render() {
        const {favourites, currentCity} = this.state;
        return (
            <div className="App">
                <Topbar/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <div className={"welcome-screen"}>
                                <div> Welcome To The Weather App!</div>
                                <div style={{fontSize: 25, marginTop: 20}}> Please navigate through the links in the top right corner of the screen.</div>
                            </div>
                        </Route>
                        <Route path="/weather" component={(props)=> <Weather
                            {...props}
                            currentCity={currentCity}
                            favourites={favourites}
                            addFavourite={this.addFavourite}
                            removeFavourite={this.removeFavourite}/>}>
                        </Route>
                        <Route path="/favourites">
                            <Favourites favourites={favourites}/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }

}

export default App;
