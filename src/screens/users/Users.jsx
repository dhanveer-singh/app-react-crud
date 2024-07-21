import axios from "axios";
import { useEffect, useState } from "react";
import { appConstants } from "../../shared/utils/appConstants";

function Users() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await axios
      .get(`${appConstants.baseURL}user/fetchUser`)
      .then((res) => {
        let response = res.data;
        let fetchedUser = response.Result_Output;
        setUserList(fetchedUser);
        console.log("fetchedUser", fetchedUser);
      })
      .catch((error) => {
        console.log("Inside catch");
        console.error("Catch Error in Fetching Users", error);
      });
  };
  const deleteUser = async (selectedId) => {
    try {
      await axios.post(appConstants.baseURL + "user/deleteUser", {_id: selectedId}).then((res) => {
        let response = res.data;
        console.log("response", response);
      });
    } catch (error) {
      console.log("Catch in DeleteUser API", error);
    }
  };
  return (
    <>
      <table className="table table-hover table-striped table-bordered mt-5">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((arr) => {
            return (
              <tr key={arr._id}>
                <td>{arr.firstName}</td>
                <td>{arr.lastName}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteUser(arr._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Users;
