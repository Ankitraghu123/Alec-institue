// import React from "react";
// import { Link } from "react-router-dom";

// import user from "../../assets/img/icons/user_3.svg";
// import book from "../../assets/img/icons/book.svg";
// import courseThumb1 from "../../assets/alec-img/courses/course-1.jpg";
// import courseThumb2 from "../../assets/alec-img/courses/up-course.jpg";
// import courseThumb3 from "../../assets/alec-img/courses/jh-course.jpg";
// import courseThumb4 from "../../assets/alec-img/courses/bihar-course.jpg";
// import courseThumb5 from "../../assets/alec-img/courses/uttarakhand-course.jpg";
// import courseThumb6 from "../../assets/alec-img/courses/rj-course.jpg";

// const coursesList = [
//   {
//     id: 1,
//     label: "New",
//     image: courseThumb1,
//     seats: 150,
//     semesters: 12,
//     category: "Madhya Pradesh (MP) Judiciary",
//     title: "MP Judiciary Examination",
//     description:
//       "The Madhya Pradesh Judicial Service Examination, commonly known as the MP PCS (J) Civil Judge Examination, is organized by the Madhya Pradesh High Court to identify and recruit qualified candidates for the position of Civil Judge Grade II.",
//     rating: 4.5,
//     totalRatings: 5,
//   },
//   {
//     id: 2,
//     label: "New",
//     image: courseThumb2,
//     seats: 100,
//     semesters: 20,
//     category: "Uttar Pradesh",
//     title: "Uttar Pradesh (UP) Judiciary Examination",
//     description:
//       "The Judicial Service Civil Judge (Junior Division) examination is conducted by the Uttar Pradesh Public Service Commission to recruit qualified candidates for the judicial services.",
//     rating: 5,
//     totalRatings: 10,
//   },
//   {
//     id: 3,
//     label: "New",
//     image: courseThumb3,
//     seats: 300,
//     semesters: 8,
//     category: "Jharkhand Judiciary",
//     title: "Jharkhand Judiciary Examination",
//     description:
//       "The Jharkhand High Court organizes the Jharkhand Judicial Service Examination 2024 annually to recruit qualified candidates for the positions of Civil Judge in the Junior Division.",
//     rating: 5,
//     totalRatings: 12,
//   },
//   {
//     id: 4,
//     label: "Best Seller",
//     image: courseThumb4,
//     seats: 250,
//     semesters: 12,
//     category: "Bihar Judiciary",
//     title: "Bihar Judiciary Examination",
//     description: "Develop essential leadership skills to excel in any industry.",
//     rating: 4,
//     totalRatings: 30,
//   },
//   {
//     id: 5,
//     label: "New",
//     image: courseThumb5,
//     seats: 80,
//     semesters: 12,
//     category: "Uttarakhand Judiciary",
//     title: "Uttarakhand Judiciary Examination",
//     description:
//       "The Uttarakhand Judicial Services Examination 2024, commonly referred to as the Uttarakhand Civil Judge Junior Division (CJ JD) Exam, is a competitive examination conducted by the Uttarakhand Public Service Commission. This exam aims to recruit qualified candidates for the position of Civil Judge in the state of Uttarakhand.",
//     rating: 4.5,
//     totalRatings: 5,
//   },
//   {
//     id: 6,
//     label: "Best Seller",
//     image: courseThumb6,
//     seats: 200,
//     semesters: 12,
//     category: "Rajasthan Judiciary",
//     title: "Rajasthan Judicial Service Examination",
//     description:
//       "The Rajasthan Judicial Service (RJS) Examination 2024 is organized annually by the Rajasthan High Court to recruit candidates for the Civil Judge cadre. This examination is a critical step for those aspiring to join the judicial services in Rajasthan, providing a structured pathway to a career in the judiciary.",
//     rating: 4.5,
//     totalRatings: 15,
//   },
// ];

// export const CoursesAllGrid = () => {

//   const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       const fetchCourses = async () => {
//         try {
//           const response = await fetch('http://localhost:8000/api/allcourse');
//           if (!response.ok) {
//             throw new Error('Failed to fetch courses');
//           }
//           const data = await response.json();
//           setCourses(data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchCourses();
//     }, []);

    
  
//   return (
//     <div className="row td_gap_y_30 td_row_gap_30">
//      {courses.map((course, idx) => (
//         <div key={course.id} className="col-lg-4 col-md-6">
//           <div className="td_card td_style_3 d-block td_radius_10">
//             {course.label && (
//               <span className="td_card_label td_accent_bg td_white_color">
//                 {course.label}
//               </span>
//             )}
//             <Link to="/course-details" className="td_card_thumb">
//               <img src={Array.isArray(course.images) ? course.images[0] : course.images} />
//             </Link>
//             <div className="td_card_info td_white_bg">
//               <div className="td_card_info_in">
//                 <ul className="td_card_meta td_mp_0 td_fs_18 td_medium td_heading_color">
//                   <li>
//                     <img src={user} alt="Seats" />
//                     <span className="td_opacity_7">{course.seats} Seats</span>
//                   </li>
//                   <li>
//                     <img src={book} alt="Semesters" />
//                     <span className="td_opacity_7">
//                       {course.Semester} Semesters
//                     </span>
//                   </li>
//                 </ul>
//                 <Link
//                   to="/courses-grid-with-sidebar"
//                   className="td_card_category td_fs_14 td_bold td_heading_color td_mb_14"
//                 >
//                   <span>{course.category.name}</span>
//                 </Link>
//                 <h2 className="td_card_title td_fs_24 td_mb_16">
//                   <Link to="/course-details">{course.Coursename}</Link>
//                 </h2>
//                 <p className="td_card_subtitle td_heading_color td_opacity_7 td_mb_20">
//                   {course.CourseDescription }
//                 </p>
//                 <div className="td_card_review">
//                   <div className="td_rating" data-rating={course.Review}>
//                     <i className="fa-regular fa-star"></i>
//                     <i className="fa-regular fa-star"></i>
//                     <i className="fa-regular fa-star"></i>
//                     <i className="fa-regular fa-star"></i>
//                     <i className="fa-regular fa-star"></i>
//                     <div className="td_rating_percentage">
//                       <i className="fa-solid fa-star fa-fw"></i>
//                       <i className="fa-solid fa-star fa-fw"></i>
//                       <i className="fa-solid fa-star fa-fw"></i>
//                       <i className="fa-solid fa-star fa-fw"></i>
//                       <i className="fa-solid fa-star fa-fw"></i>
//                     </div>
//                   </div>
//                   <span className="td_heading_color td_opacity_5 td_medium">
//                     ({course.Review}/{course.totalRatings} Ratings)
//                   </span>
//                 </div>
//                    <div
//                  className="td_card_btn"
//                  style={{
//                    display: 'flex',
//                    flexDirection: 'row',
//                    gap: '12px',
//                    flexWrap: 'wrap',
//                    marginTop: '10px',
//                  }}
//                >
//                  <Link
//                    to="/enroll"
//                    className="td_btn td_style_1 td_radius_10 td_medium"
//                  >
//                    <span className="td_btn_in td_white_color td_accent_bg">
//                      <span>Enroll Now</span>
//                    </span>
//                  </Link>

//                  <Link
//                    to="/get-offer"
//                    className="td_btn td_radius_10 td_medium"
//                    style={{
//                      border: '2px solid #ff5722',
//                      color: '#ff5722',
//                      backgroundColor: '#fff',
//                      padding: '10px 20px',
//                      textAlign: 'center',
//                      display: 'inline-block',
//                      transition: 'all 0.3s ease',
//                    }}
//                    onMouseEnter={(e) => {
//                      e.currentTarget.style.backgroundColor = '#ff5722';
//                      e.currentTarget.style.color = '#fff';
//                    }}
//                    onMouseLeave={(e) => {
//                      e.currentTarget.style.backgroundColor = '#fff';
//                      e.currentTarget.style.color = '#ff5722';
//                    }}
//                  >
//                    Get Offer
//                  </Link>
//                </div>

               
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiDuration } from "react-icons/gi";
import user from "../../assets/img/icons/user_3.svg";
import book from "../../assets/img/icons/book.svg";
import courseThumb1 from "../../assets/alec-img/courses/course-1.jpg";
import courseThumb2 from "../../assets/alec-img/courses/up-course.jpg";
import courseThumb3 from "../../assets/alec-img/courses/jh-course.jpg";
import courseThumb4 from "../../assets/alec-img/courses/bihar-course.jpg";
import courseThumb5 from "../../assets/alec-img/courses/uttarakhand-course.jpg";
import courseThumb6 from "../../assets/alec-img/courses/rj-course.jpg";
import { FaRupeeSign } from "react-icons/fa";
export const CoursesAllGrid = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/allcourse');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="row td_gap_y_30 td_row_gap_30">
      {courses.map((course, idx) => (
        <div key={course._id || idx} className="col-lg-4 col-md-6">
          <div className="td_card td_style_3 d-block td_radius_10">
            {course.label && (
              <span className="td_card_label td_accent_bg td_white_color">
                {course.label}
              </span>
            )}
            <Link to={`/course-details/${course._id}`} className="td_card_thumb">
              <img 
                src={Array.isArray(course.images) ? course.images[0] : course.images || courseThumb1} 
                alt={course.Coursename} 
                className="img-fluid"
              />
            </Link>
            <div className="td_card_info td_white_bg">
              <div className="td_card_info_in">
                <ul className="td_card_meta td_mp_0 td_fs_18 td_medium td_heading_color">
                  <li>
                    {/* <img src={user} alt="Seats" /> */}
                    <FaRupeeSign />
                    <span className="td_opacity_7">{course.Price }</span>
                  </li>
                  <li>
                    {/* <img src={book} alt="Semesters" /> */}
<GiDuration />
                    <span className="td_opacity_7">
                      {course.Durations || 0} 
                    </span>
                  </li>
                </ul>
                <Link
                  to="/courses-grid-with-sidebar"
                  className="td_card_category td_fs_14 td_bold td_heading_color td_mb_14"
                >
                  <span>{course.category?.name || "Judiciary Examination"}</span>
                </Link>
                <h2 className="td_card_title td_fs_24 td_mb_16">
                  <Link to={`/course-details/${course._id}`}>{course.Coursename || "Judiciary Course"}</Link>
                </h2>
                <p className="td_card_subtitle td_heading_color td_opacity_7 td_mb_20">
            <span style={{fontWeight:'800'}}>Trainer: </span>      {course.TrainerName || "Comprehensive preparation for judiciary examinations."}
                </p>
                {/* <div className="td_card_review">
                  <div className="td_rating" data-rating={course.Review || 0}>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <div 
                      className="td_rating_percentage" 
                      style={{ width: `${(course.Review || 0) * 20}%` }}
                    >
                      <i className="fa-solid fa-star fa-fw"></i>
                      <i className="fa-solid fa-star fa-fw"></i>
                      <i className="fa-solid fa-star fa-fw"></i>
                      <i className="fa-solid fa-star fa-fw"></i>
                      <i className="fa-solid fa-star fa-fw"></i>
                    </div>
                  </div>
                  <span className="td_heading_color td_opacity_5 td_medium">
                    {/* ({course.Review || 0}/{course.totalRatings || 5} Ratings) */}
                  {/* </span> */}
                {/* </div> */} 
                <div
                  className="td_card_btn"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginTop: '10px',
                  }}
                >
                  <Link
                    to={`/enroll/${course._id}`}
                    className="td_btn td_style_1 td_radius_10 td_medium"
                  >
                    <span className="td_btn_in td_white_color td_accent_bg">
                      <span>Enroll Now</span>
                    </span>
                  </Link>

                  <Link
                    to={`/get-offer/${course._id}`}
                    className="td_btn td_radius_10 td_medium"
                    style={{
                      border: '2px solid #ff5722',
                      color: '#ff5722',
                      backgroundColor: '#fff',
                      padding: '10px 20px',
                      textAlign: 'center',
                      display: 'inline-block',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ff5722';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                      e.currentTarget.style.color = '#ff5722';
                    }}
                  >
                    Get Offer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};