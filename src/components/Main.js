import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Navbar from "./Navbar";

const Main = props => {
  const [checkUser, setCheckUser] = useState("");
  useEffect(() => {
    const letsCheckUser = async () => {
      const myUser = {
        username: props.match.params.name,
      };
      try {
        const res = await axios.post(`${process.env.REACT_APP_LOCAL}/login`, {
          username: `${props.match.params.name}`,
          password: `${props.location.state.password}`,
        });
        setCheckUser(prev => res.data);
        console.log(checkUser);
        if (checkUser !== "ok") return <Redirect to="/login" />;
      } catch (err) {
        console.log(err);
      }
    };
    letsCheckUser();
  }, []);

  return (
    <section className="mainsection">
      <Navbar />
      <div className="mymainform">
        <form action="">
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
        </form>
      </div>
    </section>
  );
};

export default Main;
