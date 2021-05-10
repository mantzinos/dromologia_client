import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Updatedestination = props => {
  const user = props.match.params.name;
  const settings = `/settings/${user}`;
  const [destination, setdestination] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [checkAdd, setCheckAdd] = useState(false);

  useEffect(() => {
    const getDestinations = async () => {
      const res = await axios.get(
        `${REACT_APP_LOCAL}/destination/getall/${user}`
      );
      setDestinations(res.data);
    };
    getDestinations();
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;

    setdestination(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleChangeDestination = event => {
    const { name, value } = event.target;
    setdestination(prev => {
      return {
        ...prev,
        _id: value,
      };
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newDestination = destination;
      const res = await axios.put(
        `${REACT_APP_LOCAL}/destination/update/${user}`,
        newDestination
      );
      if (res.data) {
        setCheckAdd(prev => true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (checkAdd) {
    return <Redirect to={settings} />;
  }
  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="myform3">
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Επιλογή διαδρομής</label>
          </div>
          <div className="item">
            <select
              onChange={handleChangeDestination}
              className="selectbtn loginbtn"
              name="diadromid"
              id=""
            >
              <option value="0">Διαδρομή</option>
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
            <label htmlFor="name">Ονομασία</label>
          </div>
          <div className="item">
            <input
              className="inputtext"
              onChange={handleChange}
              name="name"
              type="text"
              minLength="3"
              maxLength="12"
            />
          </div>
        </div>
        <div className="formitem3">
          <div className="item">
            <label htmlFor="description">Περιγραφή</label>
          </div>
          <div className="">
            <textarea
              className="inputtext inputtextarea"
              onChange={handleChange}
              name="description"
              type="text"
              cols="25"
              rows="6"
              minlength="3"
              maxlength="60"
            ></textarea>
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="range">Απόσταση</label>
          </div>
          <div className="item">
            <input
              className="inputtext"
              onChange={handleChange}
              name="range"
              type="text"
              minLength="1"
              maxLength="12"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <button type="submit" className="loginbtn">
              Αλλαγή
            </button>
            <span className="myspan"> </span>
            <Link to={settings} className="loginbtn">
              Άκυρο
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Updatedestination;
