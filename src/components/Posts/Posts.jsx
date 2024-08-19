import { useDispatch, useSelector } from "react-redux";
import st from "./Posts.module.scss";

import React from "react";
import Post from "../Post/Post";
import { Pagination } from "@mui/material";
import { setPage } from "../../redux/slices/postsReducer";

export default function Posts() {
  const { posts, loading, error, page, totalPosts, search } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  const maxPage = Math.ceil(totalPosts / 10);
  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };
  // Фильтрация на Фронте
  // const filterPosts = posts.filter(
  //   (item) =>
  //     item.title.toLowerCase().includes(search.toLowerCase()) ||
  //     item.body.toLowerCase().includes(search.toLowerCase())
  // );
  return (
    <div className={st.root}>
      {posts.map((item) => {
        return <Post item={item} key={item.id} />;
      })}
      <Pagination count={maxPage} page={page} onChange={handleChange} />
    </div>
  );
}
