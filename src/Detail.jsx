import React, { Fragment, useRef, useEffect, useState } from 'react';
import Footer from './components/Footer';
import { render } from 'react-dom'
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { config } from './config';
import swal from 'sweetalert';
import { IndicatorLoading } from './property/Form';

const Detail = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState([]);

  const img = useRef();
  const imgBar = useRef();
  const modalRef = useRef();
  const map = useRef();

  let before = null;
  let { id } = useParams();

  const getDetAtt = async () => {
    setLoading(true);
    // setLoading(true);
    try {
      const respon = await Axios.get(`${config.api_host}/api/attractions/${id}`);
      setData(respon.data.attraction);
      console.log(data);
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    } catch (e) {
      console.error('error feching data', e);
    }
    setLoading(false);
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
          {data.name}
        </Popup>
      </Marker>
    </LeafletMap>
  );

  useEffect(() => {
    getDetAtt();
  }, [])

  const starRating = (rating) => {
    let starRatingTitle = [];
    for (let index = 1; index <= 5; index++) {
      if (index < rating || rating === 5) {
        starRatingTitle.push('star');
      } else {
        starRatingTitle.push('star_border');
      }
    }
    return starRatingTitle.map((dat, index) => (
      <i className="material-icons" key={index}>{dat}</i>
    ));
  }

  function starLoop(stars) {
    var tag = [];
    var i;
    for (i = 0; i < stars; i++) {
      tag.push(<i key={i} className='fas fa-star'></i>);
    }
    if (i < 5) {
      tag.push(<i key={i} className="far fa-star"></i>);
    }
    if (i < 4) {
      tag.push(<i key={i} className="far fa-star"></i>);
    }
    if (i < 3) {
      tag.push(<i key={i} className="far fa-star"></i>);
    }
    if (i < 2) {
      tag.push(<i key={i} className="far fa-star"></i>);
    }
    return tag;
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

  const formSubmit = async (e) => {
    e.preventDefault();
    var rate = e.currentTarget.children.rate.value;
    var review = document.querySelector('#review').value;
    const token = sessionStorage.getItem("tokenB");
    console.log(token);

    if (!token) {
      swal('Oops!', 'You must login first', 'warning');
      return;
    }

    if (rate < 1) {
      swal('Oops!', 'You must give rate first', 'warning');
      return;
    }
    
    if (review.trim() === '') {
      swal('Oops!', 'You must fill review first', 'warning');
      return;
    }

    try {
      setLoading(true);
      const response = await Axios.post((`${config.api_host}/api/reviews`), {
        rating: parseInt(rate),
        review: review,
        attraction_id: data.id
      }, {
        headers: {
          "Authorization": token
        }
      });
      console.log(response);
      swal('Success', 'Your review has been added', 'success');
    } catch (e) {
      swal('Error',  `${e.response.data.message}`, 'error');
    }
    setLoading(false);
  }

  return (
    <Fragment>
      {
        loading ? <IndicatorLoading/> : ''
      }
     {
       !loading ?
        <div className="detail">
           <section className="header">
            <div className="container ia">
              <div className="row ia">
                <div className="title-header ia">
                  <div className="title-box ia">
                    <span className="breadcumb">recreation / {data.name}</span>
                    <p className="title">{data.name}</p>
                      <span className="rating ia">
                      <div className="rating">
                        {starLoop(data.rating)}
                      </div>
                        {/* {starRating(data.rating)} */}
                        <span>{data.traveler_reviews ? data.traveler_reviews.length : ''} Reviews</span>
                        {/* <span className="material-icons favorite">favorite</span> */}
                      </span>
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
                      {!loading ? (
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
                          <span>
                            <p>weekday: RP. {data.ticket_price ? data.ticket_price.weekday  : '0'},00 / person</p>
                            <p>weekend: RP. {data.ticket_price ?data.ticket_price.weekend : '0'},00 / person</p>
                          </span>
                      </div>
                    </div>
                    <div className="about">
                      <p>locations</p>
                      <div className="about-grid">
                        <i className="material-icons">location_on</i>
                        {!loading ? (
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
                        <span>{data.hours_of_operation ? data.hours_of_operation.from : ''} - {data.hours_of_operation ? data.hours_of_operation.to : ''}</span>
                      </div>
                    </div>
                  </div>
                  <div className="image-title">
                    {data.images ? (
                      <div className="img-main rs" ref={img} style={{ backgroundImage: `url('${config.api_host}/api/images/${data.images[0].id}')` }}></div>
                    ) : (
                        <div className="img-main" ref={img} style={{ backgroundColor: 'black', }}></div>
                      )}
                    <div className="img-bar" ref={imgBar}>
                      {data.images ? (
                        data.images.map((hasil, index) => (
                          <button className="image-on" onClick={imgHandler} key={index}>
                            <div className="image-h" style={{ backgroundImage: `url('${config.api_host}/api/images/${hasil.id}')` }}></div>
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
                      {!loading ? (
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
                      {data.traveler_reviews ? (
                        data.traveler_reviews.reverse().map((dat, index) => (
                          <div className="review" key={index}>
                            <div className="review-head">
                              <div className="head-img" style={{ backgroundImage: `url('${config.api_host}/api/images/${dat.user.image.id}')` }}></div>
                              <div className="head-body">
                                <p>{dat.user.name}. </p> <span>{dat.created_at}</span>
                                <span className="rating ia">
                                  <div className="rating">
                                    {starLoop(dat.rating)}
                                  </div>
                                </span>
                              </div>
                            </div>
                            <div className="review-body">
                              <p>{dat.review}</p>
                            </div>
                          </div>
                        ))
                      ) : null}
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
                  <input type="range" min="0" max="5" name="rate" id="range-modal" hidden defaultValue="0"/>
                  <div class="form-group-detail">
                    <textarea wrap="off" id="review" name="review" cols="30" rows="10" className="textarea-modal" required></textarea>
                    <label for="review">Review</label>
                  </div>
                  {/* <textarea name="review" cols="30" rows="10" className="textarea-modal">

                  </textarea> */}
                  <button type="submit" className="btn-ia w-100">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        : ''
     }
    </Fragment >
  );
}

export default Detail;