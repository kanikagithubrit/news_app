import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import NavBar from './components/navbar';
import News from './components/news';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize=15;
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
     progress: 0 //progress will be zero initially then set function ka use krke progree ko change kr skte hn
  }
  setProgress = (progress)=>{  //y ek method bna diya
    this.setState({progress: progress})  //isko arrao function bnana padega varna this available ni hoga
  }
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}   //mtlb initial progress  //news component mein progree pass krvayenge so that news component se progress ko chnage kr ske
      />   
        <Switch>   
          <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category= "general"/></Route>
          <Route exact path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category= "business"/></Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category= "entertainment"/></Route>
          <Route exact path="/general"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category= "general"/></Route>
          <Route exact path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category= "health"/></Route>
          <Route exact path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category= "science"/></Route>
          <Route exact path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category= "sports"/></Route>
          <Route exact path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category= "technology"/></Route>
        </Switch>
        </Router>
      </div>  //key dene se ye smjh jaega ki yhaan pr mujhe ise remount krna h 
    )
  }
}
