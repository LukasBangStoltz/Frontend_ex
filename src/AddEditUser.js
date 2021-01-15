import { useState } from "react";
import facade from "./apiFacade.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouteMatch, BrowserRouter as Router } from "react-router-dom";

function AddEditUser({ pik }) {
  const userObj = {
    userName: "",
    userPass: "",
    fName: "",
    lName: "",
    street: "",
    hobby: "",
    phone: "",
    zip: "",
    city: "",
  };

  const [user, setUser] = useState(userObj);

  const onChange = (evt) => {
    evt.preventDefault();
    setUser({ ...user, [evt.target.id]: evt.target.value });
    console.log(user)
  };
  const saveUser = (evt) => {
    evt.preventDefault();
    facade.createUser(user);
  };

  return (
    <div>
      <p>Stor fed test: {pik}</p>
      <form className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-3"></label>
          <div className="col-sm-9">
            <input className="form-control" readOnly id="id" />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="fName">
            User Name:
          </label>
          <div className="col-sm-9">
            <input className="form-control" id="userName" onChange={onChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="lName">
            Password:
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="userPass"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="phone">
            First Name:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="fName"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="street">
            Last Name:
          </label>
          <div className="col-sm-9">
            <input className="form-control" id="lName" onChange={onChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="zip">
            Phone Number:
          </label>
          <div className="col-sm-9">
            <input className="form-control" id="phone" onChange={onChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="zip">
            Street:
          </label>
          <div className="col-sm-9">
            <input className="form-control" id="street" onChange={onChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="zip">
            Zip:
          </label>
          <div className="col-sm-9">
            <input className="form-control" id="zip" onChange={onChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="zip">
            City:
          </label>
          <div className="col-sm-9">
            <input className="form-control" id="city" onChange={onChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="zip">
            Hobby:
          </label>
          <div className="col-sm-9">
            <input className="form-control" id="hobby" onChange={onChange} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button
              onClick={saveUser}
              type="submit"
              className="btn btn-primary"
            >
              Create User
            </button>
            <button type="button" className="btn btn-dark">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEditUser;
