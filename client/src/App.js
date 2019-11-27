import React, { useEffect } from 'react';
import './App.css';
import Home from './Container/Home'
import Searching from './Container/Search/Search'
import Nav from './Components/NavBar/NavBar'
import Heroes from './Container/AllHeroes/AllHeroes'
import Detail from './Container/Detail/DetailHero'
import Roles from './Container/AllRoles/AllRole'
import Team from './Container/Team/Team'
import MyFav from './Container/MyFav/MyFav'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { useDispatch, connect } from 'react-redux'
import axios from './apis/server'
import { signin, User, Fav } from './store/Action'
// import { throws } from 'assert';


const mapDispatchToProps = (dispatch) => {
  return {
    user (payload) {
      dispatch(User(payload))
    }
  }
}

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch(signin())
    }
  }, [localStorage.getItem('token')])

  useEffect(() => {
    if(localStorage.getItem('token')){

      // MAPDISPATCH
      setTimeout(() => {
        axios({
          method: 'get',
          url: '/',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            props.user(data.user)
            return axios({
              method: 'get',
              url: '/fav',
              headers: {
                token: localStorage.getItem('token')
              }
            })
          })
          .then(({data}) => {
            dispatch(Fav(data.fav))
          })
          .catch(console.log)
      }, 1000);
    }
  }, [])

  return (
    <>
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
              <Route path='/team' component={Team} />
              <Route path='/fav' component={MyFav} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  )
}

export default connect(null,mapDispatchToProps)(App)
// class App extends Component {

//   componentDidMount () {
//     if(localStorage.getItem('token')) {
//       useDispatch(signin())
//     }
//   }
//   render () {
//     return (
//       <Fragment>
//         <Router>
//           <div className="App">
//             <header className="App-header">
//               <Nav />
//             </header>
//             <div className='backCard'>
//               <Switch>
//                 <Route path='/' exact component={Home}/>
//                 <Route path='/search/:name' component={Searching}/>
//                 <Route path='/heroes' component={Heroes} />
//                 <Route path='/detail/:id' component={Detail} />
//                 <Route path='/roles' component={Roles} />
//               </Switch>
//             </div>
//           </div>
//         </Router>
//       </Fragment>
//     )
//   }

// }

// export default App;
