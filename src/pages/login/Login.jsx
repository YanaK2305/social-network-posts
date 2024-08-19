import { ErrorMessage, Field, Form, Formik } from "formik";
import st from "./Login.module.scss";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/userReducer";
import { setAccessToken } from "../../axiosinstance";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string()
      .min(8, "at least 8 symbols")
      .required("password is required"),
  });
  function onSubmit(values) {
    console.log(values);
    dispatch(loginUser(values)).then((data) => {
      console.log(data);
      setAccessToken(data.payload.token);
      navigate("/");
    });
  }
  return (
    <div className={st.root}>
      <div className={st.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, isValid, dirty }) => {
            return (
              <Form name="letMeIn" method="post" action="login.php">
                <div>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Your username"
                    className={
                      errors.username && touched.username ? st.inputError : ""
                    }
                  />
                  <ErrorMessage
                    className={st.error}
                    name="username"
                    component={"span"}
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={
                      errors.password && touched.password ? st.inputError : ""
                    }
                  />
                  <ErrorMessage
                    className={st.error}
                    name="password"
                    component={"span"}
                  />
                </div>
                <div className={st.btn}>
                  <button
                    type="submit"
                    className={!(dirty && isValid) ? st.buttonError : ""}
                  >
                    Enter
                  </button>
                  <p className={st.login}>
                    Don`t have an account yet?{" "}
                    <Link to="/register">Registration</Link>
                  </p>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
