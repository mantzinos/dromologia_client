import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Adddriver = props => {
  const user = props.match.params.name;
  const settings = `/settings/${user}`;
  const [file, setFile] = useState("");
  const [photo, setPhoto] = useState("");
  const [driver, setDriver] = useState({});
  console.log(REACT_APP_PHOTO);
  console.log(REACT_APP_LOCAL);
  const [checkAdd, setCheckAdd] = useState(false);

  const fileHandler = event => {
    const photo = event.target.files[0];
    setFile(prev => photo);
  };
  const uploadHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "drivers");
      const pic = await axios.post(`${REACT_APP_PHOTO}`, formData);
      setPhoto(prev => pic.data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setDriver(prev => {
      return {
        ...prev,
        [name]: value,
        photo,
      };
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "drivers");
      const pic = await axios.post(`${REACT_APP_PHOTO}`, formData);
      console.log(pic.data.url);
      const newDriver = driver;
      newDriver.photo = pic.data.url;
      const res = await axios.post(
        `${REACT_APP_LOCAL}/driver/add/${user}`,
        newDriver
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
            <label htmlFor="lastname">Επώνυμο</label>
          </div>
          <div className="item">
            <input
              className="inputtext"
              required
              onChange={handleChange}
              name="lastname"
              type="text"
              minLength="3"
              maxLength="12"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="firstname">Όνομα</label>
          </div>
          <div className="item">
            <input
              className="inputtext"
              required
              onChange={handleChange}
              name="firstname"
              type="text"
              minLength="3"
              maxLength="12"
            />
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <label htmlFor="phone">Τηλέφωνο</label>
          </div>
          <div className="item">
            <input
              min="10"
              max="10"
              className="inputtext"
              required
              onChange={handleChange}
              name="phone"
              type="text"
            />
          </div>
        </div>
        <div className="formitem formitemphoto">
          <div className="item">
            <label htmlFor="photo">Φωτογραφία</label>
          </div>
          <div className="item">
            <div className="itemphoto">
              <input
                className="itemphoto"
                required
                onChange={fileHandler}
                name="photo"
                type="file"
              />
            </div>
          </div>
        </div>
        <div className="formitem">
          <div className="item">
            <button type="submit" className="loginbtn">
              Εισαγωγή
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

export default Adddriver;
