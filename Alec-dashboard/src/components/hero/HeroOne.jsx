import React, { useState  } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// import heroBg from "../../assets/img/home_1/hero_bg_1.jpg";
// import heroBg1 from "../../assets/alec-img/slider-img/2.jpg";

// import heroBg2 from "../../assets/alec-img/slider-img/3.jpg";
// import heroBg3 from "../../assets/alec-img/slider-img/4.jpg";



export const HeroOne = () => {

  const [formData, setFormData] = useState ({
    Name: "",
     Phone: "",
    State : "",
    Medium: "",
    remark: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
     const api = 'http://localhost:8000/query/create';

    
    console.log("Form submitted", formData);
  };

  const images = [
    "https://campaign.aashayeinjudiciary.com/SOFT/Admin/slider/CPC%20Bantch_New%20landing%20page.jpg",
    "https://campaign.aashayeinjudiciary.com/SOFT/Admin/slider/CPC%20Bantch_New%20landing%20page.jpg",

    "https://campaign.aashayeinjudiciary.com/SOFT/Admin/slider/CPC%20Bantch_New%20landing%20page.jpg",

    // heroBg1,
    // heroBg2,
    // heroBg3,

  ];

  return (
    <>
      {/* <section
        className="td_hero td_style_1 td_heading_bg td_center td_bg_filed"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="container">
          <div
            className="td_hero_text wow fadeInRight"
            data-wow-duration="0.9s"
            data-wow-delay="0.35s"
          >
            <p className="td_hero_subtitle_up td_fs_18 td_white_color td_spacing_1 td_semibold text-uppercase td_mb_10 td_opacity_9">
              Knowledge is Power
            </p>
            <h1 className="td_hero_title td_fs_64 td_white_color td_mb_12">
              <span>Educve</span> - The Best Place to Invest in your Knowledge
            </h1>
            <p className="td_hero_subtitle td_fs_18 td_white_color td_opacity_7 td_mb_30">
              A university is a vibrant institution that serves as a hub for
              higher education and research. It provides a dynamic environment.
            </p>
            <Link
              to="/courses-grid-view"
              className="td_btn td_style_1 td_radius_10 td_Medium"
            >
              <span className="td_btn_in td_white_color td_accent_bg">
                <span>View Our Program</span>
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1575 4.34302L3.84375 15.6567"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.157 11.4142C15.157 11.4142 16.0887 5.2748 15.157 4.34311C14.2253 3.41142 8.08594 4.34314 8.08594 4.34314"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <div className="td_lines">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section> */}
      <div className="mt-5"></div>
      <div style={{ paddingTop: "5vmax" }} className="space mt-5" id="contact-sec">
      <div className="">
        <div className="row">
          {/* Left Side: Slider */}
          <div className="col-xl-8 mb-xl-0 ">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay:4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    style={{ height: "100%", width: "100%" }}
                    src={img}
                    alt={`Slide ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
          {/* Right Side: Form */}
          <div className="col-xl-4 ">
  <div
    style={{
      marginTop: "0vmax",
      background: "rgba(227, 227, 227, 0)", // Semi-transparent black
      backgroundImage: "url(/assets/img/bg/contact_bg_1.png)",
      backgroundSize: "cover",
      padding: "30px",
      // borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    }}
    className="contact-form-wrap"
  >
    <h5
      id="form-heading"
      style={{
        marginBottom: "1.5rem",
        marginTop: "0",
        color: "#fff",
        textAlign: "center",
      }}
    >
      Do you have any query? Let's get connected for a great future.
      Get a call back!
    </h5>

    <form onSubmit={handleSubmit}>
      <div className="row">
      <div className="col-md-12 mb-4 position-relative">
  <i className="fa fa-user form-icon"></i>
  <input
    type="text"
    className="form-control style-white ps-5"
    name="name"
    placeholder="Your Name*"
    value={formData.name}
    onChange={handleChange}
    required
    style={{
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
    }}
  />
</div>

<div className="col-md-12 mb-4 position-relative">
  <i className="fa fa-phone form-icon"></i>
  <input
    type="tel"
    className="form-control style-white ps-5"
    name="mobile"
    placeholder="Phone Number*"
    maxLength="10"
    value={formData.mobile}
    onChange={handleChange}
    required
    style={{
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
    }}
  />
</div>

<div className="col-md-12 mb-4 position-relative">
  <i className="fa fa-map-marker-alt form-icon"></i>
  <select
    name="State "
    className="form-select style-white ps-5"
    value={formData.State }
    onChange={handleChange}
    required
    style={{
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
    }}
  >
    <option value="" disabled hidden>Select State *</option>
    {/* State  options */}
  </select>
</div>

<div className="col-md-12 mb-4 position-relative">
  <i className="fa fa-language form-icon"></i>
  <select
    name="Medium"
    className="form-select style-white ps-5"
    value={formData.Medium}
    onChange={handleChange}
    required
    style={{
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
    }}
  >
    <option value="" disabled hidden>Select Medium*</option>
    <option value="English">English</option>
    <option value="Hindi">Hindi</option>
  </select>
</div>

<div className="col-12 mb-4 position-relative">
  <i className="fa fa-comment form-icon"></i>
  <textarea
    name="remark"
    cols="10"
    rows="3"
    className="form-control style-white ps-5"
    placeholder="Write Your Message"
    value={formData.remark}
    onChange={handleChange}
    style={{
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
    }}
  ></textarea>
</div>

      </div>
    </form>
  </div>
</div>
        </div>
      </div>
    </div>

    </>
  );
};
