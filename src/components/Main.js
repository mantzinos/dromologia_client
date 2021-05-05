import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Navbar from "./Navbar";

const Main = props => {
  const [checkUser, setCheckUser] = useState("");
  const [myDriver, setMyDriver] = useState({});

  useEffect(() => {
    const letsCheckUser = async () => {
      //   const myUser = {
      //     username: props.match.params.name,
      //   };
      //   try {
      //     const res = await axios.post(`${process.env.REACT_APP_LOCAL}/login`, {
      //       username: `${props.match.params.name}`,
      //       password: `${props.location.state.password}`,
      //     });
      //     setCheckUser(prev => res.data);
      //     console.log(checkUser);
      //     if (checkUser !== "ok") return <Redirect to="/login" />;
      //   } catch (err) {
      //     console.log(err);
      //   }
      const myUser = props.match.params.name;
      //   console.log(myUser);
      setCheckUser(prev => myUser);
    };
    letsCheckUser();
  }, []);

  const handleChange = async event => {
    const { name, value } = event.target;
    console.log("name", name, "value", value);
    const driver = await axios.get(
      `${process.env.REACT_APP_LOCAL}/driver/get/${value}`
    );
    console.log(driver.data);
    setMyDriver(prev => driver.data);
    console.log(myDriver);
  };

  return (
    // <section className="mainsection">
    //   <Navbar />
    //   <div className="mymainform">
    //     <form action="">
    //       <select className="selectbtn loginbtn" name="driver" id="">
    //         <option className="" value="0">
    //           ena
    //         </option>
    //         <option className="rooti" value="1">
    //           dyo
    //         </option>
    //         <option value="2">tria</option>
    //         <option value="3">tessera</option>
    //         <option value="4">pente</option>
    //       </select>
    //     </form>
    //   </div>
    // </section>
    <section className="mainsection">
      <Navbar />
      <div className="addsection">
        <form className="mymainform">
          <div className="formitem">
            <div className="item">
              <label htmlFor="username">Επιλογή οδηγού</label>
            </div>
            <div className="item">
              <select
                onChange={handleChange}
                className="selectbtn loginbtn"
                name="driver"
                id=""
              >
                <option value="ipiastona">ipiastona</option>
                <option value="ipisastona">ipisastona</option>
                <option value="2">tria</option>
                <option value="3">tessera</option>
                <option value="4">pente</option>
              </select>
            </div>
          </div>
          <div className="formitem">
            <div className="item">
              <label htmlFor="password">Επιλογή οχήματος</label>
            </div>
            <div className="item">
              <select className="selectbtn loginbtn" name="driver" id="">
                <option className="" value="0">
                  ena
                </option>
                <option className="rooti" value="1">
                  dyo
                </option>
                <option value="2">tria</option>
                <option value="3">tessera</option>
                <option value="4">pente</option>
              </select>
            </div>
          </div>
          <div className="formitem">
            <div className="item">
              <label htmlFor="email">Επιλογή δρομολογίου</label>
            </div>
            <div className="item">
              <select className="selectbtn loginbtn" name="driver" id="">
                <option className="" value="0">
                  ena
                </option>
                <option className="rooti" value="1">
                  dyo
                </option>
                <option value="2">tria</option>
                <option value="3">tessera</option>
                <option value="4">pente</option>
              </select>{" "}
            </div>
          </div>
          <div className="formitem">
            <div className="item">
              <button type="submit" className="loginbtn">
                Εισαγωγή
              </button>
            </div>
          </div>
        </form>
        <div className="myadds">
          <div className="adddriver">
            <h2>{myDriver.firstname}</h2>
            <h2>{myDriver.lastname}</h2>
            <img src={myDriver.photo} width="200" height="200"></img>
          </div>
          <div className="addvehicle"></div>
          <div className="additinerary"></div>
        </div>
      </div>
    </section>
  );
};

export default Main;
