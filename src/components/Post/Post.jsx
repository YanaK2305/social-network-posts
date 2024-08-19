import { useDispatch } from "react-redux";
import st from "./Post.module.scss";
import React, { useEffect, useState } from "react";
import { getSingleUser } from "../../redux/slices/userReducer";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import likes from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import message from "../../assets/message.svg";
import glaz from "../../assets/Glazsvgpng.ru_.svg";

export default function Post({ item }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  useEffect(() => {
    dispatch(getSingleUser(item.userId)).then((data) => {
      setUser(data.payload);
    });
  }, []);
  return (
    <div className={st.root}>
      <Link to={`/profile/${item.userId}`} className={st.user}>
        <img className={st.imguser} src={user.image} alt="" />{" "}
        <h5 className={st.username}>{user.username}</h5>
      </Link>

      <h4 className={st.title}>{item.title}</h4>
      <p className={st.body}>{item.body}</p>
      <div className={st.reaction}>
        <img className={st.visual} src={likes} alt="" />
        {item.reactions.likes}
        <img className={st.visual} src={dislike} alt="" />
        {item.reactions.dislikes}
        <div className={st.tags}>
          {item.tags.map((item) => (
            <div className={st.tag} key={item}>
              <img className={st.visual} src={message} alt="" />
              {item}
            </div>
          ))}
        </div>

        <img className={st.visual} src={glaz} alt="" />
        {item.views}
      </div>
    </div>
  );
}
