import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageURL, newsURL, publishedAt  } = this.props;
    return (
      <>
        <div className="col-md-4">
          <div className="card my-3">
            <img src={imageURL} className="card-img-top" alt={title} />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a
                href={newsURL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-primary"
              >
                Read more
              </a>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated: {publishedAt}</small>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Newsitem;
