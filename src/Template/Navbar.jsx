import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const agencyDetails = useSelector((state) => {
    return state.User;
  });

  const [ad, setAd] = useState();
  // console.log(agencyDetails);

  const [categories, setCategory] = useState();
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://174.138.101.222:8080/getmastercategories"
      );
      // console.log(response.data.data, "categories");
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container-fluid p-0 mb-3">
      <nav className="navbar navbar-expand-lg bg-light navbar-light py-2 py-lg-0 px-lg px-sm-1">
        <a href="" className="navbar-brand d-block d-lg-none">
          <h1 className="m-0 display-5 ">
            <span className="text-danger">
              {agencyDetails.publication_name}
            </span>
          </h1>
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          style={{
            backgroundColor: "blue",
            textAlign: "center",
          }}
          className="collapse navbar-collapse justify-content-between px-0 px-lg-3"
          id="navbarCollapse"
        >
          <div
            style={{
              display: "inline-block",
              // border: "1px solid red",
              // padding: "1rem 1rem",
              verticalAlign: "middle",
            }}
          >
            <img
              src={`http://174.138.101.222:8080${agencyDetails.logo_small}`}
              alt=""
              // width={"100%"}
              // height={"100%"}
              style={{ width: "200px", height: "100px", objectFit: "fill" }}
            />
          </div>
          <div
            style={{
              display: "inline-block",
              // border: "1px solid red",
              // padding: "1rem 1rem",
              verticalAlign: "middle",
            }}
          >
            {/* <div>
              <img
                src={`http://174.138.101.222:8080${agencyDetails.logo_small}`}
                alt=""
                width={"150px"}
                height={"100px"}
              />
            </div> */}
            <div style={{}}>
              <div className="navbar-nav mr-auto py-0">
                <Link
                  style={{
                    paddingTop: "1%",
                    color: "white",
                    marginRight: "20px",
                    textDecoration: "none",
                  }}
                  to={`/${agencyDetails._id}`}
                  className="nav-item nav active"
                >
                  Home
                </Link>

                {/* <a
                  style={{
                    paddingTop: "1%",
                    color: "white",
                    marginRight: "20px",
                    textDecoration: "none",
                  }}
                  href="single.html"
                  className="nav-item "
                >
                  SingleNews
                </a> */}

                {/* <a
                  style={{
                    paddingTop: "1%",
                    textDecoration: "none",
                    color: "white",
                    marginRight: "20px",
                  }}
                  href="contact.html"
                  className="nav-item "
                >
                  Contact
                </a> */}

                <a
                  style={{
                    paddingTop: "1%",
                    textDecoration: "none",
                    marginRight: "20px",
                  }}
                  href="contact.html"
                  className="nav-item "
                >
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    className="Categories-a "
                    to={`/${agencyDetails._id}/Epaper`}
                  >
                    {" "}
                    Epaper
                  </Link>
                </a>

                <a style={{ paddingTop: "1%" }}>
                  {categories &&
                    categories.map((item, index) => {
                      return (
                        <Link
                          className="nav-item link "
                          style={{
                            color: "white",
                            textDecoration: "none",
                            marginRight: "35px",
                          }}
                          to={`/${agencyDetails._id}/Category/${item.categories_Name_Url}`}
                          state={agencyDetails}
                          key={index}
                          // className="nav-link"

                          // className="dropdown-item"
                        >
                          {item.categories_Name_English}
                        </Link>
                      );
                    })}
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
