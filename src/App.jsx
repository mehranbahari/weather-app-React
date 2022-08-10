import { useState } from "react";
import Spiner from "./component/Spiner";

const App = () => {
  const [show, setShow] = useState({});
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(false);

  //   const m = 1112cf0f6e8f4e7daf573559212512

  const search = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      fetch(
        `http://api.weatherapi.com/v1/current.json?key= 1112cf0f6e8f4e7daf573559212512&q=${active}&aqi=no`
      )
        .then((res) => res.json())
        .then((data) => {
          setShow(data);
          setActive("");
          setLoading(false);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof show.location != "undefined"
          ? show.current.temp_c > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            value={active}
            onChange={(e) => setActive(e.target.value)}
            placeholder="please search yuor city or country"
            onKeyPress={search}
          />
        </div>
        {loading ? (
          <Spiner />
        ) : typeof show.location != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {show.location.country},{show.location.name}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{show.current.temp_c}C</div>
              <div className="weather">
                <img src={show.current.condition.icon} alt="" />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default App;
