import React, { Fragment } from 'react';
import BounceLoader from "react-spinners/BounceLoader";

export const Input = ({label, ...rest}) => {
  return (
    <Fragment>
      <input {...rest} />
    </Fragment>
  )
}
export const Button = ({label, ...rest}) => {
  return(
    <button {...rest}>{label}</button>
  );
}

export const IndicatorLoading = ({...rest}) => {
  return(
    <div className="indicator-loading">
      <BounceLoader
          size={150}
          color={"#439CEF"}
          loading={true}
        />
    </div> 
  );
}