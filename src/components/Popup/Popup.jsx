import React, { useState } from "react";
import st from "./Popup.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import smile from "../../assets/smile.svg";
import pocket from "../../assets/pocket.svg";
import more from "../../assets/more.svg";
import { createPost } from "../../redux/slices/postsReducer";

export default function Popup({ onClose }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  function onSubmit() {
    dispatch(createPost({ userId: user.id, title: text })).then(() => {
      onClose();
    });
  }
  return (
    <div className={st.root}>
      <div className={st.profileTop}>
        <div className={st.profileRow}>
          <Link to="/profile">
            <img className={st.profile} src={user?.image} alt="" />
          </Link>
          <h1 className={st.name}>
            {user?.firstName} {user?.lastName}
          </h1>
        </div>
        <button onClick={onClose}>X</button>
      </div>
      <h2 className={st.title}>What do you want to talk about?</h2>
      <textarea
        className={st.area}
        value={text}
        onChange={(event) => setText(event.target.value)}
      ></textarea>
      <div className={st.reaction}>
        <img src={smile} alt="" />
        <img src={pocket} alt="" />
        <img src={more} alt="" />
      </div>
      <button className={st.btn} onClick={onSubmit}>
        Post
      </button>
    </div>
  );
}
