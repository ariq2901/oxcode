import React, { Fragment, useRef } from 'react';

const Detail = (props) => {

  const img = useRef();
  const imgBar = useRef();
  const modalRef = useRef();

  let before = null;

  const imgHandler = (e) => {
    let arr = [...imgBar.current.children];
    let t = arr.findIndex((asd) => { return asd === e.currentTarget });
    e.currentTarget.children[0].style.backgroundColor = 'rgba(0, 0, 0, 40%)';
    img.current.style.backgroundImage = e.currentTarget.children[0].style.backgroundImage;
    if (before !== null) {
      imgBar.current.children[before].children[0].style.backgroundColor = 'transparent';
    }
    before = t;
    return null;
  }

  const modal = () => {
    let modalRefs = modalRef.current.style;
    let body = document.body.style;
    modalRefs.display = 'block';
    body.overflow = 'hidden';
  }

  const closeModal = () => {
    let modalRefs = modalRef.current.style;
    let body = document.body.style;
    modalRefs.display = '';
    body.overflow = '';
  }

  return (
    <Fragment>
      <div className="row color block align-items-center pb-2">
        <div className="col-8">
          {/* <div> */}
          <div className="row mt-5">
            <div className="col">
              <span className="breadcumb">recreation / jungle land</span>
              <h1 className="title">Jungle Land</h1>
              <h1 className="title">Adventure Theme Park</h1>
              <span className="rating">
                <i className="material-icons">star</i>
                <i className="material-icons">star</i>
                <i className="material-icons">star</i>
                <i className="material-icons">star</i>
                <i className="material-icons">star</i>
                <span>32 Reviews</span>
                <span className="material-icons favorite">favorite</span>
              </span>
              <div className="button-row">
                <button className="btn">
                  <i className="material-icons">location_on</i>
                  sentul
                </button>
                <button className="btn">
                  <i className="material-icons">location_on</i>
                  bogor
                </button>
              </div>
              <div className="about">
                <p>Contact</p>
                <i className="material-icons">call</i>
                <span>
                  +8989898
                </span>
              </div>
              <div className="about">
                <p>Ticket Price</p>
                <i className="material-icons-outlined">confirmation_number</i>
                <span>
                  <p>weekday: RP.165.000,00 / person</p>
                  <p>weekday: RP.165.000,00 / person</p>
                </span>
              </div>
              <div className="about">
                <p>locations</p>
                <i className="material-icons">location_on</i>
                <span>
                  Kawasan Santul Nirwana
                </span>
              </div>
              <div className="about">
                <p>Operational Hour</p>
                <i className="material-icons-outlined">access_time</i>
                <span>
                  09.00 - 20.00
                </span>
              </div>
            </div>
            <div className="col m-auto">
              <div className="img-main" ref={img} style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
              <div className="img-bar" ref={imgBar}>
                <button className="image-on" onClick={imgHandler}>
                  <div className="image-h" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
                </button>
                <button className="image-on" onClick={imgHandler}>
                  <div className="image-h" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo2.jpg'})` }}></div>
                </button>
                <button className="image-on" onClick={imgHandler}>
                  <div className="image-h" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
                </button>
                <button className="image-on" onClick={imgHandler}>
                  <div className="image-h" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
                </button>
                <button className="image-on" onClick={imgHandler}>
                  <div className="image-h" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
                </button>
                <button className="image-on" onClick={imgHandler}>
                  <div className="image-h" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
                </button>
                <button className="image-on" onClick={imgHandler}>
                  <div className="image-h" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row align-items-center mt-2">
        <div className="col-8">
          <div className="row">
            <div className="col mr-1">
              <div className="card color">
                <p>
                  Merupakan wahana aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </p>
              </div>
              <div className="mt-1">
                <div className="mb-1">
                  <h3 className="valign-super">Review</h3>
                  <button className="float-right btn" onClick={modal}>add review</button>
                </div>
                <div className="card color">
                  <div className="review">
                    <div className="review-head">
                      <div className="head-img" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
                      <div className="head-body">
                        <p>Sirizqi.</p><span>September 2010</span>
                        <span className="rating">
                          <i className="material-icons">star</i>
                          <i className="material-icons">star</i>
                          <i className="material-icons">star</i>
                          <i className="material-icons">star</i>
                          <i className="material-icons">star</i>
                        </span>
                      </div>
                    </div>
                    <div className="review-body">
                      <p>KLKLKLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLKLKLKLKLKLKKKKKKKKKKKKKKKKKKKKKKKKK</p>
                    </div>
                  </div>
                  <hr />
                  <div className="review">
                    <div className="review-head">
                      <div className="head-img" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
                      <div className="head-body">
                        <p>Sirizqi.</p><span>September 2010</span>
                        <span className="rating">
                          <i className="material-icons">star</i>
                          <i className="material-icons">star</i>
                          <i className="material-icons">star</i>
                          <i className="material-icons">star</i>
                          <i className="material-icons">star</i>
                        </span>
                      </div>
                    </div>
                    <div className="review-body">
                      <p>KLKLKLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLKLKLKLKLKLKKKKKKKKKKKKKKKKKKKKKKKKK</p>
                    </div>
                  </div>
                  <button className="btn w-100">
                    show more
                  </button>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="mb-1">
                <p>Weather in sentul,</p>
                <p>Bogor</p>
              </div>
              <div className="color card">
                <div className="weather">
                  <p>Today</p>
                  {/* <i className="material-icons">weather</i> */}
                  <p className="float-right">32&#xb0;</p>
                </div>
                <hr />
                <div className="weather">
                  <p>Tomorrow</p>
                  {/* <i className="material-icons">weather</i> */}
                  <p className="float-right">32&#xb0;</p>
                </div>
                <hr />
                <div className="weather">
                  <p>Saturday</p>
                  {/* <i className="material-icons">weather</i> */}
                  <p className="float-right">32&#xb0;</p>
                </div>
                <hr />
                <div className="weather">
                  <p>Sunday</p>
                  {/* <i className="material-icons">weather</i> */}
                  <p className="float-right">32&#xb0;</p>
                </div>
              </div>
              <div className="mt-1 mb-1">
                <h3>Direction</h3>
                <span className="float-right"><i className="material-icons-outlined">gps_fixed</i></span>
              </div>
              <div className="color card">
                <span>

                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" ref={modalRef}>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title">Add Review</p>
            <span className="close" onClick={closeModal}>X</span>
          </div>
          <div className="modal-body">
            <p>JKJKJKJKJKJKJ</p>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Fragment>
  );
}

export default Detail;