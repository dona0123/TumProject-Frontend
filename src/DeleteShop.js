import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

const DeleteShop = ({ onDelete }) => {
  const [item, setItem] = useState({
    title: "",
    userId: "",
    ingredient: "",
    crisp: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const onButtonClick = () => {
    // 검색된 제품을 삭제 요청
    onDelete(item.title)
      .then(() => {
        setItem({ title: "", userId: "", ingredient: "", crisp: "" }); // 삭제 후 상태 초기화
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center" style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            ― 제품 삭제 ―
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
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onButtonClick}
          >
            제품 삭제
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeleteShop;
