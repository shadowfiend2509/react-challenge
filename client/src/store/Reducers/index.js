import storeSignin from './IsSignin'
import storeUser from './User'
import storeFav from './Fav'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  storeFav,
  storeUser,
  storeSignin
})
export default reducer