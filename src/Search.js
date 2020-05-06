import React, { Component } from "react";
import'bootstrap/dist/css/bootstrap.min.css';
import $ from'jquery';
import Popper from'popper.js';
import'bootstrap/dist/js/bootstrap.bundle.min';

import "./css/Search.css";
import './css/map.css';
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./aux_scripts/components"; // example render components - source below
import {BoatGrid} from './Boats';

import {LeafletMap} from './leaflet';


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
    <BoatGrid name="Boat_1" date={500} lat_long={[25,55]} source={0}/>,
    <BoatGrid name="Boat_2" date={1000} lat_long={[26,54]} source={1}/>,
    <BoatGrid  name="Boat_3" date={280} lat_long={[25,54]} source={0}/>,
    <BoatGrid  name="Boat_4" date={150} lat_long={[26,55]} source={1}/>,
    <BoatGrid name="Boat_5" date={670} lat_long={[27,55]} source={0}/>,
    <BoatGrid  name="Boat_6" date={1900} lat_long={[27,56]} source={1}/>,
    <BoatGrid  name="Boat_7" date={1850} lat_long={[27,54]} source={2}/>
    ],
    min_date: 0,
    max_date:2000,
    current_min_date: 0,
    current_max_date: 0,

    presearch: [],
    boat_results:[
    <BoatGrid name="Boat_1" date={500} lat_long={[25,55]} source={0}/>,
    <BoatGrid name="Boat_2" date={1000} lat_long={[26,54]} source={1}/>,
    <BoatGrid  name="Boat_3" date={280} lat_long={[25,54]} source={0}/>,
    <BoatGrid  name="Boat_4" date={150} lat_long={[26,55]} source={1}/>,
    <BoatGrid name="Boat_5" date={670} lat_long={[27,55]} source={0}/>,
    <BoatGrid  name="Boat_6" date={1900} lat_long={[27,56]} source={1}/>,
    <BoatGrid  name="Boat_7" date={1850} lat_long={[27,54]} source={2}/>
    ],
    map_data:[],
    display : "both"

  };

  searchOnChange = event => {
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

  slideronUpdate = event =>{
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
      max_date: max_date
    })

  }

  chooseDisplay = (display,type) =>{

    if (type === "map"){
      console.log("map")
      this.setState({
        display:"map"
      })

    }
    else if (type === "grid"){
      console.log("grid")
      this.setState({
        display:"grid"
      })


    }
    else if (type === "both"){
      console.log("both")
      this.setState({
        display:"both"
      })
    }
  }

  renderSearch(){
    return(
        <div>
        <h1>Dhakira's 3D[how] Database</h1>
        <input name="text" type="text" placeholder="Search" onChange={event => this.searchOnChange(event)} value={this.state.searchValue}/>
        <p>Time Period</p>
        {/* <input value="0" min="0" max="2000" step="100" type="range"/> */}
        <Slider
          mode={2}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.slideronUpdate}
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
      {/* <div className="btn-group">
        <button type="button" className="btn btn-primary">Map</button>
        <button type="button" className="btn btn-primary">Grid</button>
        <button type="button" className="btn btn-primary">Both</button>
    </div> */}
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Display
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" onClick={ display => this.chooseDisplay(display,"map")}>Map Display</a>
          <a class="dropdown-item" onClick={ display => this.chooseDisplay(display,"grid")}>Grid Display</a>
          <a class="dropdown-item" onClick={ display => this.chooseDisplay(display,"both")}>Dual Display</a>
        </div>
      </div>
      </div>


    )
  };
  render() {
    // //Variable to send boat components to Leaflet Map
    var send_to_map = [];
    if (this.state.display === "both"){
      return (
        <div id="main">
          {this.renderSearch()}
        {this.state.boat_results ? (
          <div id="meals-container">
              {this.state.boat_results.map((boat,index) => {
                var boat_date = boat.props.date
                if(boat_date>this.state.min_date && boat_date< this.state.max_date ){
                  console.log("Render this boat");
                  send_to_map.push(boat);
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
  
      <LeafletMap map_data={send_to_map}/>
      </div> 
      );

    }
    else if (this.state.display === "map"){
      return (
        <div id="main">
          {this.renderSearch()}
        {this.state.boat_results ? (
          <div id="meals-container">
              {this.state.boat_results.map((boat,index) => {
                var boat_date = boat.props.date
                if(boat_date>this.state.min_date && boat_date< this.state.max_date ){
                  console.log("Render this boat");
                  send_to_map.push(boat);
                }
              })}
            </div>
  
          ) : (
            <p>No results!</p>
          )}
  
      <LeafletMap map_data={send_to_map}/>
      </div> 
      );
    }

    else if (this.state.display === "grid") {
      console.log("jdjdjdjdj")
      return (
        <div id="main">
          {this.renderSearch()}
        {this.state.boat_results ? (
          <div id="meals-container">
              {this.state.boat_results.map((boat,index) => {
                var boat_date = boat.props.date
                if(boat_date>this.state.min_date && boat_date< this.state.max_date ){
                  console.log("Render this boat");
                  send_to_map.push(boat);
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
}




export default Search;


