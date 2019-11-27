const fav = {
  loading: false,
  fav: {},
  error: ''
}

export default (state = fav, action) => {
  switch(action.type) {
    case 'INITIAL_FAV':
      return {
        ...state,
        fav: action.payload
      }
    case 'ADD_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'ADD_SUCCESS':
      return {
        ...state,
        fav: action.payload,
        loading: false
      }
    case 'ADD_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default: 
      return { fav: state.fav }
  }
}