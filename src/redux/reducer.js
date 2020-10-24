import { combineReducers } from "redux";

const initialState = {
  name: 'Ariq jusuf habibie',
}

const initialStateRegister = {
  title: 'Register Page',
  desc: 'ini adalah desc untuk register'
}

const RegisterReducer = (state = initialStateRegister, action) => {
  return state;
}

const initialStateLogin = {
  profile: {
    email: '',
    name: '',
    picture: ''
  },
  isLogin: false,
  logoutBtn: false
}

const LoginReducer = (state = initialStateLogin, action) => {
  if( action.type === 'SET_ISLOGIN' ) {
    return {
      ...state,
      isLogin: true
    }
  }
  if( action.type === 'SET_PROFILE' ) {
    return {
      ...state,
      isLogin: true,
      // info: 'OKE MASUK BOS'
      profile: {
        ...state.profile,
        [action.pData]: action.pValue,
      }
    }
  }
  if( action.type === 'SETLOGOUT' ) {
    return {
      ...state,
      isLogin: false,
      isLogin: true,
      profile: {
        email: '',
        name: '',
        picture: ''
      }
    }
  }
  return state;
}

const reducer = combineReducers({
  RegisterReducer,
  LoginReducer
})

export default reducer;