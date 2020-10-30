import React, { Fragment, useState } from 'react';
import Axios from 'axios';
import { config } from '../../config';
import { useDispatch } from 'react-redux';

const DetailUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(sessionStorage.getItem("name"));
  const [email, setEmail] = useState(sessionStorage.getItem("email"));

  // const submitAction = () => {

  // }

  

  return(
    <Fragment>
      
    </Fragment>
  );
}
export default DetailUser;