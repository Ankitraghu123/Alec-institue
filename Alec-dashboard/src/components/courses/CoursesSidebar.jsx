import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

const categories = [
  { name: "Landmark Judgement" },
  { name: "Latest Judgement", count: 45 },
  { name: "Judgement", count: 16 },
  { name: "Law", count: 45 },
  { name: "5 Years LLb", count: 42 },
  { name: "Legal", count: 44 },
  { name: "Landmark", count: 44 },
  { name: "Latest", count: 44 },
];

const languages = [
  "Spanish Language",
  "Arabic Language",
  "United State(UK)",
  "United Kingdom(US)",
];

const skillLevels = [
  { name: "All Level", count: 59 },
  { name: "Beginners Level", count: 50 },
  { name: "Intermediate Level", count: 42 },
  { name: "Expert Level", count: 30 },
];

const durations = [
  { hours: "0-1", count: 120 },
  { hours: "0-3", count: 130 },
  { hours: "0-4", count: 89 },
  { hours: "0-5", count: 96 },
];

const ratings = [5, 4, 3, 2, 1];

export const CoursesSidebar = () => {
  useEffect(() => {
    $("#slider-range").slider({
      range: true,
      min: 10,
      max: 400,
      values: [60, 300],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      },
    });
    $("#amount").val(
      "$" +
        $("#slider-range").slider("values", 0) +
        " - $" +
        $("#slider-range").slider("values", 1)
    );
  }, []);

  return (
    <div className="td_sidebar_filter">
      {/* search */}
      {/* <div className="td_filter_widget">
        <form action="#" className="td_sidebar_search">
          <input
            type="text"
            placeholder="Keywords"
            className="td_sidebar_search_input"
          />
          <button type="submit" className="td_sidebar_search_btn td_center">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div> */}

      {/* price range */}
      {/* <div className="td_filter_widget">
        <h3 className="td_filter_widget_title td_fs_20 td_mb_16">
          Price Filter
        </h3>
        <div className="st-range-slider-wrap">
          <div id="slider-range" />
          <div className="td_amount_wrap">
            <input type="text" id="amount" readOnly />
          </div>
        </div>
      </div> */}

      {/* categories */}
      <div className="td_filter_widget">
        <h3 className="td_filter_widget_title td_fs_20 td_mb_16">Categories</h3>
        <div className="td_filter_category td_fs_18 td_semibold">
          {categories.map((category, index) => (
            <Link key={index} to="/courses-grid-view">
              <span>{`${category.name} `}</span>

            </Link>
          ))}
        </div>
      </div>


    </div>
  );
};
