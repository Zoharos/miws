import React, { useState } from "react";
import axios from "axios";
import SeriesList from "./Components/SeriesList/SeriesList";
import SearchBar from "./Components/SearchBar/SearchBar";
import { useLS } from "./LocalStorageContextHook/lscontext";
import "./App.scss";

function App() {
  const { value: lsFavoriteSeries, setls } = useLS();
  const [series, setSeries] = useState([]);
  const [favoriteSeries, setFavoriteSeries] = useState(lsFavoriteSeries || []);

  const handleAddToFavorite = (seriesId) => {
    setSeries((prevSeries) => prevSeries.map((show) => (show.id === seriesId ? { ...show, isFavorite: true } : show)));
    const newFavorites = [...favoriteSeries, series.find((show) => show.id === seriesId)];
    setFavoriteSeries(newFavorites);
    setls(newFavorites);
  };

  const handleRemoveFromFavorite = (seriesId) => {
    setSeries((prevSeries) => prevSeries.map((show) => (show.id === seriesId ? { ...show, isFavorite: false } : show)));
    const newFavorites = favoriteSeries.filter((show) => show.id !== seriesId);
    setFavoriteSeries(newFavorites);
    setls(newFavorites);
  };

  const handleSearch = async (query) => {
    try {
      const { data } = await axios({ method: "GET", url: `https://api.tvmaze.com/search/shows?q=${query}` });
      if (data) {
        const proccessedData = data.map((series) => ({
          id: series.show.id,
          name: series.show.name,
          score: parseFloat(series.score).toFixed(1),
          genres: series.show.genres,
          image: series.show.image.medium,
          isFavorite: favoriteSeries.find((show) => show.id === series.show.id) ? true : false
        }));
        setSeries(proccessedData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app">
      <div className="heading">
        <h2>The TV Series Database</h2>
      </div>
      <div className="search-bar">
        <SearchBar onChange={handleSearch} />
      </div>
      <div className="container">
        <div className="list">
          <SeriesList heart={"transparent"} series={series} onFavorite={handleAddToFavorite} />
        </div>
        <div className="list">
          <SeriesList heart={"filled"} series={favoriteSeries} onFavorite={handleRemoveFromFavorite} />
        </div>
      </div>
    </div>
  );
}

export default App;
