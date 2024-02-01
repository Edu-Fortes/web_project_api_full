import { useState } from "react";

export default function NavBurger({ navBurgerOpen }) {
  const [animate, setAnimate] = useState(false);

  function startAnimate() {
    setAnimate(!animate);
    navBurgerOpen();
  }

  return (
    <div className={animate ? "hamb hamb_open" : "hamb"} onClick={startAnimate}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
