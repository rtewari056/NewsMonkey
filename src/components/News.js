import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // We have to add props as an parameter in the constructor to use them
  constructor(props) {
    super(props);
    this.state = {
      articles: [], // At first articles will be an empty array
      loading: false, // And loading will be false
      pageNumber: 1, // And pageNumber will be 1
      totalResults: 0, // By default setting 0
    };

    // Changing title based on category
    if (this.props.category !== "general") {
      document.title = `${this.capitalizeFirstLetter(
        this.props.category
      )} - NewsMonkey`;
    } else {
      document.title = "NewsMonkey - Get your daily dose of news free!";
    }
  }

  updateNews = async () => {
    this.props.setProgress(10);

    const apiURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.pageNumber}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true }); // Before fetching the data

    const data = await fetch(apiURL);
    this.props.setProgress(50); // After getting response, setting progress to 30%
    const parsedData = await data.json();
    this.props.setProgress(70); // After converting it into JSON, setting progress to 70%

    this.setState({
      articles: parsedData.articles,
      pageNumber: this.state.pageNumber,
      loading: false, // After data fetched
    });

    this.props.setProgress(100); // At the end, setting it to 100%
  };

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    await this.setState({ pageNumber: this.state.pageNumber + 1 });

    const apiURL = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
      this.state.pageNumber + 1
    }&pageSize=${this.props.pageSize}`;

    const data = await fetch(apiURL);
    const parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      pageNumber: this.state.pageNumber,
    });
  };

  // Function to convert iso 8601 date format
  publishTime = (date) => {
    let d = new Date(
      date.toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
    );
    return `${d.toUTCString()}`;
  };

  render() {
    return (
      <>
        <h2 className="text-center fs-1 my-4">
          Top Headlines{" "}
          {this.props.category !== "general"
            ? `from ${this.capitalizeFirstLetter(this.props.category)}`
            : ""}
        </h2>

        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {/* If loading is false then only insert the news items */}
              {this.state.articles.map((element, index) => {
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
                    publishedAt={this.publishTime(element.publishedAt)}
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
  }
}

export default News;
