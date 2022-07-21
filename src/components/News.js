import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  apiKey = "95a1932962814593a37f42c357e22595";
  country = "in";
  constructor() {
    super();
    this.state = {
      articles: [], // At first articles will be an empty array
      loading: false, // And loading will be false
      pageNumber: 1, // And pageNumber will be 1
    };
  }

  async componentDidMount() {
    const apiURL = `https://newsapi.org/v2/top-headlines?country=${this.country}&apiKey=${this.apiKey}&page=1&pageSize=20`;
    const data = await fetch(apiURL);
    const parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  // Function to convert iso 8601 date format
  publishTime = (date) => {
    let d = new Date(
      date.toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
    );
    return `${d.toUTCString()}`;
  };

  handlePreviousClick = async () => {
    const apiURL = `https://newsapi.org/v2/top-headlines?country=${
      this.country
    }&apiKey=${this.apiKey}&page=${this.state.pageNumber - 1}&pageSize=20`;
    const data = await fetch(apiURL);
    const parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      pageNumber: this.state.pageNumber - 1,
    });
  };

  handleNextClick = async () => {
    // 
    if (this.state.pageNumber + 1 > Math.ceil(this.state.totalResults / 20)) {
      // If there is no articles left to populate on the page then this chunk of code will run
      /*
      Suppose totalResults = 21 So, Math.ceil(21/20) will be equals 2
        At first, page = 1 is not greater than 2
        After clicking on the "Next" button, page = 2 which is also not greater than 2
        Again clicking on the "Next" button, page = 3 which is greater than 2, so now there is no articles left to populate on the screen
      */
    } else {
      const apiURL = `https://newsapi.org/v2/top-headlines?country=${
        this.country
      }&apiKey=${this.apiKey}&page=${this.state.pageNumber + 1}&pageSize=20`;
      const data = await fetch(apiURL);
      const parsedData = await data.json();

      this.setState({
        articles: parsedData.articles,
        pageNumber: this.state.pageNumber + 1,
      });
    }
  };

  render() {
    return (
      <div className="container my-5">
        <h2>NewsMonkey - Top Headlines</h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <Newsitem
                key={element.url} // When using map() method, Keys(should be unique) help React identify which items have changed, are added, or are removed
                title={element.title ? element.title : ""} // If element.title is equals null then set title=element.title else title=""
                description={element.description ? element.description : ""}
                imageURL={
                  element.urlToImage
                    ? element.urlToImage
                    : "http://mapandan.gov.ph/wp-content/uploads/2018/03/no_image.jpg"
                }
                newsURL={element.url}
                publishedAt={this.publishTime(element.publishedAt)}
              />
            );
          })}
          <div className="container mt-5 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handlePreviousClick}
              disabled={this.state.pageNumber <= 1}
            >
              &laquo; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &raquo;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
