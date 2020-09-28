import React, { Fragment, Component } from 'react';
import Depok from '../../img/depok.jpg';
import Jakarta from '../../img/jakarta.jpg';
import Bali from '../../img/bali.jpg';
import '../../App.css';

class PopularCity extends Component {
  render() {
    return(
      <Fragment>
        <div className="city-wrapper">
          <div className="spots-title">
            <span>most popular city</span>
            <p href="#">view all</p>
          </div>
          <div className="spots-list">
            <div className="crd">
              <div className="img-wrapper">
                <img src={Depok} alt="Depok img"/>
              </div>
              <div className="title-wrapper">
                <span>depok</span>
              </div>
              <div className="desc-city">
                <p>Depok merupakan sebuah Kota di Jawa Barat, Kota ini memiliki sejuta pesona dan panaroma alam</p>
              </div>
            </div>
            <div className="crd">
              <div className="img-wrapper">
                <img src={Jakarta} alt="Jakarta img"/>
              </div>
              <div className="title-wrapper">
                <span>jakarta</span>
              </div>
              <div className="desc-city">
                <p>wisata di Jakarta saat ini sudah banyak dan beragam potensi pariwisatanya</p>
              </div>
            </div>
            <div className="crd">
              <div className="img-wrapper">
                <img src={Bali} alt="Bali img"/>
              </div>
              <div className="title-wrapper">
                <span>bali</span>
              </div>
              <div className="desc-city">
                <p>Pulau Bali, merupakan pulau yang paling terkenal destinasi wisatanya di hampir penjuru Dunia</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default PopularCity;