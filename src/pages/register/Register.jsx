import { ErrorMessage, Field, Form, Formik } from "formik";
import st from "./Register.module.scss";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/userReducer";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    job: "",
    city: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "at least 3 letter")
      .required("username is required"),
    firstName: Yup.string()
      .min(3, "at least 3 letter")
      .required("firstName is required"),
    lastName: Yup.string()
      .min(3, "at least 3 letter")
      .required("lastName is required"),
    age: Yup.number().min(18, "from 18 y.o").required("age is required"),
    email: Yup.string()
      .email("enter correct email")
      .required("email is required"),
    password: Yup.string()
      .min(8, "at least 8 symbols")
      .required("password is required"),
  });
  function onSubmit(values) {
    console.log(values);
    dispatch(registerUser(values)).then(() => navigate("/login"));
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
              <Form name="letMeIn" method="post" action="register.php">
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
                    type="text"
                    name="firstName"
                    placeholder="Your firstname"
                    className={
                      errors.firstName && touched.firstName ? st.inputError : ""
                    }
                  />
                  <ErrorMessage
                    className={st.error}
                    name="firstName"
                    component={"span"}
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Your lastname"
                    className={
                      errors.lastName && touched.lastName ? st.inputError : ""
                    }
                  />
                  <ErrorMessage
                    className={st.error}
                    name="lastName"
                    component={"span"}
                  />
                </div>
                <div>
                  <Field
                    type="number"
                    name="age"
                    placeholder="Your age"
                    className={errors.age && touched.age ? st.inputError : ""}
                  />
                  <ErrorMessage
                    className={st.error}
                    name="age"
                    component={"span"}
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Your mail"
                    className={
                      errors.email && touched.email ? st.inputError : ""
                    }
                  />
                  <ErrorMessage
                    className={st.error}
                    name="email"
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
                <div>
                  <Field type="text" name="job" placeholder="Your profession" />
                </div>
                <div>
                  <Field type="text" name="city" placeholder="Your city" />
                </div>
                <div className={st.btn}>
                  <button
                    type="submit"
                    className={!(dirty && isValid) ? st.buttonError : ""}
                  >
                    Enter
                  </button>
                  <p className={st.login}>
                    Already have an account? <Link to="/login">Enter</Link>
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
