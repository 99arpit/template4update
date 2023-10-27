import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import img3 from "../Template/img/ma.jpg";
import img16 from "../Template/img/go.png";
import img17 from "../Template/img/insta.png";
import img18 from "../Template/img/youtub.png";
import img19 from "../Template/img/twi.png";
import img20 from "../Template/img/linkdin.png";
import img9 from "../Template/img/Advslider.jpg";

import { Link } from "react-router-dom";

const Calom = ({ agencyDetails, breakingNews, page_name }) => {
  // const handlePageClick = () => {};

  //////////////////////////// //////////education///////////////////////////////////////////////////

  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);

  const [categories, setCategory] = useState();

  const getCategoryName = (url) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].categories_Name_Url === url) {
        return categories[i].categories_Name_Hindi;
      }
    }
  };

  const getData = async (categories) => {
    try {
      const promises = categories.map((category) =>
        axios.get(
          `http://174.138.101.222:8080/${agencyDetails._id}/get-Postnews/${category}`
        )
      );

      const responses = await Promise.all(promises);

      const newData = responses.map((response, index) => ({
        category: categories[index],
        data: response.data.data,
      }));

      setData((prevData) => [...prevData, ...newData]);
      setFetch(true);

      // console.log("data fetched");
    } catch (error) {
      console.log(error);
    }
  };

  // const [input, setInput] = useState([]);
  // const getCategorie = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://174.138.101.222:8080/getmastercategories"
  //     );
  //     // console.log(response.data.data, "categories");
  //     setCategory(response.data.data);

  //     response.data.data.map((item) => {
  //       setInput((prev) => [...prev, item.categories_Name_Url]);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getCategorie();
  //   getData(input);
  // }, [categories?.length]);

  function formatDate(inputDate) {
    // Step 1: Parse the input string into a JavaScript Date object
    const dateObj = new Date(inputDate);

    // Step 2: Extract day, month, and year from the Date object
    const day = dateObj.getUTCDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getUTCFullYear();

    // Step 3: Format the values into "day month year" format
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  }

  ///////////////////////////////education end////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  const { id } = useParams();

  //   const [categories, setCategory] = useState();
  // const getCategories = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://174.138.101.222:8080/getmastercategories"
  //     );
  //     setCategory(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [paginatedPosts, setpaginatedPosts] = useState();
  const fetchAd = async () => {
    try {
      const response = await axios
        .get
        // `http://174.138.101.222:8080/${id}/${page_name}/Below_Breaking_News/get-Advertisement`
        ();
      console.log(response.data.data[0]);
      setAd(response.data.data[0]);
      setpaginatedPosts(
        _(response.data.data[0]).slice(0).take(pageSize).value()
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAd();
  }, [id, page_name]);

  // useEffect(() => {
  //   getCategories();
  // }, []);

  const [input, setInput] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://174.138.101.222:8080/getmastercategories"
      );
      // console.log(response.data.data, "categories");
      setCategory(response.data.data);

      response.data.data.map((item) => {
        setInput((prev) => [...prev, item.categories_Name_Url]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(input, "input");
  useEffect(() => {
    getCategories();
    getData(input);
  }, [categories?.length]);

  //////////////////////////////////////////// pagination start here ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (startIndex > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // breaking news pagination start here
  const [currentBreakingPage, setCurrentBreakingPage] = useState(1);
  const breakingItemsPerPage = 5; // Number of items to display per page

  const breakingStartIndex = (currentBreakingPage - 1) * breakingItemsPerPage;
  const breakingEndIndex = breakingStartIndex + breakingItemsPerPage;
  const breakingItemsToShow = breakingNews.slice(
    breakingStartIndex,
    breakingEndIndex
  );

  const breakingHandleNextPage = () => {
    if (breakingEndIndex < breakingNews.length) {
      setCurrentBreakingPage(currentBreakingPage + 1);
    }
  };

  const breakingHandlePrevPage = () => {
    if (breakingStartIndex > 0) {
      setCurrentBreakingPage(currentBreakingPage - 1);
    }
  };
  const breakingtotalPages = Math.ceil(
    breakingNews.length / breakingItemsPerPage
  );
  const breakingHandlePageClick = (pageNumber) => {
    setCurrentBreakingPage(pageNumber);
  };

  //////////////////////////////////////////// pagination end here ////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 7; // Number of items to display per page

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const itemsToShow = categories.slice(startIndex, endIndex);

  // const handleNextPage = () => {
  //   if (endIndex < categories.length) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePrevPage = () => {
  //   if (startIndex > 0) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const handlePageClick = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const totalPages = Math.ceil(categories.length / itemsPerPage);
  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);







 //////////////////////////////////////////// pagination start here for bracking news ////////////////////////////////////////////////////////////////////////////////////////////////////////

//  const [currentPage, setCurrentPage] = useState(1);
//  const itemsPerPage = 3; // Number of items to display per page

//  const startIndex = (currentPage - 1) * itemsPerPage;
//  const endIndex = startIndex + itemsPerPage;
//  const itemsToShow = data.slice(startIndex, endIndex);

//  const handleNextPage = () => {
//    if (endIndex < data.length) {
//      setCurrentPage(currentPage + 1);
//    }
//  };

//  const handlePrevPage = () => {
//    if (startIndex > 0) {
//      setCurrentPage(currentPage - 1);
//    }
//  };

//  const handlePageClick = (pageNumber) => {
//    setCurrentPage(pageNumber);
//  };

//  const totalPages = Math.ceil(data.length / itemsPerPage);
//  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//  // breaking news pagination start here
//  const [currentBreakingPage, setCurrentBreakingPage] = useState(1);
//  const breakingItemsPerPage = 5; // Number of items to display per page

//  const breakingStartIndex = (currentBreakingPage - 1) * breakingItemsPerPage;
//  const breakingEndIndex = breakingStartIndex + breakingItemsPerPage;
//  const breakingItemsToShow = breakingNews.slice(
//    breakingStartIndex,
//    breakingEndIndex
//  );

//  const breakingHandleNextPage = () => {
//    if (breakingEndIndex < breakingNews.length) {
//      setCurrentBreakingPage(currentBreakingPage + 1);
//    }
//  };

//  const breakingHandlePrevPage = () => {
//    if (breakingStartIndex > 0) {
//      setCurrentBreakingPage(currentBreakingPage - 1);
//    }
//  };
//  const breakingtotalPages = Math.ceil(
//    breakingNews.length / breakingItemsPerPage
//  );
//  const breakingHandlePageClick = (pageNumber) => {
//    setCurrentBreakingPage(pageNumber);
//  };

 //////////////////////////////////////////// pagination end here ////////////////////////////////////////////////////////////////////////////////////////////////////////










  
  return (
    <div className="container-fluid py-3">
      <div>
        <div className="row ">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                width: "35%",
                backgroundColor: "white",
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                margin: "1%",
              }}
            >
              <div className="  d-flex flex-column justify-content-between">
                <div className="bg-light py-2 px-4 mb-3">
                  <div
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      width: "100%",
                      textAlign: "center",
                      paddingTop: "1%",
                      paddingBottom: "1%",
                    }}
                  >
                    {" "}
                    <h3 className="m-0">Trending News</h3>
                  </div>
                </div>
                {/* <div className="pb-3">
                  <div className="bg-light py-2 px-4 mb-3">
                    <div
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        width: "100%",
                        textAlign: "center",
                        paddingTop: "1%",
                        paddingBottom: "1%",
                      }}
                    >
                      {" "}
                      <h3 className="m-0">Trending News</h3>
                    </div>
                  </div>
                  {breakingNews &&
                    breakingNews.map((news, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex mb-3 bg-light"
                          style={{ paddingTop: "10%", paddingBottom: "10%" }}
                        >
                          <div style={{ paddingLeft: "4%" }}>
                            <img
                              src={
                                news.image
                                  ? `http://174.138.101.222:8080${news.image}`
                                  : `https://www.newsclick.in/sites/default/files/2018-09/xfakenews_0.jpg.pagespeed.ic_.232PSP6q2x_0.jpg`
                              }
                              style={{
                                width: 100,
                                height: 100,
                                objectFit: "fill",
                              }}
                            />
                          </div>

                          <div
                            className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                            style={{ height: "100%" }}
                          >
                            <div className="mb-1" style={{ fontSize: 13 }}>
                              <p
                                className="mb-0"
                                style={{ display: "inline" }}
                                href=""
                              >
                                {news.category}
                              </p>
                              <span className="px-1">/</span>
                              <span>{formatDate(news.updatedAt)}</span>
                            </div>
                            <Link
                              to={`/${id}/DetailedNews/${news._id}`}
                              className="h6 m-0"
                            >
                              {news.title}
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </div> */}

                <div className="pb-3">
                  {breakingNews &&
                    breakingNews
                     
                      .map((news, index) => {
                        return (
                          <div
                            key={index}
                            className="d-flex mb-3 bg-light"
                            style={{ paddingTop: "3%", paddingBottom: "3%" }}
                          >
                            <div style={{ paddingLeft: "4%" }}>
                              <img
                                src={
                                  news.image
                                    ? `http://174.138.101.222:8080${news.image}`
                                    : `https://www.newsclick.in/sites/default/files/2018-09/xfakenews_0.jpg.pagespeed.ic_.232PSP6q2x_0.jpg`
                                }
                                style={{
                                  width: 100,
                                  height: 100,
                                  objectFit: "fill",
                                }}
                              />
                            </div>

                            <div
                              className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                              style={{ height: "100%" }}
                            >
                              <div className="mb-1" style={{ fontSize: 13 }}>
                                <p
                                  className="mb-0"
                                  style={{ display: "inline" }}
                                  href=""
                                >
                                  {news.category}
                                </p>
                                <span className="px-1">/</span>
                                <span>{formatDate(news.updatedAt)}</span>
                              </div>
                              <Link
                                to={`/${id}/DetailedNews/${news._id}`}
                                className="h6 m-0 text-decoration-none"
                              >
                                {news.title}
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                  {/* <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a
                            className="page-link"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                          >
                            <i className="fa fa-angle-left text-primary mr-2" />
                            <i className="fa fa-angle-left text-primary mr-2" />
                          </a>
                        </li>
                        {pageNumbers.map((pageNumber) => (
                          <li className="page-item">
                            <a
                              key={pageNumber}
                              className={`page-link page-number-button ${
                                pageNumber === currentPage ? "active" : ""
                              }`}
                              onClick={() => handlePageClick(pageNumber)}
                            >
                              {pageNumber}
                            </a>
                          </li>
                        ))}
                        <li className="page-item">
                          <a
                            className="page-link"
                            onClick={handleNextPage}
                            disabled={endIndex >= data.length}
                          >
                            <i className="fa fa-angle-right text-primary mr-2" />
                            <i className="fa fa-angle-right text-primary mr-2" />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>  */}



                  {/* <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5px'
        }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}>
                  <i className="fa fa-angle-left text-primary mr-2" />
                  <i className="fa fa-angle-left text-primary mr-2" />
                </a>
              </li>
              {pageNumbers.map((pageNumber) => (
                <li className="page-item">
                  <a
                    key={pageNumber}
                    className={`page-link page-number-button ${pageNumber === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    {pageNumber}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a className="page-link"
                  onClick={handleNextPage}
                  disabled={endIndex >= breakingNews.length}>
                  <i className="fa fa-angle-right text-primary mr-2" />
                  <i className="fa fa-angle-right text-primary mr-2" />
                </a></li>
            </ul>
          </nav>
        </div> */}










                </div>
              </div>

              <div style={{ paddingTop: "0%" }} className="pb-3">
                <div className="bg-light py-2 px-4 mb-3">
                  <h3
                    style={{ backgroundColor: "blue", color: "white" }}
                    className="m-0"
                  >
                    Newsletter
                  </h3>
                </div>
                <div className="bg-light text-center p-4 mb-3">
                  <p>
                    Aliqu justo et labore at eirmod justo sea erat diam dolor
                    diam vero kasd
                  </p>
                  <div className="input-group" style={{ width: "100%" }}>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Your Email"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary">Sign Up</button>
                    </div>
                  </div>
                  <div style={{ paddingTop: "5%", paddingBottom: "5%" }}>
                    <large>Sit eirmod nonumy kasd eirmod</large>
                  </div>
                </div>
              </div>
            </div>

            {/* <div
              style={{
                width: "60%",
                backgroundColor: "white",
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                margin: "1%",
              }}
            >
              <div className="  d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-1">
                  <h3
                    style={{
                      border: "1px solid black",
                      backgroundColor: "blue",
                      width: "100%",
                      textAlign: "center",
                      color: "white",
                      paddingBottom: "1%",
                      paddingTop: "1%",
                    }}
                    className="m-0"
                  >
                    News
                  </h3>
                </div>
                <div className="container">
                  <div className="row">


                  
                  <div className="row" style={{ marginLeft: "56px" }}>
                    {item.data
                      .reverse()
                      .slice(0, 2)
                      .map((news, index) => {
                        return (
                          <div
                            key={index}
                            className="position-relative col-sm-12 col-md-6"
                            style={{
                              height: "300px",
                            }}
                            onClick={() => {
                              navigate(
                                `/${agencyDetails._id}/DetailedNews/${news._id}`,
                                {
                                  state: {
                                    item: news,
                                    agencyDetails: agencyDetails,
                                  },
                                }
                              );
                            }}
                          >
                            <img
                              className="img-fluid"
                              src={`http://174.138.101.222:8080${news.image}`}
                              style={{
                                width: "85%",
                              }}
                            />
                            <div
                              className=" main-paragraph-d"
                              style={{
                                padding: "12px 0px",
                                height: "20%",
                              }}
                            >
                              <div className="mb-2" style={{ fontSize: 13 }}>
                                <span>{formatDate(news.updatedAt)}</span>
                              </div>
                              <p className=" m-0" href="">
                                {news.title}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                 
                  </div>
                </div>
              </div>
            </div>  */}

            <div
              style={{
                width: "50%",
                backgroundColor: "white",
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                margin: "1%",
              }}
            >
              <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-1">
                <h3
                  style={{
                    border: "1px solid black",
                    backgroundColor: "blue",
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    paddingBottom: "1%",
                    paddingTop: "1%",
                  }}
                  className="m-0"
                >
                  News
                </h3>
              </div>

              <div style={{ paddingTop: "2%" }}>
                {fetch &&
                  itemsToShow.map((item, index) => {
                    return (
                      <>
                        <div key={index}>
                          {/* <div className="latest_post">
                            {item.data.length > 0 && (
                              <h2 className="m-0">
                                <Link
                                  style={{ color: "white" }}
                                  to={`/${agencyDetails._id}/Category/${item.category}`}
                                >
                                  {getCategoryName(item.category)}
                                </Link>
                              </h2>
                            )}
                          </div> */}

                          <div className=" ">
                            {/* <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-1">
                              <h3
                                style={{
                                  border: "1px solid black",
                                  backgroundColor: "blue",
                                  width: "100%",
                                  textAlign: "center",
                                  color: "white",
                                  paddingBottom: "1%",
                                  paddingTop: "1%",
                                }}
                                className="m-0"
                              >
                                News
                              </h3>
                            </div> */}

                            <div className="container">
                              <div className="d-flex mb-3 ">
                                <div
                                  className="row   bg-light"
                                  // style={{ textAlign: "center", }}
                                >
                                  {item.data
                                    .reverse()
                                    .slice(0, 2)
                                    .map((news, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="position-relative col-sm-12 col-md-6  bg-light "
                                          style={{
                                            paddingTop: "3%",
                                            // backgroundColor:'grey',
                                            // height: "300px",
                                          }}
                                          onClick={() => {
                                            navigate(
                                              `/${agencyDetails._id}/DetailedNews/${news._id}`,
                                              {
                                                state: {
                                                  item: news,
                                                  agencyDetails: agencyDetails,
                                                },
                                              }
                                            );
                                          }}
                                        >
                                          <img
                                            className="img-fluid"
                                            src={`http://174.138.101.222:8080${news.image}`}
                                            // style={{
                                            //   width: "85%",
                                            // }}
                                            style={{
                                              width: 400,
                                              height: 150,
                                              objectFit: "fill",
                                            }}
                                          />

                                          <div
                                            className=" main-paragraph-d"
                                            style={{
                                              padding: "12px 0px",
                                              height: "20%",
                                            }}
                                          >
                                            <div
                                              className="mb-2"
                                              style={{ fontSize: 13 }}
                                            >
                                              <span>
                                                {formatDate(news.updatedAt)}
                                              </span>
                                            </div>
                                            <p className=" m-0" href="">
                                              {news.title}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                        >
                          <i className="fa fa-angle-left text-primary mr-2" />
                          <i className="fa fa-angle-left text-primary mr-2" />
                        </a>
                      </li>
                      {pageNumbers.map((pageNumber) => (
                        <li className="page-item">
                          <a
                            key={pageNumber}
                            className={`page-link page-number-button ${
                              pageNumber === currentPage ? "active" : ""
                            }`}
                            onClick={() => handlePageClick(pageNumber)}
                          >
                            {pageNumber}
                          </a>
                        </li>
                      ))}
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={handleNextPage}
                          disabled={endIndex >= data.length}
                        >
                          <i className="fa fa-angle-right text-primary mr-2" />
                          <i className="fa fa-angle-right text-primary mr-2" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

            <div
              style={{
                width: "35%",
                backgroundColor: "white",
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                margin: "1%",
              }}
            >
              <div className=" d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-1">
                  <h3
                    style={{
                      textAlign: "center",
                      backgroundColor: "blue",
                      width: "100%",
                      color: "white",
                      paddingBottom: "2%",
                      paddingTop: "1%",
                    }}
                    className="m-0"
                  >
                    Categories
                  </h3>
                </div>

                <div className="pb-3">
                  {categories &&
                    categories
                    
                      .map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="position-relative overflow-hidden"
                            style={{
                              margin: "2%",
                              height: "11%",
                              backgroundColor: "rgb(232, 232, 232)",
                              minHeight: "50px",
                            }}
                            onClick={() =>
                              navigate(
                                `/${agencyDetails._id}/Category/${item.categories_Name_Url}`,
                                {
                                  state: { agencyDetails },
                                }
                              )
                            }
                          >
                            <p className="overlay align-items-center justify-content-center h4 mb-0 text-white text-decoration-none">
                              {item.categories_Name_Hindi}
                            </p>
                          </div>
                        );
                      })}
                  {/* <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a
                            className="page-link"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                          >
                            <i className="fa fa-angle-left text-primary mr-2" />
                            <i className="fa fa-angle-left text-primary mr-2" />
                          </a>
                        </li>
                        {pageNumbers.map((pageNumber) => (
                          <li className="page-item">
                            <a
                              key={pageNumber}
                              className={`page-link page-number-button ${
                                pageNumber === currentPage ? "active" : ""
                              }`}
                              onClick={() => handlePageClick(pageNumber)}
                            >
                              {pageNumber}
                            </a>
                          </li>
                        ))}
                        <li className="page-item">
                          <a
                            className="page-link"
                            onClick={handleNextPage}
                            disabled={endIndex >= data.length}
                          >
                            <i className="fa fa-angle-right text-primary mr-2" />
                            <i className="fa fa-angle-right text-primary mr-2" />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div> */}
                </div>

                {/* <div style={{ paddingTop: "2%" }}>
                  {categories &&
                    categories.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="position-relative overflow-hidden"
                          style={{
                            margin: "2%",
                            height: "11%",
                            backgroundColor: "rgb(232, 232, 232)",
                            minHeight: "50px",
                          }}
                          onClick={() =>
                            navigate(
                              `/${agencyDetails._id}/Category/${item.categories_Name_Url}`,
                              {
                                state: { agencyDetails },
                              }
                            )
                          }
                        >
                          <p className="overlay align-items-center justify-content-center h4 mb-0 text-white text-decoration-none">
                            {item.categories_Name_Hindi}
                          </p>
                        </div>
                      );
                    })}
                </div> */}
              </div>
              {/* 
              <div style={{ width: "28%" }} className="col-sm-3">
       
       {itemsToShow &&
         itemsToShow.map((item, index) => {
           return (
             <div className="media">
               <div
                 key={index}
                 className="media-body"
                 onClick={() =>
                   navigate(
                     `/${agencyDetails._id}/Category/${item.categories_Name_Url}`,
                     {
                       state: { agencyDetails },
                     }
                   )
                 }
               >
                 <p
                   style={{ color: "white" }}
                   className="align-items-center justify-content-center h4 mb-0 "
                 >
                   {item.categories_Name_Hindi}
                 </p>
               </div>
             </div>
           );
         })}

       <div
         style={{
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
         }}
       >
         <nav aria-label="Page navigation example">
           <ul className="pagination">
             <li className="page-item">
               <a
                 className="page-link"
                 onClick={handlePrevPage}
                 disabled={currentPage === 1}
               >
                 <i className="fa fa-angle-left text-primary mr-2" />
                 <i className="fa fa-angle-left text-primary mr-2" />
               </a>
             </li>
             {pageNumbers.map((pageNumber) => (
               <li className="page-item">
                 <a
                   key={pageNumber}
                   className={`page-link page-number-button ${
                     pageNumber === currentPage ? "active" : ""
                   }`}
                   onClick={() => handlePageClick(pageNumber)}
                 >
                   {pageNumber}
                 </a>
               </li>
             ))}
             <li className="page-item">
               <a
                 className="page-link"
                 onClick={handleNextPage}
                 disabled={endIndex >= categories.length}
               >
                 <i className="fa fa-angle-right text-primary mr-2" />
                 <i className="fa fa-angle-right text-primary mr-2" />
               </a>
             </li>
           </ul>
         </nav>
       </div>
     </div> */}
              <div style={{ paddingTop: "5%" }}>
                {" "}
                <h4
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    textAlign: "center",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Advertisement{" "}
                </h4>
              </div>
              <div>
                <img
                  style={{
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    height: "100%",
                    width: "100%",
                    paddingTop: "20px",
                  }}
                  src={img3}
                />
              </div>{" "}
              <div style={{ paddingTop: "5%" }}>
                <h4
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    textAlign: "center",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Social Links
                </h4>
                <div style={{ textAlign: "center" }}>
                  <img
                    style={{
                      marginRight: "5%",

                      height: "70px",
                      width: "60px",
                      // paddingLeft: "10px",
                      paddingTop: "20px",
                    }}
                    src={img16}
                  />
                  {/* <br /> */}
                  <img
                    style={{
                      marginRight: "5%",
                      height: "70px",
                      width: "60px",
                      // paddingLeft: "10px",
                      paddingTop: "20px",
                    }}
                    src={img17}
                  />
                  {/* <br /> */}

                  <img
                    style={{
                      marginRight: "5%",

                      height: "70px",
                      width: "60px",
                      // paddingLeft: "10px",
                      paddingTop: "20px",
                    }}
                    src={img18}
                  />
                  {/* <br /> */}

                  <img
                    style={{
                      marginRight: "5%",

                      height: "70px",
                      width: "60px",
                      // paddingLeft: "10px",
                      paddingTop: "20px",
                    }}
                    src={img20}
                  />
                  {/* <br /> */}

                  <img
                    style={{
                      height: "70px",
                      width: "60px",
                      // paddingLeft: "10px",
                      paddingTop: "20px",
                    }}
                    src={img19}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calom;
