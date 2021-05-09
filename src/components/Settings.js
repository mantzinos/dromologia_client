import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Addvehicle from "./Addvehicle";
import Navbar2 from "./Navbar2";
import Updatedriver from "./Updatedriver";

const Settings = props => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const user1 = props.match.params.name;
    setUser(prev => user1);
    console.log(user, "*****");
  }, []);

  const addDriver = `/adddriver/${user}`;
  const updateDriver = `/updatedriver/${user}`;
  const deleteDriver = `/deletedriver/${user}`;
  const addDestination = `/adddestination/${user}`;
  const updateDestination = `/updatedestination/${user}`;
  const deleteDestination = `/deletedestination/${user}`;
  const addVehicle = `/addvehicle/${user}`;

  const handleSubmit = event => {};

  const handleChange = event => {};
  return (
    <section className="mainsection">
      <Navbar2 user={user} key={user} />
      <div className="itineraries">
        <div className="usersettings">
          <div className="settingsinsideleft">
            <div className="settingsinside">
              <div className="settingscontent">Επεξεργασία χρήστη</div>
              <div className="settingscontent">
                Αλλαγή κωδικού{" "}
                <Link to="" className="loginbtn">
                  Προχώρησε
                </Link>
              </div>
              <div className="settingscontent">
                <div className="leftone">Αλλαγή email</div>
                <button className="loginbtn">Προχώρησε</button>
              </div>
              <div className="settingscontent">
                Διαγραφή χρήστη <button className="loginbtn">Προχώρησε</button>
              </div>
            </div>
            <div className="settingsinside">
              <div className="settingscontent">Επεξεργασία διαδρομής</div>
              <div className="settingscontent">
                Εισαγωγή διαδρομής{" "}
                <Link to={addDestination} className="loginbtn">
                  Προχώρησε
                </Link>
              </div>
              <div className="settingscontent">
                Αλλαγή στοιχείων{" "}
                <Link to={updateDestination} className="loginbtn">
                  Προχώρησε
                </Link>
              </div>
              <div className="settingscontent">
                Διαγραφή διαδρομής{" "}
                <Link to={deleteDestination} className="loginbtn">
                  Προχώρησε
                </Link>
              </div>
            </div>
          </div>
          <div className="settingsinsideright">
            <div className="settingsinside">
              <div className="settingscontent">Επεξεργασία οδηγού</div>
              <div className="settingscontent">
                Εισαγωγή οδηγού{" "}
                <Link to={addDriver} className="loginbtn">
                  Προχώρησε
                </Link>
              </div>
              <div className="settingscontent">
                Αλλαγή στοιχείων{" "}
                <Link to={updateDriver} className="loginbtn">
                  Προχώρησε
                </Link>
              </div>
              <div className="settingscontent">
                Διαγραφή οδηγού{" "}
                <Link to={deleteDriver} className="loginbtn">
                  Προχώρησε
                </Link>
              </div>
            </div>
            <div className="settingsinside">
              <div className="settingscontent">Επεξεργασία οχήματος</div>
              <div className="settingscontent">
                <div className="leftone">Εισαγωγή οχήματος </div>
                <Link to={addVehicle} className="loginbtn">
                  Προχώρησε
                </Link>
              </div>
              <div className="settingscontent">
                <div className="leftone">Αλλαγή στοιχείων</div>
                <button className="loginbtn">Προχώρησε</button>
              </div>
              <div className="settingscontent">
                Διαγραφή οχήματος{" "}
                <button className="loginbtn">Προχώρησε</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
