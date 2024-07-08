import { useState } from "react";
import axios from "axios";
import { appConstants } from "./shared/utils/appConstants";
import Users from "./screens/users/Users";

function App() {
  let id = undefined;
  const [mendatFlag, setMendatFlag] = useState(false);
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const handleChange = (name) => (event) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };
  const submitFormData = async () => {
    const { firstName, lastName } = formData;
    try {
      if (firstName.toString().trim() === "") {
        setFirstNameErr(true);
        setMendatFlag(true);
      } else setFirstNameErr(false);
      if (lastName.toString().trim() == "") {
        setLastNameErr(true);
        setMendatFlag(true);
      } else setLastNameErr(false);
      if (mendatFlag) {
        return;
      }
      if (id === undefined) {
        await axios
          .post(`${appConstants.baseURL}user/addNewUser`, formData)
          .then((res) => {
            let response = res.data;
            console.log("response", response);
          })
          .catch((error) => {
            console.error("Error in addNewUser", error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center pt-5 mt-5">
          <div className="col-12 col-sm-6">
            <div className="card">
              <h5 className="card-header">User Registration Form</h5>
              <div className="card-body py-4">
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      pattern="^[A-Za-z]+$"
                      value={formData.firstName}
                      onChange={handleChange("firstName")}
                      placeholder="Enter Name"
                    />
                    {firstNameErr && (
                      <label className="text-danger">
                        Please Enter First Name
                      </label>
                    )}
                  </div>
                  <div className="col-12 col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange("lastName")}
                      placeholder="Enter Name"
                    />
                    {lastNameErr && (
                      <label className="text-danger">
                        Please Enter Last Name
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  onClick={submitFormData}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Users/>
    </>
  );
}

export default App;
