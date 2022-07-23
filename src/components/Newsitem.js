import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageURL, newsURL, publishedAt, author, source } =
      this.props;
    return (
      <>
        <div className="col-md-4">
          <div className="card my-3">
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ zIndex: 1, left: "90%" }}
            >
              {source}
            </span>
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
              <small className="text-muted">
                Published at {publishedAt} by {author ? author : "Unknown"}
              </small>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Newsitem;
