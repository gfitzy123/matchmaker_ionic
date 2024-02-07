import "./finalPageStyles.css";
import React from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../store/actions/types";
import { getUserDetail } from "../../actions/userActions";
import { useLocation, useHistory } from "react-router-dom";

const FinalPage = () => {
  const history = useHistory();
  let { state } = useLocation();
  const dispatch = useDispatch();
  const btnSearch = () => {
    const id = state?.uid;

    getUserDetail(id)
      .then((response) => {
        let userData = response.data;
        dispatch({
          type: LOGIN,
          payload: { userData },
        });
        localStorage.setItem("user", JSON.stringify(userData));
        history.push("/");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("Error---", err);
      });
  };
  return (
    <div className="wrapper">
      <span className="txt-header">Here's how it works</span>
      <button onClick={() => btnSearch()} className="btn-submit">
        Let's try a search
      </button>
    </div>
  );
};

export default FinalPage;
