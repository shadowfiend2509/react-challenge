export default (state = { user: {} }, action) => {
  
  switch(action.type) {
    case 'USER': 
      return { user: action.payload }
    default: 
      return { user: state.user }
  }
}