//Packages and JS Files
import ReactDOM from 'react-dom';
import React, { Component } from "react";
import Search from './Search';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

// import dhow1 from "./dhow.jpg";
// import dhow2 from "./dhow2.jpg";
// import dhow3 from "./dhow3.jpg";
// const assets = require('./assets.js');



//Styling
import './index.css';
import './Search.css';
import "./slider.js";
import "./slider.css";



const assets = require('./assets.js');






export default function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/boatview" component={BoatView}>
          </Route>
          <Route path="/">
            <Search />
          </Route>

        </Switch>
      </div>
    </Router>
  );
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

// var  BoatView =(props) =>{

//   console.log(props.location.state);
//   return <h2>Boat information</h2>;

// }



ReactDOM.render(<App />, document.getElementById('root'));

// https://dev.to/zeyadetman/how-to-pass-state-between-components-in-reactjs-2pg1
// https://medium.com/@bopaiahmd.mca/how-to-pass-props-using-link-and-navlink-in-react-router-v4-75dc1d9507b4
// https://tylermcginnis.com/react-router-pass-props-to-link/
// https://www.reddit.com/r/webdev/comments/7x40or/trouble_passing_props_with_link_using_react_router/
// https://stackoverflow.com/questions/45052988/is-it-possible-to-pass-props-from-link-by-react-router-from-a-component-to-the-c

//Leaflet
// https://leafletjs.com/examples/quick-start/
//https://www.youtube.com/watch?v=DZfvr2zguHo
// Maybe: https://www.youtube.com/watch?v=PMtXhxW6t2k