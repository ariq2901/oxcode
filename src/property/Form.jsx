import React, { Fragment } from 'react';

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