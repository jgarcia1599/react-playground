import React, { Component } from "react";
import {Link} from "react-router-dom";
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min';
import "./css/Search.css";


const assets = require('./assets.js');



function BoatGrid(props){

    return(
      <div className="single-meal">
        <Link to={{
          pathname:"/boatview",
          state:{
            boatname:props.name,
            time:props.date,
            img_src:props.source,
            lat_long:props.lat_long
  
          }
        }}
        
        >
        <h1>{props.name}</h1></Link>
        <p>Time Period: {props.date}</p>
        <img src={assets[props.source]} alt="boat-thumbnail" />
      </div>
    )
  }


class BoatView extends Component{

  render(){
    console.log(this.props.location.state);
    return(
      <div id="main">
      <h1>{this.props.location.state.boatname}</h1>
      <h2> Time Period: {this.props.location.state.time}</h2>
      <p>Latitude: {this.props.location.state.lat_long[0]} Longitude: {this.props.location.state.lat_long[1]}</p>
      <img id="ind-boat-display" alt="boat-img"src={assets[this.props.location.state.img_src]}></img>
      <br/>
      <p id="boat-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac turpis egestas integer eget aliquet. Donec adipiscing tristique risus nec feugiat in fermentum posuere. Convallis convallis tellus id interdum velit. Eu turpis egestas pretium aenean pharetra magna. Pretium lectus quam id leo. Lectus quam id leo in vitae turpis massa sed. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Tristique nulla aliquet enim tortor at auctor urna nunc. Quisque non tellus orci ac auctor augue mauris augue neque. Placerat vestibulum lectus mauris ultrices eros in cursus. Malesuada nunc vel risus commodo viverra maecenas. Eget arcu dictum varius duis. Sed velit dignissim sodales ut eu sem. Suscipit tellus mauris a diam. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Massa tincidunt nunc pulvinar sapien et ligula. Morbi leo urna molestie at elementum eu facilisis. Bibendum enim facilisis gravida neque convallis a cras. Sem et tortor consequat id porta.Tempus iaculis urna id volutpat lacus laoreet non. In nulla posuere sollicitudin aliquam. Lacinia quis vel eros donec ac. Congue mauris rhoncus aenean vel. Ultrices in iaculis nunc sed. In eu mi bibendum neque egestas congue quisque egestas. At augue eget arcu dictum varius duis at consectetur. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Arcu dictum varius duis at consectetur lorem donec massa sapien. Neque volutpat ac tincidunt vitae semper quis.</p>
      <button> <a href="https://jgarcia1599-3d-how.glitch.me/boat.html">Playground</a></button>
      </div>

    )

  }
}


export {BoatGrid,BoatView}