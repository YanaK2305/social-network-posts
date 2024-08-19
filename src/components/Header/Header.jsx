import st from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo 1.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserMe } from "../../redux/slices/userReducer";
import search from "../../assets/search.svg";
import flag from "../../assets/flag.svg";
import notification from "../../assets/notification.svg";

export default function Header({ toggleSearch }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  useEffect(() => {
    dispatch(getUserMe());
  }, []);
  return (
    <header className={st.root}>
      <div className={st.container}>
        <Link to="/">
          <img className={st.logo} src={logo} alt="" />
        </Link>
        <div className={st.headertop}>
          <Link to="/">Home</Link>
          <Link>Network</Link>
          <Link>Events</Link>
        </div>
        <div className={st.rightheader}>
          {location.pathname === "/" && (
            <button className={st.headerButton} onClick={toggleSearch}>
              <img src={search} alt="" />
            </button>
          )}
          <Link>
            <img src={flag} alt="" />
          </Link>
          <Link>
            <img src={notification} alt="" />
          </Link>
          <Link to="/profile">
            <img className={st.profile} src={user?.image} alt="" />
          </Link>
        </div>
      </div>
    </header>
  );
}
