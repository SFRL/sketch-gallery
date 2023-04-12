import React, {useState, useCallback} from "react";
import Modal from "../components/modal";

    const sortSvgs = (a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      // names must be equal
      return 0;
    };

    const getSvgElements = (svgs, order, activateModel) => {
      let counter = 1;
      // Sort svgs according to state
      if (order) svgs.sort((a, b) => sortSvgs(a[order], b[order]));
      return (
        <>
          {" "}
          {svgs.map((object, i) => {
            // Mark beginning of new participant or sound
            let marker = "";
            if (order && (i === 0 || object[order] !== svgs[i - 1][order])) {
              const breakElement = i ? (
                <div className="column is-full" key={`break_${i}`}></div>
              ) : (
                ""
              );
              marker = (
                <>
                  {breakElement}
                  <div className="column is-1" key={`marker_${i}`}>
                    <div className="box is-shadowless">{order === "soundID" ? object.soundID : counter}</div>
                  </div>
                </>
              );
              counter++;
            }

            return (
              <>
                {marker}
                <div
                  key={`svg${i}`}
                  className="column is-1"
                  onClick={() => activateModel(object)}
                >
                  <div className="box is-clickable">{object.svg}</div>
                </div>
              </>
            );
          })}
        </>
      );
    };

const SvgGrid = ({ svgs, order, sounds }) => {
  
  const [svgObject, setSvgObject] = useState(false);

  const activateModel = useCallback((object) => {
    setSvgObject(object);
  }, []);
  
  return (
    <>
      <Modal svgObject={svgObject} sound={svgObject&&sounds?sounds[svgObject.soundID]:undefined} changeModalCallback={activateModel}/> 
      {getSvgElements(svgs, order, activateModel)}
    </>
  )
};

export default SvgGrid;