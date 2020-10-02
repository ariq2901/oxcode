import React, { Fragment } from 'react';
import Bromo from '../../img/bromo.jpg';
import Waterbom from '../../img/waterbom.jpg';
import Dufan from '../../img/dufan.jpg';

const ListGrid = () => {
  return(
    <Fragment>
      <div className="spots-wrapper listpage">
        <div className="list-title">
          <div className="filter-wrapper">
            <p>filter</p>
            <input type="checkbox" id="filter-toggle"/>
            <label htmlFor="filter-toggle">
              <span></span>
            </label>
          </div>
          <p>list attractions</p>
        </div>
        <div className="main-list">
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
          </div><div className="crd">
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
          </div><div className="crd">
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
          </div><div className="crd">
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
export default ListGrid;