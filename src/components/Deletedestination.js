import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Deletedestination = props => {
  const user = props.match.params.name;
  const settings = `/settings/${user}`;
  const [destinations, setDestinations] = useState([]);
  const [destination, setDestination] = useState({});

  const [checkAdd, setCheckAdd] = useState(false);

  useEffect(() => {
    const getdestinations = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_LOCAL}/destination/getall/${user}`
      );
      setDestinations(res.data);
    };
    getdestinations();
  }, []);

  const handleChangedestination = event => {
    try {
      const { name, value } = event.target;
      setDestination(prev => {
        return {
          _id: value,
        };
      });
      console.log(value);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newDestination = destination;

      const res = await axios.delete(
        `${process.env.REACT_APP_LOCAL}/destination/delete/${user}`,
        { data: { _id: newDestination._id } }
      );
      if ((res.data = "destination deleted successfully")) {
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
      <form onSubmit={handleSubmit} className="myform">
        <div className="formitem">
          <div className="item">
            <label htmlFor="username">Επιλογή διαδρομής</label>
          </div>
          <div className="item">
            <select
              required
              onChange={handleChangedestination}
              className="selectbtn loginbtn"
              name="destinationd"
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
            <button type="submit" className="loginbtn">
              Διαγραφή
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

export default Deletedestination;
