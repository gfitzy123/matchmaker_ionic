import "./signUpPageStyles.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { regex } from "../../utils/regex";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import tierLogo from "../../assets/images/logoAI.png";
import { ToastContainer, toast } from "react-toastify";
import { getUserDetail } from "../../actions/userActions";
import { signUp } from "../../actions/socialLogin";
import { LOGIN } from "../../store/actions/types";
import { useHistory } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";

export default function SignupPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const auth = getAuth();

    if (!email) {
      toast("Email Required");
    } else if (!regex.validateEmail(email)) {
      toast("Invalid Email");
    } else if (!password) {
      toast("Passsword Required");
    } else {
      signUp(email, password)
        .then(async (userCredential) => {
          // const user = userCredential.user;
          sendEmailVerification(auth.currentUser)
            .then((response) => {
              localStorage.setItem("user", null);
              // window.location.reload(false);
              toast("Please check you email for verification");
              console.log("email_Verifiy_response----", response);
              // setTimeout(() => {
              //   document.location.reload();
              // }, 10000);
            })
            .catch((error) => {
              console.log("email_verification_error---", error);
            });
          // emailVerification();
          // toast("SignUp Succesfully");
          // let uid = user.uid.toString();
          // await setDoc(doc(db, "Users", uid), {
          //   uid: user.uid,
          //   email: regex.isEmpty(user.email) ? "" : user.email,
          //   accessToken: user.accessToken,
          // });
          // navigate("/IdentityVerification", {
          //   state: {
          //     email: user?.email,
          //     uid: user?.uid,
          //   },
          // });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorMessage) {
            if (errorCode === "auth/email-already-in-use") {
              toast("User Already Exist!");
            } else {
              toast("Signup Failed");
            }
          }
        });
    }
  };

  const getCurrentUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (user.emailVerified === true) {
          updateUserProfile(user);
        }
      } else {
        console.log("User is signed out---");
      }
    });
  };

  const updateUserProfile = async (user) => {
    let uid = user.uid.toString();
    await setDoc(doc(db, "Users", uid), {
      uid: user.uid,
      email: regex.isEmpty(user.email) ? "" : user.email,
      accessToken: user.accessToken,
    });
    navigate("/IdentityVerification", {
      state: {
        email: user?.email,
        uid: user?.uid,
      },
    });
  };

  const emailVerification = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
      .then((response) => {
        toast("Please check you email for verification");
        // setTimeout(() => {
        //   document.location.reload();
        // }, 10000);
      })
      .catch((error) => {
        console.log("email_verification_error---", error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={styles.container}>
        <div style={styles.loginCard}>
          <span style={styles.txtLogin}>Sign Up</span>
          <input
            style={styles.emailInput}
            type="text"
            placeholder="Email "
            className="input-email"
            value={email}
            onChange={handleEmail}
          />
          <input
            style={styles.passwordInput}
            type="password"
            placeholder="Passwrod "
            className="input-password"
            value={password}
            onChange={handlePassword}
          />
          <button className="btn-signup" onClick={handleSubmit}>
            Signup
          </button>
          <button className="btn-login" onClick={() => navigate("/LoginPage")}>
            Login
          </button>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"#93999e33"}
        />
      </div>
    </Container>
  );
}

const styles = {
  container: {
    display: "block",
    alignItems: "flex-center",
    justifyContent: "flex-center",
    height: "100%",
    marginTop: "200px",
  },
  tierLogo: {
    position: "absolute",
    left: "56px",
    top: "48px",
    width: "300px",
    height: "40px",
  },
  loginCard: {
    alignItems: "center",
    padding: "64px 48px",
    gap: "24px",
    width: "465px",
    height: "487px",
    backgroundColor: "#525d6466",
    border: "1px solid #FFFFFF",
    borderRadius: "24px",
    boxShadow:
      "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
  },
  txtLogin: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "32px",
    lineHeight: "133.4%",
    letterSpacing: "0.0125em",
    color: "#ffffff",
    marginTop: "50px",
    marginLeft: "10px",
  },
  emailInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px",
    gap: "3px",
    width: "90%",
    height: "56px",
    justifyContent: "center",
    backgroundColor: "#525d6466",
    borderRadius: "4px",
    padding: "0 20px 0 20px",
    color: "#fff",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
    marginTop: "50px",
  },
  passwordInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px",
    gap: "3px",
    width: "90%",
    height: "56px",
    justifyContent: "center",
    backgroundColor: "#525d6466",
    borderRadius: "4px",
    padding: "0 20px 0 20px",
    color: "#fff",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
    marginTop: "20px",
  },
  btnLogin: {
    width: "90%",
  },
};
