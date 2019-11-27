import axios from '../../apis/server';
import { message } from 'antd'

const addFavorite = store => next => async action => {
  if(action.types !== undefined) {
    next({ type: action.types+"_LOADING" })
    try {
      const { data } = await axios({method: 'patch', url: action.url, headers: {token: localStorage.getItem('token')}})
      if(!data.pass) message.warning(data.msg)
      else message.success(data.msg)
      next({ type: action.types+'_SUCCESS', payload: data.fav })
    }
    catch(err) {
      next({ type: action.types+'_ERROR', payload: err.response})
    }
  } else {
    next(action)
  }
}

export default addFavorite;