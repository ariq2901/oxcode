import { combineReducers } from "redux";

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
  logoutBtn: false,
  typeLogin: ''
}

const LoginReducer = (state = initialStateLogin, action) => {
  if( action.type === 'SET_ISLOGIN' ) {
    
    return {
      ...state,
      isLogin: true,
      typeLogin: action.typeLogin
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
  if( action.type === 'SET_LOGOUT' ) {
    return {
      ...state,
      isLogin: false,
      typeLogin: '',
      profile: {
        email: '',
        name: '',
        picture: ''
      }
    }
  }
  return state;
}

const initialResult = {
  data: [],
  aksi: false
}

const ResultReducer = (state = initialResult, action) => {
  if( action.type == 'SET_RESULT' ) {
    return {
      ...state,
      [action.aData]: action.aValue,
    }
  }
  return state;
}

const initialStateCategory = {
  category: []
}

const CategoryReducer = (state = initialStateCategory, action) => {
  if( action.type === 'SET_CATEGORY' ) {
    return {
      ...state,
      category: action.categories,
    }
  }
  return state;
}

const initialMegamenu = {
  category: '',
  searches: ''
}

const MegamenuReducer = (state = initialMegamenu, action) => {
  if( action.type === 'SET_CAT' ) {
    return {
      ...state,
      category: action.cat
    }
  }
  return state;
}

const initialPosition = {
  lat: '',
  long: ''
}

const PositionReducer = (state = initialPosition, action) => {
  if( action.type === 'SET_LOC' ) {
    return {
      ...state,
      lat: action.lati,
      long: action.longi
    }
  }
  return state;
}

const reducer = combineReducers({
  RegisterReducer,
  LoginReducer,
  CategoryReducer,
  MegamenuReducer,
  ResultReducer,
  PositionReducer
})

export default reducer;