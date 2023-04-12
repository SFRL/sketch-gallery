import React from "react"

const getAudioElement = (sound) => (
  <audio controls>
  <source src={sound} type="audio/mpeg"/>
  Your browser does not support the audio element.
</audio>
)

const Modal = ({ svgObject, changeModalCallback, sound }) => {
  return (
    <div className={`modal ${svgObject ? "is-active" : undefined}`}>
      <div
        className="modal-background"
        onClick={() => changeModalCallback(false)}
      ></div>
      <div className="modal-content">
        <div className="box">
          <div className="image">{svgObject.svg}</div>
          <hr />
          <b>Participant: </b> {svgObject.participantID}
          <br />
          <b>Sound: </b>
          {svgObject.soundID}
          <div>{sound ? getAudioElement(sound) : undefined}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal
