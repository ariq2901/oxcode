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
  info: 'tolong masukkan pass anda',
  isLogin: true
}

const LoginReducer = (state = initialStateLogin, action) => {
  if( action.type === 'SET_INFO' ) {
    return {
      ...state,
      info: 'Login ganti info'
    }
  }
  if( action.type === 'SET_PROFILE' ) {
    return {
      ...state,
      profile: {
        ...state.profile,
        [action.pData]: action.pValue,
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