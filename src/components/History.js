import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const History = props => {
  const [itineraries, setItineraries] = useState([]);
  const [user, setUser] = useState("");
  const [links, setLinks] = useState({});
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  useEffect(() => {
    const user1 = props.match.params.name;
    setUser(user1);

    setLinks(prev => {
      return {
        main: `/main/${user1}`,
        settings: `/settings/${user1}`,
      };
    });
    const getItineraries = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_LOCAL}/itinerary/getall/${user1}`
        );
        setItineraries(res.data.filter(a => a.stop));
      } catch (err) {
        console.log(err);
      }
    };
    console.log(user);
    getItineraries();
  }, []);

  return (
    <section className="mainsection">
      <div className="mynavbar">
        <div className="navtitle">Δρομολόγια</div>
        <div className="navbuttons">
          <div className="navbtnmain">
            <Link className="loginbtn" to={links.main}>
              Αρχική
            </Link>
          </div>
          <div className="navbtnmain">
            <Link className="loginbtn" to={links.settings}>
              Ρυθμίσεις
            </Link>
          </div>
          <div className="navbtnmain">
            <Link className="loginbtn" to="/">
              Έξοδος
            </Link>
          </div>
        </div>
      </div>
      <table>
        <tr>
          <th>Ημερομηνία</th>
          <th>Διαδρομή</th>
          <th>Οδηγός</th>
          <th>Όχημα</th>
          <th>Εκκίνηση</th>
          <th>Επιστροφή</th>
        </tr>
        <tbody>
          {itineraries.reverse().map(a => (
            <tr key={a._id}>
              <td>{new Date(a.start).toLocaleDateString("el-GR", options)}</td>
              <td>{a.destination}</td>
              <td>{a.driver}</td>
              <td>{a.vehicle}</td>

              <td>
                {new Date(a.start).getHours().toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                }) +
                  ":" +
                  new Date(a.start).getMinutes().toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
              </td>
              <td>
                {new Date(a.stop).getHours().toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                }) +
                  ":" +
                  new Date(a.stop).getMinutes().toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </section>
  );
};

export default History;
