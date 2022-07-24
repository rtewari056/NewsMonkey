import React, { useState, useEffect } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]); // At first articles will be an empty array
  const [loading, setLoading] = useState(true); // loading will be false
  const [pageNumber, setPageNumber] = useState(1); // pageNumber will be 1
  const [totalResults, setTotalResults] = useState(0); // By default will be 0

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);

    const apiURL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNumber}&pageSize=${props.pageSize}`;

    setLoading(true); // Before fetching the data

    const data = await fetch(apiURL);
    props.setProgress(50); // After getting response, setting progress to 30%
    const parsedData = await data.json();
    props.setProgress(70); // After converting it into JSON, setting progress to 70%

    setArticles(parsedData.articles);
    setLoading(false); // After data fetched
    setTotalResults(parsedData.totalResults);

    // Changing title based on category
    if (props.category !== "general") {
      document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    } else {
      document.title = "NewsMonkey - Get your daily dose of news free!";
    }

    props.setProgress(100); // At the end, setting it to 100%
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const apiURL = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      pageNumber + 1
    }&pageSize=${props.pageSize}`; // setPage is an async function so we are taking ${pageNumber+1}

    setPageNumber(pageNumber + 1);

    const data = await fetch(apiURL);
    const parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  // Function to convert iso 8601 date format
  const publishTime = (date) => {
    let d = new Date(
      date.toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
    );
    return `${d.toUTCString()}`;
  };

  return (
    <>
      <h2 className="text-center fs-1" style={{ marginTop: "5rem" }}>
        Top Headlines{" "}
        {props.category !== "general"
          ? `from ${capitalizeFirstLetter(props.category)}`
          : ""}
      </h2>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row">
            {/* If loading is false then only insert the news items */}
            {articles.map((element, index) => {
              return (
                <Newsitem
                  key={index} // When using map() method, Keys(should be unique) help React identify which items have changed, are added, or are removed
                  title={element.title ? element.title : ""} // If element.title is equals null then set title=element.title else title=""
                  description={element.description ? element.description : ""}
                  imageURL={
                    element.urlToImage
                      ? element.urlToImage
                      : "http://mapandan.gov.ph/wp-content/uploads/2018/03/no_image.jpg"
                  }
                  newsURL={element.url}
                  publishedAt={publishTime(element.publishedAt)}
                  author={element.author}
                  source={element.source.name}
                />
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
