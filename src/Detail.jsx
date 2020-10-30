import React, { Fragment, useRef, useEffect } from 'react';
import Footer from './components/Footer';
import { render } from 'react-dom'
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = (props) => {

  const [data, setData] = useState();
  const [review, setReview] = useState();
  const [star, setStar] = useState();

  const img = useRef();
  const imgBar = useRef();
  const modalRef = useRef();
  const map = useRef();

  let before = null;
  let id = useParams();

  const position = [data.pin_point.latitude, data.pin_point.longitude];
  const name = data.name;

  const getDetAtt = async () => {
    try {
      const respon = await Axios.get(`${config.api_host}/api/attractions/${id}`);
      // setList(respon.data);
      setData(respon.data.attraction);
    } catch (e) {
      console.error('error feching data', e);
    }
  }

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

  const location = (
    <LeafletMap center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <Popup>
          {name}
        </Popup>
      </Marker>
    </LeafletMap>
  );

  useEffect(() => {
    // map.current.innerHTML = location;
    render(location, map.current)
    starRating();
    getDetAtt();
    // console.log(location);
  }, [location])

  const starRating = (rating) => {
    let starRatingTitle = [];
    for (let index = 0; index < 4; index++) {
      if (index < rating) {
        starRatingTitle.push('star');
      } else {
        starRatingTitle.push('star_border');
      }
      return starRatingTitle.map((data, index) => (
        <i className="material-icons" key={index}>{data}</i>
      ));
    }
  }

  const ratingForm = (e) => {
    e.preventDefault();
    console.log(e.target.parentElement);
  }

  // const imageHandle = () => {
  //   for (let index = 0; index < data.images[0].length; index++) {

  //   }
  // }

  return (
    <Fragment>
      <section className="header">
        <div className="container ia">
          <div className="row ia">
            <div className="title-header ia">
              <div className="title-box ia">
                <span className="breadcumb">recreation / ${data.name}</span>
                <p className="title">{data.name}</p>
                <span className="rating ia">
                  {starRating(data.rating)}
                  <span>{data.traveler_reviews[0].length} Reviews</span>
                  <span className="material-icons favorite">favorite</span>
                </span>
                <div className="button-row">
                  <button className="btn-ia">
                    <i className="material-icons">location_on</i>
                    {data.city}
                  </button>
                </div>
                <div className="about">
                  <p>Contact</p>
                  <div className="about-grid">
                    <i className="material-icons">call</i>
                    <span>{data.phone}</span>
                  </div>
                </div>
                <div className="about">
                  <p>Ticket Price</p>
                  <div className="about-grid">
                    <i className="material-icons-outlined">confirmation_number</i>
                    <span>
                      <p>weekday: RP.{data.ticket_price.weekday},00 / person</p>
                      <p>weekend: RP.{data.ticket_price.weekend},00 / person</p>
                    </span>
                  </div>
                </div>
                <div className="about">
                  <p>locations</p>
                  <div className="about-grid">
                    <i className="material-icons">location_on</i>
                    <span>{data.address}</span>
                  </div>
                </div>
                <div className="about">
                  <p>Operational Hour</p>
                  <div className="about-grid">
                    <i className="material-icons-outlined">access_time</i>
                    <span>{data.hours_of_operation.from} - {data.hours_of_operation.to}</span>
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
                  <p>{data.description}</p>
                </div>
                <div className="card-title-ia">
                  <p>Review</p>
                  <button className="btn-ia" onClick={modal}>add review</button>
                </div>
                <div className="card ia color">
                  {data.traveler_reviews[0].map((dat, index) => (
                    <div className="review" key={index}>
                      <div className="review-head">
                        <div className="head-img" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bromo.jpg'})` }}></div>
                        <div className="head-body">
                          <p>{dat.user.name}.</p><span>{dat.created_at}</span>
                          <span className="rating ia">
                            {starRating(dat.rating)}
                          </span>
                        </div>
                      </div>
                      <div className="review-body">
                        <p>{dat.review}</p>
                      </div>
                    </div>
                  ))}
                  <button className="btn-ia w-100">
                    show more
                  </button>
                </div>
              </div>
              <div className="body-det">
                <p className="text-first-mb">Weather in {data.city}, <br />Bogor</p>
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
                <div className="color card ia" ref={map}>

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
            <form action="">
              <span className="rating ia">
                <i className="material-icons-outlined">star</i>
                <i className="material-icons-outlined">star</i>
                <i className="material-icons-outlined">star</i>
                <i className="material-icons-outlined">star</i>
                <i className="material-icons-outlined">star</i>
              </span>
              <input type="range" min="1" max="5" id="range-modal" hidden />
              <textarea name="review" cols="30" rows="10" className="textarea-modal">

              </textarea>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Detail;