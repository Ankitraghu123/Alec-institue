// import React from "react";
// import { Link } from "react-router-dom";

// import user from "../../assets/img/icons/user_3.svg";
// import book from "../../assets/img/icons/book.svg";
// import courseThumb1 from "../../assets/alec-img/judgement/latestjudgement-686.jpg";
// import courseThumb5 from "../../assets/alec-img/judgement/2.jpg";
// import courseThumb6 from "../../assets/alec-img/judgement/3.jpg";
// import courseThumb7 from "../../assets/alec-img/judgement/4.jpg";
// import courseThumb8 from "../../assets/alec-img/judgement/5.jpg";
// import courseThumb9 from "../../assets/alec-img/judgement/6.jpg";
// import courseThumb10 from "../../assets/alec-img/judgement/7.jpg";

// export const CoursesAllList = () => {

//     useEffect(() => {
//       const fetchCourses = async () => {
//         try {
//           const response = await fetch('http://localhost:8000/judement/display');
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
//     <div className="row td_gap_y_10 td_row_gap_30">
//       {courses.map((course) => (
//         <div key={course.id} className="col-xl-12">
//           <div className="td_card td_style_5 td_type_3">
//             <Link to="/course-details" className="td_card_thumb">
//               <span className="td_card_thumb_in td_radius_10">
//                 <img  src={Array.isArray(course.images) ? course.images[0] : course.images}/>
//                 <span className="td_card_label td_fs_14 td_white_color td_accent_bg">
//                   {course.label}
//                 </span>
//               </span>
//             </Link>
//             <div className="td_card_content">

//               <h2 className="td_card_title td_fs_24 td_semibold td_mb_12">
//                 <Link to="/course-details">{course.title}</Link>
//               </h2>

//               <div>
//                 <p>{course.subTitle}.</p>
//               </div>
//               {/* <div className="td_card_price_wrap td_mb_12">
//                 <div className="td_card_review">
//                   <div className="td_rating" data-rating={course.rating}>
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
//                   <span className="td_heading_color td_opacity_5 td_fs_14">
//                     (5.0/{course.totalRatings} Ratings)
//                   </span>
//                 </div>
//                 <span className="td_card_price td_accent_color td_fs_18 td_medium">
//                   ${course.price}
//                 </span>
//               </div> */}
//               <div className="td_card_btns_wrap justify-content-between ">
//                 <Link
//                   to="/blog-details"
//                   className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14"
//                 >
//                   <span className=" td_accent_color">
//                     <span>Posted By : </span>

//                     <span className="td_fs_18 td_medium td_heading_color">
//                   {course.publicerName}
//                 </span>
//                   </span>


//                 </Link>

//                 <Link  to="/judgements-details"
//                   className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14">
//                 <span className="td_btn_in td_white_color td_accent_bg">Read more...</span>
//                 </Link>

//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// import user from "../../assets/img/icons/user_3.svg";
// import book from "../../assets/img/icons/book.svg";
// import courseThumb1 from "../../assets/alec-img/judgement/latestjudgement-686.jpg";
// import courseThumb5 from "../../assets/alec-img/judgement/2.jpg";
// import courseThumb6 from "../../assets/alec-img/judgement/3.jpg";
// import courseThumb7 from "../../assets/alec-img/judgement/4.jpg";
// import courseThumb8 from "../../assets/alec-img/judgement/5.jpg";
// import courseThumb9 from "../../assets/alec-img/judgement/6.jpg";
// import courseThumb10 from "../../assets/alec-img/judgement/7.jpg";

// export const CoursesAllList = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleCourseClick = (courseId) => {
//     navigate(`/judgements-details/${courseId}`);
//   };


//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/judement/display');
//         if (!response.ok) {
//           throw new Error('Failed to fetch courses');
//         }
//         const data = await response.json();
//         setCourses(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="row td_gap_y_10 td_row_gap_30">
//       {courses.map((course) => (
//         <div key={course.id} className="col-xl-12">
//           <div className="td_card td_style_5 td_type_3">
//             <Link to="/course-details" className="td_card_thumb">
//               <span className="td_card_thumb_in td_radius_10">
//                 <img src={Array.isArray(course.images) ? course.images[0] : course.images} alt={course.title} />
//                 <span className="td_card_label td_fs_14 td_white_color td_accent_bg">
//                   {course.label}
//                 </span>
//               </span>
//             </Link>
//             <div className="td_card_content">
//               <h2 className="td_card_title td_fs_24 td_semibold td_mb_12">
//                 <Link to="/course-details">{course.title}</Link>
//               </h2>

//               <div>
//                 <p>{course.subTitle}.</p>
//               </div>
              
//               <div className="td_card_btns_wrap justify-content-between ">
//                 <Link
//                   to="/blog-details"
//                   className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14"
//                 >
//                   <span className=" td_accent_color">
//                     <span>Posted By : </span>
//                     <span className="td_fs_18 td_medium td_heading_color">
//                       {course.publicerName}
//                     </span>
//                   </span>
//                 </Link>

//                 {/* <Link to="/judgements-details" */}
//                 <div   onClick={() => handleCourseClick(course._id)}
//                   className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14">
//                   <span className="td_btn_in td_white_color td_accent_bg">Read more...</span>
//                 {/* </Link> */}
//                 </div>
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

export const CoursesAllList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/judgements-details/${courseId}`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/judement/display');
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="row td_gap_y_10 td_row_gap_30">
      {courses.map((course) => (
        <div key={course.id} className="col-xl-12">
          <div className="td_card td_style_5 td_type_3">
            <div className="td_card_thumb" onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
              <span className="td_card_thumb_in td_radius_10">
                <img src={Array.isArray(course.images) ? course.images[0] : course.images} alt={course.title} />
                <span className="td_card_label td_fs_14 td_white_color td_accent_bg">
                  {course.label}
                </span>
              </span>
            </div>
            <div className="td_card_content">
              <h2 className="td_card_title td_fs_24 td_semibold td_mb_12">
                <span onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
                  {course.title}
                </span>
              </h2>

              <div>
                <p>{course.subTitle}.</p>
              </div>
              
              <div className="td_card_btns_wrap justify-content-between">
                <div
                  className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14"
                >
                  <span className=" td_accent_color">
                    <span>Posted By : </span>
                    <span className="td_fs_18 td_medium td_heading_color">
                      {course.publicerName}
                    </span>
                  </span>
                </div>

                <div onClick={() => handleCourseClick(course._id)}
                  className="td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14"
                  style={{ cursor: 'pointer' }}>
                  <span className="td_btn_in td_white_color td_accent_bg">Read more...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};