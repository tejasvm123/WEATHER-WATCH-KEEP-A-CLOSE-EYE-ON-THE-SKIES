import React, { useEffect, useState } from "react";
import "./css/style.css";

const Temp_app = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Pune");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=bfed55cb290fd3488ce2b8432a83098b&units=metric`;
      try {
        const response = await fetch(url);
        const responseJSON = await response.json();
        setCity(responseJSON);
        setError(null);
      } catch (error) {
        setError("City not found");
      }
    };

    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            value={search}
            className="inputField"
            placeholder="Enter City Name"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          ></input>
        </div>
        {error && <p className="errorMsg">{error}</p>}
        {!error && !city && <p className="loading">Loading...</p>}
        {!error && city && (
          <div>
            <div className="info">
              <h2 className="location">
                <i
                  className={`flag-icon flag-icon-${city.sys?.country?.toLowerCase()}`}
                />
                {city.name}, {city.sys?.country}
              </h2>

              <h1 className="temp">{city.main && city.main.temp}&deg;C</h1>

              <h3 className="tempmin_max">
                <span className="minTemp">
                  Min: {city.main && city.main.temp_min}&deg;C
                </span>
                <span className="maxTemp">
                  Max: {city.main && city.main.temp_max}&deg;C
                </span>
              </h3>
              <div className="weatherDescription">
                {city.weather && city.weather[0]?.description}
              </div>
              <div className="humidity">
                Humidity: {city.main && city.main.humidity}%
              </div>
              <div className="wind">
                Wind: {city.wind && city.wind.speed}m/s
              </div>
              <div className="time">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  timeZoneName: "short",
                })}
              </div>
            </div>

            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Temp_app;
