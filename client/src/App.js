import React, {Component, Fragment} from 'react';
import './App.css';
import Home from './Container/Home'
import Searching from './Container/Search/Search'
import Nav from './Components/NavBar/NavBar'
import Heroes from './Container/AllHeroes/AllHeroes'
import Detail from './Container/Detail/DetailHero'
import Roles from './Container/AllRoles/AllRole'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import { throws } from 'assert';

class App extends Component {
  
  render () {
    return (
      <Fragment>
        <Router>
          <div className="App">
            <header className="App-header">
              <Nav />
            </header>
            <div className='backCard'>
              <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/search/:name' component={Searching}/>
                <Route path='/heroes' component={Heroes} />
                <Route path='/detail/:id' component={Detail} />
                <Route path='/roles' component={Roles} />
              </Switch>
            </div>
          </div>
        </Router>
      </Fragment>
    )
  }

}

export default App;
