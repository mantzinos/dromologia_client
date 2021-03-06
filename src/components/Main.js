import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import Navbar from "./Navbar";

const Main = props => {
  const [checkUser, setCheckUser] = useState("");
  const [checkAdd, setCheckAdd] = useState(false);
  const [myDriver, setMyDriver] = useState({});
  const [myVehicle, setMyVehicle] = useState({});
  const [myDestination, setMyDestination] = useState({});
  const [myItinerary, setMyItinerary] = useState({});
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const now = new Date();
  const [timer, setTimer] = useState(now);
  const [delay, setDelay] = useState(null);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useEffect(() => {
    const letsCheckUser = async () => {
      const user = props.match.params.name;
      setCheckUser(prev => user);
      const myDrivers = await axios.get(
        `${process.env.REACT_APP_LOCAL}/driver/getall/${user}`
      );
      setDrivers(prev => myDrivers.data);

      const myVehicles = await axios.get(
        `${process.env.REACT_APP_LOCAL}/vehicle/getall/${user}`
      );
      setVehicles(prev => myVehicles.data);
      const myDestinations = await axios.get(
        `${process.env.REACT_APP_LOCAL}/destination/getall/${user}`
      );
      setDestinations(prev => myDestinations.data);

      // const dates = new Date().toLocaleDateString();
      // const simera = await axios.post(
      //   `${process.env.REACT_APP_LOCAL}/itinerary/date/${user}`,
      //   { dates }
      // );
      // const todayData = simera.data;
      // const activeDate = todayData.filter(a => !a.stop);

      // setItineraries(prev => activeDate);
      if (itineraries !== []) {
        setDelay(prev => 1000);
      }

      // const allItineraries = await axios.get(
      //   `${process.env.REACT_APP_LOCAL}/itinerary/getall/${user}`
      // );
      // const noStopDates = allItineraries.data.filter(a => a.stop === undefined);
      // setItineraries(prev => [...prev, ...noStopDates]);
      const myitineraries = await axios.get(
        `${process.env.REACT_APP_LOCAL}/itinerary/getall/${user}`
      );
      console.log(myitineraries.data);
      setItineraries(prev => myitineraries.data.filter(a => !a.stop));
    };
    letsCheckUser();
  }, []);

  const startTimer = () => {
    setTimer(prev => new Date());
  };

  const handleChangeDriver = event => {
    drivers.forEach(a => {
      if (a._id === event.target.value) {
        setMyDriver(prev => a);
        setMyItinerary(prev => {
          return {
            ...prev,
            driver: a.lastname,
            driverphoto: a.photo,
          };
        });
      }
    });
  };
  const handleChangeVehicle = event => {
    vehicles.forEach(a => {
      if (a._id === event.target.value) {
        setMyVehicle(prev => a);
        setMyItinerary(prev => {
          return {
            ...prev,
            vehicle: a.sign,
          };
        });
      }
    });
  };
  const handleChangeDestination = event => {
    destinations.forEach(a => {
      if (a._id === event.target.value) {
        setMyDestination(prev => a);
        setMyItinerary(prev => {
          return {
            ...prev,
            destination: a.name,
          };
        });
      }
    });
  };
  const handleChangeItinerary = async event => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_LOCAL}/itinerary/add/${checkUser}`,
        myItinerary
      );
      setItineraries(prev => [...prev, res.data]);

      setCheckAdd(prev => false);
    } catch (err) {
      console.log(err);
    }
  };
  const checkAddBtn = event => {
    setCheckAdd(prev => true);
  };
  const checkReturn = event => {
    event.preventDefault();
    setCheckAdd(prev => false);
  };

  const stopTimer = async event => {
    const timeNow = new Date().toISOString();
    const { name, value } = event.target;
    const res = await axios.put(
      `${process.env.REACT_APP_LOCAL}/itinerary/update/${checkUser}`,
      {
        _id: name,
        stop: timeNow,
      }
    );
    setItineraries(prev => prev.filter(a => a._id !== name));
  };

  useInterval(startTimer, delay);

  return (
    <section className="mainsection">
      <Navbar key={checkUser} user={checkUser} />
      {!checkAdd ? (
        <div className="mycheckbtn">
          <button className="checkbtn" onClick={checkAddBtn}>
            ????????????????
          </button>
        </div>
      ) : (
        <div className="addsection">
          <form onSubmit="" className="mymainform">
            <div className="formitem">
              <div className="item">
                <label htmlFor="username">?????????????? ????????????</label>
              </div>
              <div className="item">
                <select
                  required
                  onChange={handleChangeDriver}
                  className="selectbtn loginbtn"
                  name="driverd"
                  id=""
                >
                  <option value="0">????????????</option>
                  {drivers.map(a => (
                    <option value={a._id} id={a._id}>
                      {a.lastname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="formitem">
              <div className="item">
                <label htmlFor="vehicle">?????????????? ????????????????</label>
              </div>
              <div className="item">
                <select
                  required
                  onChange={handleChangeVehicle}
                  className="selectbtn loginbtn"
                  name="vehicle"
                  id=""
                >
                  <option value="0">?????????? </option>
                  {vehicles.map(a => (
                    <option value={a._id} id={a._id}>
                      {a.sign}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="formitem">
              <div className="item">
                <label htmlFor="email">?????????????? ??????????????????</label>
              </div>
              <div className="item">
                <select
                  required
                  onChange={handleChangeDestination}
                  className="selectbtn loginbtn"
                  name="destination"
                  id=""
                >
                  <option value="0">???????????????? </option>
                  {destinations.map(a => (
                    <option value={a._id} id={a._id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="formitem">
              <div className="item">
                <button
                  type="submit"
                  onClick={handleChangeItinerary}
                  className="loginbtn"
                >
                  ????????????????
                </button>
                <span className="myspan"></span>
                <button
                  onClick={checkReturn}
                  type="submit"
                  className="loginbtn"
                >
                  ??????????
                </button>
              </div>
            </div>
          </form>
          <div className="myadds">
            <div className="adddriver">
              <div className="adddriverleft">
                <img
                  className="adddriverphoto"
                  src={myDriver.photo}
                  width="270"
                  height="270"
                  alt=""
                ></img>
              </div>

              <div className="adddriverright">
                <div>??????????????:</div>
                <div>{myDriver.lastname}</div>
                <div>??????????:</div>
                <div>{myDriver.firstname}</div>
                <div>????????????????:</div>
                <div>{myDriver.phone}</div>
              </div>
            </div>

            <div className="addvehicle">
              <div className="addvehicleall">
                <div className="addvehicletitle">
                  <div>??????????</div>
                </div>
                <div className="addvehiclecontent">
                  <div className="addvehiclecontentleft">
                    <div>??????????:</div>
                    <div>??????????:</div>
                    <div>??????????:</div>
                    <div>????????????????:</div>
                    <div>??????????????:</div>
                    <div>????????????:</div>
                  </div>
                  <div className="addvehiclecontentright">
                    <div>{myVehicle.type}</div>
                    <div>{myVehicle.brand}</div>
                    <div>{myVehicle.color}</div>
                    <div>{myVehicle.sign}</div>
                    <div>{myVehicle.fuel}</div>
                    <div>{myVehicle.fridge}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="adddestination">
              <div className="adddestinationall">
                <div className="adddestinationtitle">????????????????</div>
                <div className="adddestinationcontent">
                  <div className="destinationname">
                    <div className="destintitle1">????????????????:</div>
                    <div className="destincontent1">{myDestination.name}</div>
                  </div>
                  <div className="destinationdescription">
                    <div className="destintitle2">??????????????????:</div>
                    <div className="destincontent2">
                      {myDestination.description}
                    </div>
                  </div>
                  <div className="destinationname">
                    <div className="destintitle1">????????????????:</div>
                    <div className="destincontent1">
                      {myDestination.range} ????.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {itineraries !== [] && (
        <div className="itineraries">
          {itineraries.map(a => (
            <div className="itinerary">
              <div className="cardtitle">{a.destination}</div>
              <div className="cardphoto">
                <img
                  className="adddriverphoto"
                  src={a.driverphoto}
                  width="250"
                  height="250"
                  alt=""
                />
              </div>
              <div className="carddriver">{a.driver}</div>
              <div className="cardcar">{a.vehicle}</div>
              <div className="cardtimer">
                {Math.floor(
                  ((timer.getTime() - new Date(a.start).getTime()) %
                    (1000 * 60 * 60 * 24)) /
                    (1000 * 60 * 60)
                ) < 10
                  ? "0" +
                    Math.floor(
                      ((timer.getTime() - new Date(a.start).getTime()) %
                        (1000 * 60 * 60 * 24)) /
                        (1000 * 60 * 60)
                    )
                  : Math.floor(
                      ((timer.getTime() - new Date(a.start).getTime()) %
                        (1000 * 60 * 60 * 24)) /
                        (1000 * 60 * 60)
                    )}
                :
                {Math.floor(
                  ((timer.getTime() - new Date(a.start).getTime()) %
                    (1000 * 60 * 60)) /
                    (1000 * 60)
                ) < 10
                  ? "0" +
                    Math.floor(
                      ((timer.getTime() - new Date(a.start).getTime()) %
                        (1000 * 60 * 60)) /
                        (1000 * 60)
                    )
                  : Math.floor(
                      ((timer.getTime() - new Date(a.start).getTime()) %
                        (1000 * 60 * 60)) /
                        (1000 * 60)
                    )}
                :
                {Math.floor(
                  ((timer.getTime() - new Date(a.start).getTime()) %
                    (1000 * 60)) /
                    1000
                ) < 10
                  ? "0" +
                    Math.floor(
                      ((timer.getTime() - new Date(a.start).getTime()) %
                        (1000 * 60)) /
                        1000
                    )
                  : Math.floor(
                      ((timer.getTime() - new Date(a.start).getTime()) %
                        (1000 * 60)) /
                        1000
                    )}
              </div>
              <div className="cardbtns">
                {/* <button onClick="" className="loginbtn">
                  ????????????????
                </button>
                <span className="myspan"></span> */}
                <button onClick={stopTimer} name={a._id} className="loginbtn">
                  ??????????????????
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Main;
