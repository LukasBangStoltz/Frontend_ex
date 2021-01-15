import { URL } from "./settings.js";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;

    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const getRole = () => {
    let myToken = getToken();
    let tokenData = myToken.split(".")[1];
    let decoedeJsonData = window.atob(tokenData);
    let decodedJwtData = JSON.parse(decoedeJsonData);
    let role = decodedJwtData.roles;
    console.log(role);

    return role;
  };

  const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token

    let role = getRole();

    return fetch(URL + "/api/users/" + role, options).then(handleHttpErrors);
  };


  const fetchCatFacts = () => {
    const options = makeOptions("GET");

    return fetch(URL + "/api/users/catfacts/", options).then(handleHttpErrors);
  }
  

  const fetchUserByPhone = (phone) => {
    const options = makeOptions("GET");

    return fetch(URL + "/api/users/phonenumber/" + phone, options).then(
      handleHttpErrors
    );
  };

  const fetchUsersByHobby = (hobby) => {
    const options = makeOptions("GET");

    return fetch(URL + "/api/users/hobby/" + hobby, options).then(handleHttpErrors);
  };

  const fetchCountByHobby = (hobby) => {
    const options = makeOptions("GET");

    return fetch(URL + "/api/users/hobbycount/" + hobby, options).then(handleHttpErrors);
  };

  const fetchUsersByCity = (city) => {
    const options = makeOptions("GET");

    return fetch(URL + "/api/users/city/" + city, options).then(handleHttpErrors);
  };

  const fetchAllZips = () => {
    const options = makeOptions("GET");

    return fetch(URL + "/api/users/allzips/", options).then(handleHttpErrors);
  };

  const createUser = (user) => {
    const options = makeOptions("POST", true, {
      userName: user.userName,
      userPass: user.userPass,
      fName: user.fName, 
      lName: user.lName,
      phone: user.phone,
      street: user.street,
      zip: user.zip,
      city: user.city,
      hobby: [{name: user.hobby}]
    })
    return fetch(URL + "/api/users/createUser/", options).then(handleHttpErrors);
  }

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getRole,
    fetchUserByPhone,
    fetchUsersByHobby,
    fetchCountByHobby, 
    fetchUsersByCity,
    fetchAllZips,
    fetchCatFacts,
    createUser
  };
}

const facade = apiFacade();
export default facade;
