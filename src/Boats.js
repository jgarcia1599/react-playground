import React, { Component } from "react";
import {Link} from "react-router-dom";
const assets = require('./assets.js');



function BoatGrid(props){

    return(
      <div className="single-meal">
        <Link to={{
          pathname:"/boatview",
          state:{
            boatname:props.name,
            time:props.date,
            img_src:props.source
  
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
      console.log(assets);
      return(
        <div>
        <h1>{this.props.location.state.boatname}</h1>
        <h2> Time Period: {this.props.location.state.time}</h2>
        <img alt="boat-img"src={assets[this.props.location.state.img_src]}></img>
        <button>Playground</button>
  
        </div>
  
      )
  
    }
  }


export {BoatGrid,BoatView}