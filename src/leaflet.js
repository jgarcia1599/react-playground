import React, { Component } from "react";
import './map.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {Link} from "react-router-dom";


class LeafletMap extends Component{
    state = {
      boats:this.props.map_data,
      activeBoat:null,
      setactiveBoat:null
    }
    render(){
      console.log(this.state.boats);
  
      //Center the map around abu dhabi with little to no zoom
      return (
        <div>
        <Map center={[24.453884, 54.377342]} zoom={5} maxZoom={5} className="leaflet-container">
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.props.map_data.map((boat,index) => {
          return(
            <Marker 
            key={index} 
  
            position={boat.props.lat_long} 
  
            onClick={() => {
              this.setState({
                activeBoat:boat
              });
              console.log(this.state.activeBoat)
            }}       
            />)
        })}
          {this.state.activeBoat && 
          <Popup
          position={this.state.activeBoat.props.lat_long} 
          onClose={() => {
            this.setState({
                activeBoat:null
              });
              
            }}
          >
          <div>
          <h2>
          <Link to={{
            pathname:"/boatview",
            state:{
              boatname:this.state.activeBoat.props.name,
              time:this.state.activeBoat.props.date,
              img_src:this.state.activeBoat.props.source,
              lat_long:this.state.activeBoat.props.lat_long
    
            }
          }}> {this.state.activeBoat.props.name}</Link></h2>
            <p>Time Period: {this.state.activeBoat.props.date}</p>
          </div>
          </Popup>      
          }
  
        </Map>
        </div>
      )
    }
  }

  export {LeafletMap};