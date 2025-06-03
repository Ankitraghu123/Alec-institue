import React from "react";
// import "./MarqueeStrike.css";

export const MarqueeStrike = () => {
  return (
    <div className="marquee-container">
    <marquee className="marquee-text" scrollamount="20">
      <span className="strike-text">🔥 Flat 50% Off on Himachal Sectional and Mock Test Series 🔥</span>
      <span className="strike-text">🔥Himachal Sectional Test Series Flat 50% OFF🔥</span>
      <span className="strike-text">🔥 Limited-Time Offer! Enroll Now & Get 50% Off! 🔥</span>
      <span className="strike-text">🔥 Limited-Time Offer! Enroll Now & Get 50% Off! 🔥</span>
    </marquee>
  </div>

  );
};

export default MarqueeStrike;
