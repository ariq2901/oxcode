import React, { Component, Fragment } from 'react';
import '../../App.css';
import Bromo from '../../img/bromo.jpg';
import Waterbom from '../../img/waterbom.jpg';
import Dufan from '../../img/dufan.jpg';

class PopularSpots extends Component {
  render() {
    return(
      <Fragment>
        <div className="spots-wrapper">
          <div className="spots-title">
            <span>most popular tourist spots</span>
            <p href="#">view all</p>
          </div>
          <div className="spots-list">
            <div className="crd">
              <div className="img-wrapper">
                <img src={Bromo} alt="bromo img"/>
              </div>
              <div className="title-wrapper">
                <span>bromo mountain</span>
              </div>
              <div className="rate-wrapper">
                <div className="rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                <p className="total-reviews">175 reviews</p>
              </div>
              <div className="location-wrapper">
                <i class="fas fa-map-marker-alt"></i>
                <p className="location-name">bromo</p>
              </div>
            </div>
            <div className="crd">
              <div className="img-wrapper">
                <img src={Waterbom} alt="waterbom img"/>
              </div>
              <div className="title-wrapper">
                <span>waterbom jakarta</span>
              </div>
              <div className="rate-wrapper">
                <div className="rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                </div>
                <p className="total-reviews">340 reviews</p>
              </div>
              <div className="location-wrapper">
                <i class="fas fa-map-marker-alt"></i>
                <p className="location-name">jakarta</p>
              </div>
            </div>
            <div className="crd">
              <div className="img-wrapper">
                <img src={Dufan} alt="dufan img"/>
              </div>
              <div className="title-wrapper">
                <span>dunia fantasi</span>
              </div>
              <div className="rate-wrapper">
                <div className="rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                <p className="total-reviews">439 reviews</p>
              </div>
              <div className="location-wrapper">
                <i class="fas fa-map-marker-alt"></i>
                <p className="location-name">jakarta</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default PopularSpots;