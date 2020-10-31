import React, { Fragment, useRef, useEffect, useState } from 'react';
import Footer from './components/Footer';
import { render } from 'react-dom'
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { config } from './config';

const Detail = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState([]);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [star, setStar] = useState(0);

  const img = useRef();
  const imgBar = useRef();
  const modalRef = useRef();
  const map = useRef();

  let before = null;
  let { id } = useParams();

  const getDetAtt = async () => {
    try {
      console.log('bbbbbbbbbbbbbbbbbbbb')
      setLoading(false);
      const respon = await Axios.get(`${config.api_host}/api/attractions/${id}`);
      setData(respon.data.attraction);
      console.log(respon.data.attraction)
      console.log(setData(respon.data.attraction));
      // setPosition([data.pin_point.latitude, data.pin_point.longitude]);
      // setName(data.name);
      // setLoading(true);
      console.log(data);
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
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
    getDetAtt();
  }, [id])

  useEffect(() => {
    // render(location, map.current)
    console.log('aaaaaa');
  }, [])

  const starRating = (rating) => {
    let starRatingTitle = [];
    for (let index = 1; index < 5; index++) {
      if (index < rating || rating === 5) {
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
    var range = document.getElementById('range-modal');
    var parent = e.currentTarget.parentElement.children;
    var value = e.currentTarget.attributes.num.value;

    for (let index = 0; index < parent.length; index++) {
      if (index < value) {
        parent[index].innerHTML = 'star'
      } else {
        parent[index].innerHTML = 'star_border'
      }
    }
    range.value = value
  }

  const imageHandle = () => {
    for (let index = 0; index < data.images.length; index++) {

    }
  }

  const formSubmit = (e) => {
    e.preventDefault();
    var rate = e.currentTarget.children.rate.value;
    var review = e.currentTarget.children.review.value;
    const token = sessionStorage.getItem("tokenB");

    try {
      Axios.post((`${config.api_host}/api/reviews`), {
        rating: parseInt(rate),
        review: review,
        attraction_id: '1'
      }, {
        headers: {
          "Authorization": token
        }
      });
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Fragment>
      <section className="header">
        <div className="container ia">
          <div className="row ia">
            <div className="title-header ia">
              <div className="title-box ia">
                <span className="breadcumb">recreation / {name}</span>
                <p className="title">{name}</p>
                {loading ? (
                  <span className="rating ia">
                    {starRating(data.rating)}
                    <span>{data.traveler_reviews[0].length} Reviews</span>
                    <span className="material-icons favorite">favorite</span>
                  </span>
                ) : (
                    <span className="rating ia">
                      {starRating(0)}
                      <span>0 Reviews</span>
                      <span className="material-icons favorite">favorite</span>
                    </span>
                  )}
                <div className="button-row">
                  {loading ? (
                    <button className="btn-ia">
                      <i className="material-icons">location_on</i>
                      {data.city}
                    </button>
                  ) : null}
                </div>
                <div className="about">
                  <p>Contact</p>
                  {loading ? (
                    <div className="about-grid">
                      <i className="material-icons">call</i>
                      <span>{data.phone}</span>
                    </div>
                  ) : (
                      <div className="about-grid">
                        <i className="material-icons">call</i>
                        <span>00000000000</span>
                      </div>
                    )}
                </div>
                <div className="about">
                  <p>Ticket Price</p>
                  <div className="about-grid">
                    <i className="material-icons-outlined">confirmation_number</i>
                    {loading ? (
                      <span>
                        <p>weekday: RP.{data.ticket_price.weekday},00 / person</p>
                        <p>weekend: RP.{data.ticket_price.weekend},00 / person</p>
                      </span>
                    ) : (
                        <span>
                          <p>Rp.0</p>
                        </span>
                      )}
                  </div>
                </div>
                <div className="about">
                  <p>locations</p>
                  <div className="about-grid">
                    <i className="material-icons">location_on</i>
                    {loading ? (
                      <span>{data.address}</span>
                    ) : (
                        <span>null</span>
                      )}
                  </div>
                </div>
                <div className="about">
                  <p>Operational Hour</p>
                  <div className="about-grid">
                    <i className="material-icons-outlined">access_time</i>
                    {loading ? (
                      <span>{data.hours_of_operation.from} - {data.hours_of_operation.to}</span>
                    ) : (
                        <span>00:00 - 00:00</span>
                      )}
                  </div>
                </div>
              </div>
              <div className="image-title">
                {loading ? (
                  <div className="img-main" ref={img} style={{ backgroundImage: `${config.api_host}/api/images/${data.images[0].id}` }}></div>
                ) : (
                    <div className="img-main" ref={img} style={{ backgroundColor: 'black', }}></div>
                  )}
                <div className="img-bar" ref={imgBar}>
                  {loading ? (
                    data.images.map((hasil, index) => (
                      <button className="image-on" onClick={imgHandler} key={index}>
                        <div className="image-h" style={{ backgroundImage: `${config.api_host}/api/images/${hasil.id}` }}></div>
                      </button>
                    ))
                  ) : (
                      <button className="image-on" onClick={imgHandler}>
                        <div className="image-h" style={{ backgroundColor: 'black', }}></div>
                      </button>
                    )}
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
                  {loading ? (
                    <p>{data.description}</p>
                  ) : (
                      <p>Description</p>
                    )}
                </div>
                <div className="card-title-ia">
                  <p>Review</p>
                  <button className="btn-ia" onClick={modal}>add review</button>
                </div>
                <div className="card ia color">
                  {loading ? (
                    data.traveler_reviews.map((dat, index) => (
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
                    ))
                  ) : null}
                  <button className="btn-ia w-100">
                    show more
                  </button>
                </div>
              </div>
              <div className="body-det">
                <p className="text-first-mb">Weather in {data.name ?? null}, <br />{data.city ?? null}</p>
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
                  <span><i className="material-icons">gps_fixed</i></span>
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
            <form method="POST" onSubmit={formSubmit}>
              <span className="rating ia">
                <i className="material-icons" onClick={ratingForm} num="1">star_border</i>
                <i className="material-icons" onClick={ratingForm} num="2">star_border</i>
                <i className="material-icons" onClick={ratingForm} num="3">star_border</i>
                <i className="material-icons" onClick={ratingForm} num="4">star_border</i>
                <i className="material-icons" onClick={ratingForm} num="5">star_border</i>
              </span>
              <input type="range" min="1" max="5" name="rate" id="range-modal" hidden />
              <textarea name="review" cols="30" rows="10" className="textarea-modal">

              </textarea>
              <button type="submit" className="btn-ia w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment >
  );
}

export default Detail;