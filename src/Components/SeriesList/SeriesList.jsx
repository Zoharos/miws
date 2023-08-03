import React from "react";
import "./SeriesList.scss";

const SeriesList = ({ series, onFavorite, heart = "filled" }) => {
  return (
    <div className="list">
      <h2>Search Result</h2>
      {series &&
        series.map((show) => (
          <div key={show.id} className="series-box">
            <img
              src={show.image} // Replace this with the URL of the movie image
              alt={show.name}
              className="series-image"
            />
            <div className="series-details">
              {!show.isFavorite && (
                <span className="heart-icon" onClick={() => onFavorite(show.id)}>
                  {heart === "filled" ? "❤️" : "♡"}
                </span>
              )}
              <div className="series-title">{show.name}</div>
              <div className="series-rating">{show.score}</div>
              <div className="series-genres">{show.genres.join(" | ")}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SeriesList;
