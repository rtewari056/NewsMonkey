import React from "react";

const Newsitem = (props) => {
  let { title, description, imageURL, newsURL, publishedAt, author, source } =
    props; // Destructuring Props
  return (
      <div className="col-md-4">
        <div className="card my-3">
          <div className="position-absolute d-flex w-100 justify-content-end">
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
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
  );
};

export default Newsitem;
