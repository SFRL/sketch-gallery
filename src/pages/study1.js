import React, { useState } from "react";
import Layout from "../components/layout";
import SvgGrid from "../components/svgGrid";
import svgs from "../svgs/study1Import";
import sounds from "../sounds/study1Import";

const Study1 = () => {
  const [order, setOrder] = useState("");
  const changeOrder = (e) => setOrder(e.target.value);

  return (
    <Layout>
      <section className="section">
        <h1 class="title">Study 1</h1>
      </section>

      <section className="section">
        <div class="control">
          <label class="radio">
            <input
              type="radio"
              name="answer"
              value="soundID"
              onChange={changeOrder}
            />
            Sound
          </label>
          <label class="radio">
            <input
              type="radio"
              name="answer"
              value="participantID"
              onChange={changeOrder}
            />
            Participants
          </label>
        </div>
      </section>
      <section className="section">
        <div className="columns is-multiline">
          <SvgGrid svgs={svgs} order={order} sounds={sounds}/>
        </div>
      </section>
    </Layout>
  );
};

export default Study1;
