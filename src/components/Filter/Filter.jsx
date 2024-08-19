import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../redux/slices/postsReducer";

export default function Filter() {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.posts);
  const handleChange = (event) => {
    dispatch(setSort(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: "50px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sorting by:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sorting by:"
          onChange={handleChange}
        >
          <MenuItem value={"id"}>Default</MenuItem>
          <MenuItem value={"title"}>Alphabet</MenuItem>
          <MenuItem value={"views"}>Popular</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
