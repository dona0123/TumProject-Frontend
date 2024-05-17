import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

const AddShop = (props) => {
  const [item, setItem] = useState({
    title: "",
    userId: "",
    ingredient: "",
    crisp: "",
  });
  const addItem = props.addItem;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const onButtonClick = () => {
    addItem(item);
    setItem({ title: "", userId: "", ingredient: "", crisp: "" });
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center" style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            ― 제품 추가 ―
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <span style={{ marginRight: 8 }}>Title:</span>
          <TextField
            name="title"
            placeholder="제품명을 입력하세요"
            fullWidth
            onChange={onInputChange}
            value={item.title}
          />
        </Grid>
        <Grid item xs={12}>
          <span style={{ marginRight: 8 }}>User ID:</span>
          <TextField
            name="userId"
            placeholder="사용자 ID를 입력하세요"
            fullWidth
            onChange={onInputChange}
            value={item.userId}
          />
        </Grid>
        <Grid item xs={12}>
          <span style={{ marginRight: 8 }}>Ingredient:</span>
          <TextField
            name="ingredient"
            placeholder="성분을 입력하세요"
            fullWidth
            onChange={onInputChange}
            value={item.ingredient}
          />
        </Grid>
        <Grid item xs={12}>
          <span style={{ marginRight: 8 }}>Crisp:</span>
          <TextField
            name="crisp"
            placeholder="바삭함 여부를 입력하세요"
            fullWidth
            onChange={onInputChange}
            value={item.crisp}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onButtonClick}
          >
            제품 추가
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddShop;
