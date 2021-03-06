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
  }, []);

  const addDriver = `/adddriver/${user}`;
  const updateDriver = `/updatedriver/${user}`;
  const deleteDriver = `/deletedriver/${user}`;
  const addDestination = `/adddestination/${user}`;
  const updateDestination = `/updatedestination/${user}`;
  const deleteDestination = `/deletedestination/${user}`;
  const addVehicle = `/addvehicle/${user}`;
  const updateVehicle = `/updatevehicle/${user}`;
  const deleteVehicle = `/deletevehicle/${user}`;
  const updateUserpass = `/updateuser/${user}`;
  const deleteUser = `/deleteuser/${user}`;

  return (
    <section className="mainsection">
      <Navbar2 user={user} key={user} />
      <div className="itineraries">
        <div className="usersettings">
          <div className="settingsinsideleft">
            <div className="settingsinside">
              <div className="settingscontent">
                Επεξεργασία λογαριασμού χρήστη
              </div>
              <div className="settingscontent">
                Αλλαγή στοιχείων
                <Link to={updateUserpass} className="loginbtn">
                  Προχώρησε
                </Link>
              </div>

              <div className="settingscontent">
                Διαγραφή χρήστη{" "}
                <Link to={deleteUser} className="loginbtn">
                  Προχώρησε
                </Link>
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
                <Link to={updateVehicle} className="loginbtn">
                  Προχώρησε
                </Link>
              </div>
              <div className="settingscontent">
                Διαγραφή οχήματος{" "}
                <Link to={deleteVehicle} className="loginbtn">
                  Προχώρησε
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
