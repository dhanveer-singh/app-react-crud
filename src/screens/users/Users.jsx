import axios from "axios";
import { useEffect, useState } from "react";
import { appConstants } from "../../shared/utils/appConstants";

function Users() {
  let staticData = [];
  const [values, setValues] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    console.log("Inside");
    await axios
      .post(`${appConstants.baseURL}user/fetchUser`)
      .then((res) => {
        let response = res.data;
        let fetchedUser = response.result_Output;
        setValues(fetchedUser)
        console.log("fetchedUser", fetchedUser);
      })
      .catch((error) => {
        console.error("Catch Error in Fetching Users", error);
      });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">First</th>
          <th scope="col">Last</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {
            values.map()
          }
          <td>Mark</td>
          <td>Otto</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Users;
