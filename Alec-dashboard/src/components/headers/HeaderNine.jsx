import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMobilemenu } from "../../lib/hooks/useMobilemenu";
import { useStickyHeader } from "../../lib/hooks/useStickyHeader";
import callIcon from "../../assets/img/icons/call.svg";
import envelopeIcon from "../../assets/img/icons/envlop.svg";
import Logo from "../../assets/alec-img/courses/alec-for-judiciary-removebg-preview.png";
import { toast } from "react-toastify";

export const HeaderNine = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]); // if you want to use course count
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/category");
        const data = await response.json();
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useMobilemenu();
  useStickyHeader();

  return (
    <header className="td_site_header td_style_1 td_type_2 td_sticky_header td_medium td_heading_color">
      <div className="td_top_header td_heading_bg td_white_color">
        <div className="td_top_header_in">
          <div className="td_top_header_left">
            <ul className="td_header_contact_list td_mp_0 td_normal">
              <li style={{ listStyle: "none" }}>
                <img src={envelopeIcon} alt="envelope icon" />
                <span>
                  Address:{" "}
                  <a href="mailto:management@alec.co.in">
                    3rd Floor, Radhika Heights, 284, in front of APT House,
                    Zone-II, Maharana Pratap Nagar, Bhopal, Madhya Pradesh
                    462011
                  </a>
                </span>
              </li>
              <li>
                <img src={envelopeIcon} alt="envelope icon" />
                <span>
                  Email:{" "}
                  <a href="mailto:management@alec.co.in">management@alec.co.in</a>
                </span>
              </li>
              <li>
                <img src={callIcon} alt="call icon" />
                <span>
                  Call: <a href="tel:+919691073595">+91 9691073595</a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="td_main_header">
        <div className="px-3 px-md-5">
          <div className="td_main_header_in">
            <div className="td_main_header_left">
              <Link className="td_site_branding td_accent_color" to="/">
                <img
                  id="logo"
                  className="logos"
                  src={Logo}
                  alt="Logo"
                  style={{ width: "200px" }}
                />
              </Link>
            </div>

            <div className="td_main_header_right">
              <nav className="td_nav">
                <div className="td_nav_list_wrap">
                  <div className="td_nav_list_wrap_in">
                    <ul className="td_nav_list">
                      <li><Link to="/">Home</Link></li>
                      <li className="menu-item-has-children">
                        <Link to="">About</Link>
                        <ul>
                          <li><Link to="/about">About the institute</Link></li>
                          <li><Link to="/about-institue">About the Director</Link></li>
                          <li><Link to="/about-why">Why AASHAYEIN JUDICIARY (ALEC)?</Link></li>
                          <li><Link to="/about-Director">Director's Message</Link></li>
                          <li><Link to="/success-stories">Our Success Stories</Link></li>
                        </ul>
                      </li>
                      <li><Link to="/courses-grid-view">Courses</Link></li>
                      <li><Link to="/blog">Blogs</Link></li>
                      <li><Link to="/judgements">Judgements</Link></li>
                      <li><Link to="/enquiry">Enquiry</Link></li>

                      <li className="menu-item-has-children">
                        <Link to="">Syllabus</Link>
                        <ul>
                          {categories.map((category) => (
                            // {id: console.log(category, "JJJ")},
                            <li key={category._id}>
                              <Link to={`/syllabus/${category._id}`}>
                                {category.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>

                      <li><Link to="/enroll">Enroll</Link></li>
                      <li><Link to="/contact">Contact</Link></li>
                    </ul>
                  </div>
                </div>
              </nav>

              <div id="social" className="td_hero_icon_btns position-relative">
                <div className="td_footer_social_btns td_fs_20">
                  <a href="https://www.facebook.com/ALEC.AashayeinLawEducationCenter/?ref=aymt_homepage_panel" className="td_center" style={{ color: "#1877F2" }}>
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="https://www.instagram.com/aashayein_judiciary" className="td_center" style={{ color: "#E4405F" }}>
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="#" className="td_center" style={{ color: "#25D366" }}>
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                  <a href="https://www.youtube.com/@aashayeinJ" className="td_center" style={{ color: "#FF0000" }}>
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
