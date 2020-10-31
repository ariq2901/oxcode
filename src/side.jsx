import React from 'react'

const Side = (props) => {

  const logRad = props.logRad;
  const image = props.image;
  const changeRad = props.changeRad;
  const radButton = props.radButton;

  return (
    <div className="col sider">
      <div className="center lr-3" ref={image}>
        <img src="" alt="" />
        <span style={{ color: 'rgba(255, 255, 255, 50%)' }}>Recomendation attraction</span>
        <h2 style={{ color: 'white' }}>Let's see at popular attractions</h2>
      </div>
      <footer className="log-footer">
        <div style={{ alignSelf: 'center' }} ref={logRad}>
          <span className="log-log"><i onClick={changeRad} className="material-icons log-rad">radio_button_checked</i></span>
          <span className="log-log"><i onClick={changeRad} className="material-icons log-rad">radio_button_unchecked</i></span>
          <span className="log-log"><i onClick={changeRad} className="material-icons log-rad">radio_button_unchecked</i></span>
        </div>
        <div className="text-right">
          <button className="btn border-white text-white" onClick={radButton}>&#60;</button>
          <button className="btn border-white text-white" onClick={radButton}>&#62;</button>
        </div>
      </footer>
    </div>
  );
}

export default Side;