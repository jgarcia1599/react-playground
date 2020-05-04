import React, { Component } from "react";
import "./Search.css";
import "./slider.js";
import "./slider.css";
import './map.css';
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./components"; // example render components - source below
import {BoatGrid} from './Boats';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class LeafletMap extends Component{

  state = {
    foo:null,
  }
  render(){
    // console.log(this.props)


    return (
      <Map center={[50, 30]} zoom={2} className="leaflet-container">
      <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    )
  }


  

}


const sliderStyle = {
    position: "relative",
    width: "100%"
  };

const domain = [0, 2000];
const defaultValues = [0, 2000];







class Search extends Component {
  state = {
    searchValue: "", 
    //populate the boats array wth some backend call to the database
    boats: [
    <BoatGrid name="Boat_1" date={500} source={0}/>,
    <BoatGrid name="Boat_2" date={1000} source={1}/>,
    <BoatGrid  name="Boat_3" date={280} source={0}/>,
    <BoatGrid  name="Boat_4" date={150} source={1}/>,
    <BoatGrid name="Boat_5" date={670} source={0}/>,
    <BoatGrid  name="Boat_6" date={1900} source={1}/>,
    <BoatGrid  name="Boat_7" date={1850} source={2}/>
    ],
    min_date: 0,
    max_date:2000,
    boat_results:[
      <BoatGrid  name="Boat_1" date={500} source={0}/>,
      <BoatGrid  name="Boat_2" date={1000} source={1}/>,
      <BoatGrid name="Boat_3" date={280} source={0}/>,
      <BoatGrid  name="Boat_4" date={150} source={1}/>,
      <BoatGrid name="Boat_5" date={670} source={0}/>,
      <BoatGrid  name="Boat_6" date={1900} source={1}/>,
      <BoatGrid  name="Boat_7" date={1850} source={2}/>
    ],
    map_data:[]

  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
    if (this.state.searchValue === ""){
      this.setState({
        boat_results:this.state.boats,
        map_data:[]
      });
    }
    else{
      // this.setState({ searchValue: event.target.value });
      var results=[];
      for (var i = 0; i < this.state.boats.length;i++){
        var searchstring = event.target.value.toLowerCase()
        console.log(this.state.boats[i].props.name.toLowerCase())
        var boatname = this.state.boats[i].props.name.toLowerCase()
        if(boatname.startsWith(searchstring)){
          results.push(this.state.boats[i]);
        }
      }
      this.setState({
        boat_results:results,
      })
    }
    console.log(this.state.boat_results);

  };

  filterBoatname = boat =>{
    console.log(boat.props.name);
    console.log(this.state.searchValue.startsWith(boat.props.name))
    if (this.state.searchValue === " "){
      return boat;
    }
    else if (boat.props.name.startsWith(this.state.searchValue)){
      console.log("im herreee");
      return boat;
    }
  }

  onUpdate = event =>{
    var min_date = event[0];
    var max_date = event[1];

    var slider_results = []
    for (var i = 0; i < this.state.boat_results.length;i++){
      var boat_date = this.state.boat_results[i].props.date;
      if(boat_date>min_date && boat_date<max_date ){
        slider_results.push(this.state.boat_results[i]);
      }
    }
    console.log(slider_results);
    this.setState({
      min_date: min_date,
      max_date: max_date,
      boat_results:slider_results
    })

  }




  render() {
    return (
      <div id="main">
        <h1>Dhakira's 3D[how] Database</h1>
        <input name="text" type="text" placeholder="Search" onChange={event => this.handleOnChange(event)} value={this.state.searchValue}/>
        <p>Time Period</p>
        {/* <input value="0" min="0" max="2000" step="100" type="range"/> */}
        <Slider
          mode={2}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={defaultValues}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={5}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      <br/>
      <br/>

{/* Okay know lets add the LeafletMap component */}
      <LeafletMap map_data={this.state.map_data}/>


      {this.state.boat_results ? (
          <div id="meals-container">
            {this.state.boat_results.map((boat,index) => {
              var boat_date = boat.props.date
              if(boat_date>this.state.min_date && boat_date< this.state.max_date ){
                console.log("Render this boat");
                return (
                  <React.Fragment key={index}>
                      {boat}
                  </React.Fragment>)
              }
            })}
          </div>
        ) : (
          <p>No results!</p>
        )}
    </div>  

    );
  }
}


export default Search;


