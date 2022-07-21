import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [], // At first articles will be an empty array
      loading: false, // And loading will be false
    };
  }

  // Function to convert iso 8601 date format
  publishTime = (date) => {
    let d = new Date(
      date.toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
    );
    return `${d.toUTCString()}`;
  };

  async componentDidMount() {
    const apiURL = "https://newsapi.org/v2/top-headlines?country=in&apiKey=95a1932962814593a37f42c357e22595";
    const data = await fetch(apiURL);
    const parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
    console.log(parsedData);
  }

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
        </div>
      </div>
    );
  }
}

export default News;
