import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar2 from "./Navbar2";

const Settings = props => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const user1 = props.match.params.name;
    setUser(prev => user1);
    console.log(user, "*****");
  }, []);

  const addDriver = `/adddriver/${user}`;

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
                Αλλαγή email <button className="loginbtn">Προχώρησε</button>
              </div>
              <div className="settingscontent">
                Διαγραφή χρήστη <button className="loginbtn">Προχώρησε</button>
              </div>
            </div>
            <div className="settingsinside">
              <div className="settingscontent">Επεξεργασία διαδρομής</div>
              <div className="settingscontent">
                Εισαγωγή διαδρομής{" "}
                <button className="loginbtn">Προχώρησε</button>
              </div>
              <div className="settingscontent">
                Αλλαγή στοιχείων <button className="loginbtn">Προχώρησε</button>
              </div>
              <div className="settingscontent">
                Διαγραφή διαδρομής{" "}
                <button className="loginbtn">Προχώρησε</button>
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
                Αλλαγή στοιχείων <button className="loginbtn">Προχώρησε</button>
              </div>
              <div className="settingscontent">
                Διαγραφή οδηγού <button className="loginbtn">Προχώρησε</button>
              </div>
            </div>
            <div className="settingsinside">
              <div className="settingscontent">Επεξεργασία οχήματος</div>
              <div className="settingscontent">
                Εισαγωγή οχήματος{" "}
                <button className="loginbtn">Προχώρησε</button>
              </div>
              <div className="settingscontent">
                Αλλαγή στοιχείων <button className="loginbtn">Προχώρησε</button>
              </div>
              <div className="settingscontent">
                Διαγραφή οδηγού <button className="loginbtn">Προχώρησε</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
