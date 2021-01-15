import { useState } from "react";
import facade from "./apiFacade.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouteMatch, BrowserRouter as Router } from "react-router-dom";
import AddEditUser from "./AddEditUser.js";
function User() {
  const userObjList = [
    {
      userName: "",
      userPass: "",
      fName: "",
      lName: "",
      street: "",
      hobby: [{ name: "" }],
      phone: "",
      zip: "",
      city: "",
    },
  ];
   



  let pik = "pik";

  const allZipsList = [];
  const [users, setUsers] = useState(userObjList);
  const [input, setInput] = useState("");
  const [allZips, setAllZips] = useState(allZipsList);
  const [count, setCount] = useState({ count: "" });

  const { url } = useRouteMatch();

  const onChange = (evt) => {
    setInput(evt.target.value);
  };

  const fetchUserByPhone = (evt) => {
    evt.preventDefault();
    facade.fetchUserByPhone(input).then((data) => {
      setUsers([data]);
    });
  };

  const fetchUserByHobby = (evt) => {
    evt.preventDefault();
    facade.fetchUsersByHobby(input).then((data) => {
      setUsers(data);
      facade.fetchCountByHobby(input).then((data) => {
        setCount(data);
      });
    });
  };

  const fetchUsersByCity = (evt) => {
    evt.preventDefault();
    facade.fetchUsersByCity(input).then((data) => {
      setUsers(data);
    });
  };

  const fetchAllZips = (evt) => {
    evt.preventDefault();
    facade.fetchAllZips().then((data) => {
      setAllZips(data);
    });
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>Street</th>
            <th>City</th>
            <th>Zip</th>
            <th>Hobbies</th>
          </tr>
          {users.map((user) => (
            <tr key={user.userName}>
              <td>{user.fName}</td>
              <td>{user.lName}</td>
              <td>{user.phone}</td>
              <td>{user.street}</td>
              <td>{user.city}</td>
              <td>{user.zip}</td>
              <td>{user.hobby.map((hobby) => hobby.name).join(",")}</td>
            </tr>
          ))}
        </thead>
        <tbody>{/*Add the rows here */}</tbody>
      </table>

      <div className="row">
        <div className="col-3">
          <h2>Get user by phone</h2>
          <form onChange={onChange}>
            <input placeholder="Enter phone" id="phone" />
            <button onClick={fetchUserByPhone}>Click</button>
          </form>
        </div>

        <div className="col-3">
          <h2>Get users by hobby</h2>

          <form onChange={onChange}>
            <input placeholder="Enter phone" id="phone" />
            <button onClick={fetchUserByHobby}>Click</button>
          </form>
          <p>
            {"Amount of people with given hobby: " +
              count.count +
              "her kommer url:" +
              url}
          </p>
          <br></br>
        </div>

        <div className="col-3">
          <h2>Get users by city</h2>
          <form onChange={onChange}>
            <input placeholder="Enter phone" id="phone" />
            <button onClick={fetchUsersByCity}>Click</button>
          </form>
        </div>
      </div>

      <br></br>
      <div className="row">
        <div className="col-3">
          <h2>See all Zip-codes</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Zip</th>
              </tr>
            </thead>
            <tbody>
              {allZips.map((zip) => (
                <tr key={zip}>
                  <td>{zip}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={fetchAllZips}>Click</button>
        </div>
      </div>
      <Router>
        <AddEditUser pik={pik}/>
      </Router>
    </div>
  );
}

export default User;
