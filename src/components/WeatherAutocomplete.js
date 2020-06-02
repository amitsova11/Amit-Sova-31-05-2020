import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';


class WeatherAutocomplete extends React.Component {

    constructor(props){
        super(props)
        this.state={
            open: false,
            options: [],
            loading: false,
        }
    }

    onValueChange = async (value)=>{
        await this.props.setWeather(value);
    }

    onInputChange = async (searchWord) => {
       this.setState({loading: true})
       let active = true;
       if (searchWord === "")
           return;
       let searchURL = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=PQCuIPYAQGdQvHhTICCOp0agNU2iQAVC'
       searchURL = searchURL + "&q=" + searchWord;
       const response = await fetch(searchURL);
       try {
           const cities = await response.json();
           if (active) {
               this.setState({
                   options: cities.map(city => {
                       return {name: city.LocalizedName, value: city.Rank, key: city.Key}
                   })
               });
           }
       } catch (e) {
           this.setState({loading: false})
           return;
       }
       this.setState({loading: false})
       return;
   }

   render() {
        const {options, loading} = this.state;
       return (
           <Autocomplete
               size={"small"}
               id="asynchronous-demo"
               classes={{root: "autocomplete"}}
               style={{ width: 250, }}
               open={this.state.open}
               onOpen={() => {
                   this.setState({open:true});
               }}
               onClose={() => {
                   this.setState({open:false});
               }}
               getOptionSelected={(option, value) => option.name === value.name}
               getOptionLabel={(option) => option.name}
               options={options}
               loading={loading}
               onChange={(event,value) => this.onValueChange(value)}
               onInputChange={ async (event,value,reason) => {
               await this.onInputChange(value)}}
               renderInput={(params) => (
                   <TextField
                       {...params}
                       label="Choose Location"
                       variant="outlined"
                       InputProps={{
                           ...params.InputProps,
                           endAdornment: (
                               <React.Fragment>
                                   {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                   {params.InputProps.endAdornment}
                               </React.Fragment>
                           ),
                       }}
                   />
               )}
           />
       );
   }
}

export default WeatherAutocomplete;