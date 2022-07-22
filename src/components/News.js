import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor() {
    super();
    this.state = {
      articles: [], // At first articles will be an empty array
      loading: false, // And loading will be false
      pageNumber: 1, // And pageNumber will be 1
    };
  }

  async componentDidMount() {
    const apiURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true }); // When app starts

    const data = await fetch(apiURL);
    const parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false, // After fetching data 
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
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.pageNumber - 1}&pageSize=${
      this.props.pageSize
    }`;

    this.setState({ loading: true }); // Before fetching the data

    const data = await fetch(apiURL);
    const parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      pageNumber: this.state.pageNumber - 1,
      loading: false, // After data fetched
    });
  };

  handleNextClick = async () => {
    //
    if (
      !(
        this.state.pageNumber + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      // If there is no articles left to populate on the page then this chunk of code will not run
      /*
      Suppose totalResults = 21 So, Math.ceil(21/20) will be equals 2
        At first, pageNumber = 1 is not greater than 2
        After clicking on the "Next" button, pageNumber = 2 which is also not greater than 2
        Again clicking on the "Next" button, pageNumber = 3 which is greater than 2, so now there is no articles left to populate on the screen
      */

      const apiURL = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.pageNumber + 1}&pageSize=${
        this.props.pageSize
      }`;

      this.setState({ loading: true }); // Before fetching the data

      const data = await fetch(apiURL);
      const parsedData = await data.json();

      this.setState({
        articles: parsedData.articles,
        pageNumber: this.state.pageNumber + 1,
        loading: false, // After data fetched
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsMonkey - Top Headlines</h2>

        {this.state.loading && <Spinner />}

        <div className="row">
         {/* If loading is false then only insert the news items */}
          {!this.state.loading && this.state.articles.map((element) => {
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
              disabled={
                this.state.pageNumber + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
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
