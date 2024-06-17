import React, { useState } from "react";
import { Button, Grid, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";

const SearchShop = ({ onSearch }) => {
  const [item, setItem] = useState({
    title: "",
    userId: "",
    ingredient: "",
    crisp: false,
  });
  const [searchedProduct, setSearchedProduct] = useState(null); // 검색된 제품 정보 상태

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const onCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setItem({ ...item, [name]: checked });
  };

  const onButtonClick = async () => {
    try {
      // 검색 함수 호출
      const product = await onSearch(item.title);
      setSearchedProduct(product); // 검색된 제품 정보 설정
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center" style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            ― 제품 검색 ―
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <span style={{ marginRight: 8 }}>Title:</span>
          <TextField
            name="title"
            placeholder="검색하려는 제품의 Title를 입력하세요"
            fullWidth
            onChange={onInputChange}
            value={item.title}
          />
        </Grid>
        <Grid item xs={12}>
          <span style={{ marginRight: 8 }}>User ID:</span>
          <TextField
            name="userId"
            placeholder="User ID"
            fullWidth
            value={searchedProduct?.userId || ""} 
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <span style={{ marginRight: 8 }}>Ingredient:</span>
          <TextField
            name="ingredient"
            placeholder="Ingredient"
            fullWidth
            value={searchedProduct?.ingredient || ""} 
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="crisp"
                checked={searchedProduct?.crisp || false}
                onChange={onCheckboxChange}
                sx={{
                  color: "secondary.main",
                  '&.Mui-checked': {
                    color: "secondary.main",
                  },
                }}
              />
            }
            label="Crisp"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onButtonClick}
          >
            제품 검색
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchShop;
