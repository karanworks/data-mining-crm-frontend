//Include Both Helper File with needed methods
import { getLogin, postLogin } from "../../../helpers/fakebackend_helper";

import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";
import axios from "axios";

export const loginUser = (user, history) => async (dispatch) => {
  try {
    let response;

    response = postLogin({
      usernameOrEmail: user.usernameOrEmail,
      password: user.password,
    });

    var data = await response;

    if (data) {
      sessionStorage.setItem("authUser", JSON.stringify(data));
      var finallogin = JSON.stringify(data);
      finallogin = JSON.parse(finallogin);
      data = finallogin.data;
      if (finallogin.status === "success") {
        dispatch(loginSuccess(data));
        history("/count-report");
      } else {
        console.log("else condition while logging in ", finallogin);
        dispatch(apiError(finallogin));
      }
    }
  } catch (error) {
    console.log("error while logging in ", error);
    dispatch(apiError(error));
  }
};

// export const loginGet = (history) => async (dispatch) => {
//   try {
//     let response;

//     response = await getLogin();

//     var data = response;

//     if (data) {
//       sessionStorage.setItem("authUser", JSON.stringify(data));
//       var finallogin = JSON.stringify(data);
//       finallogin = JSON.parse(finallogin);
//       data = finallogin.data;

//       // checking if the data doesn't have any property which means that user was not alread logged in (if user was already logged in it would have the data of the user)
//       if (Object.keys(data).length) {
//         console.log("LOGIN SUCCESS WITHOUT EMAIL AND PASSWORD");
//         dispatch(loginSuccess(data));
//         history("/count-report");
//       } else {
//         console.log("else condition while logging in ");
//         // dispatch(apiError(finallogin));
//         history("/login");
//       }
//     }
//   } catch (error) {
//     console.log("Error in login get thunk", error);
//   }
// };

export const logoutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem("authUser");

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(logoutUserSuccess(true));
        console.log("user logout", res);
      })
      .catch((err) => {
        console.log("error while logging out", err);
      });
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
