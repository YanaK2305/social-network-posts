import React, { useCallback, useState } from "react";
import searchImg from "../../assets/search.svg";
import st from "./Search.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/slices/postsReducer";
import { debounce } from "@mui/material";

export default function Search() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const memoSearch = useCallback(
    debounce((value) => {
      dispatch(setSearch(value));
    }, 500),
    []
  );
  return (
    <div className={st.root}>
      <img src={searchImg} alt="" />
      <input
        type="text"
        placeholder="Search Events here"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          memoSearch(event.target.value);
        }}
      />
    </div>
  );
}
