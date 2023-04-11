import React from "react";

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

    const getSvgElements = (svgs, order, counter) => {
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
                    <div className="box is-shadowless">{counter}</div>
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
                  // onClick={() => setShowPopup(i)}
                >
                  <div className="box is-clickable">{object.svg}</div>
                </div>
              </>
            );
          })}
        </>
      );
    };

const SvgGrid = ({ svgs, order }) => getSvgElements(svgs, order, 1);

export default SvgGrid;