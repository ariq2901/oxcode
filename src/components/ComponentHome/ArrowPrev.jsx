import React, { Fragment } from 'react';

const PrevArrow = () => {
  return (
    <Fragment>
      <button type="button" data-role="none" class="slick-arrow slick-prev" style={{display: "block"}}> <i class="fas fa-angle-left"></i></button>
    </Fragment>
  );
}
export default PrevArrow;