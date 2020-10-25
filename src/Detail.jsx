import React, { Fragment, useRef } from 'react';
import Footer from './components/Footer';

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
      <section className="header">
        <div className="container ia">
          <div className="row ia">
            <div className="title-header ia">
              <div className="title-box ia">
                <span className="breadcumb">recreation / jungle land</span>
                <p className="title">Jungle Land <br />Adventure Theme Park</p>
                <span className="rating ia">
                  <i className="material-icons">star</i>
                  <i className="material-icons">star</i>
                  <i className="material-icons">star</i>
                  <i className="material-icons">star</i>
                  <i className="material-icons">star</i>
                  <span>32 Reviews</span>
                  <span className="material-icons favorite">favorite</span>
                </span>
                <div className="button-row">
                  <button className="btn-ia">
                    <i className="material-icons">location_on</i>
                  sentul
                </button>
                  <button className="btn-ia">
                    <i className="material-icons">location_on</i>
                  bogor
                </button>
                </div>
                <div className="about">
                  <p>Contact</p>
                  <div className="about-grid">
                    <i className="material-icons">call</i>
                    <span>+8989898</span>
                  </div>
                </div>
                <div className="about">
                  <p>Ticket Price</p>
                  <div className="about-grid">
                    <i className="material-icons-outlined">confirmation_number</i>
                    <span>
                      <p>weekday: RP.165.000,00 / person</p>
                      <p>weekday: RP.165.000,00 / person</p>
                    </span>
                  </div>
                </div>
                <div className="about">
                  <p>locations</p>
                  <div className="about-grid">
                    <i className="material-icons">location_on</i>
                    <span>Kawasan Santul Nirwana</span>
                  </div>
                </div>
                <div className="about">
                  <p>Operational Hour</p>
                  <div className="about-grid">
                    <i className="material-icons-outlined">access_time</i>
                    <span>09.00 - 20.00</span>
                  </div>
                </div>
              </div>
              <div className="image-title">
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
      </section>
      <section className="body ia">
        <div className="container ia">
          <div className="row ia">
            <div className="main-body">
              <div className="body-text">
                <div className="card ia color">
                  <p>
                    Merupakan wahana aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </p>
                </div>
                <div className="card-title-ia">
                  <p>Review</p>
                  <button className="btn-ia" onClick={modal}>add review</button>
                </div>
                <div className="card ia color">
                  <div className="review">
                    <div className="review-head">
                      <div className="head-img" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
                      <div className="head-body">
                        <p>Sirizqi.</p><span>September 2010</span>
                        <span className="rating ia">
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
                  <hr className="hr ia" />
                  <div className="review">
                    <div className="review-head">
                      <div className="head-img" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
                      <div className="head-body">
                        <p>Sirizqi.</p><span>September 2010</span>
                        <span className="rating ia">
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
                  <button className="btn-ia w-100">
                    show more
                  </button>
                </div>
              </div>
              <div className="body-det">
                <p className="text-first-mb">Weather in sentul, <br />Bogor</p>
                <div className="color card ia">
                  <div className="weather">
                    <p>Today</p>
                    {/* <i className="material-icons">weather</i> */}
                    <p className="float-right">32&#xb0;</p>
                  </div>
                  <hr className="hr ia" />
                  <div className="weather">
                    <p>Tomorrow</p>
                    {/* <i className="material-icons">weather</i> */}
                    <p className="float-right">32&#xb0;</p>
                  </div>
                  <hr className="hr ia" />
                  <div className="weather">
                    <p>Saturday</p>
                    {/* <i className="material-icons">weather</i> */}
                    <p className="float-right">32&#xb0;</p>
                  </div>
                  <hr className="hr ia" />
                  <div className="weather">
                    <p>Sunday</p>
                    {/* <i className="material-icons">weather</i> */}
                    <p className="float-right">32&#xb0;</p>
                  </div>
                </div>
                <div className="mt-1 mb-1 card-title-ia">
                  <p>Direction</p>
                  <span><i className="material-icons-outlined">gps_fixed</i></span>
                </div>
                <div className="color card ia">
                  <span>

                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
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
    </Fragment>
  );
}

export default Detail;