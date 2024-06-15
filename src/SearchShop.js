import React, { useState } from "react";
import { Button, Grid, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";

const SearchShop = ({ setProducts }) => {
  const [item, setItem] = useState({
    title: "",
    userId: "",
    ingredient: "",
    crisp: false,
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const onCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setItem({ ...item, [name]: checked });
  };

  const onButtonClick = () => {
    // 검색어가 비어있는지 확인
    if (!item.title) {
      alert("검색어를 입력하세요.");
      console.error("검색어를 입력하세요.");
      return;
    }

    // 검색 요청 보내기
    fetch("http://localhost:8080/shop/title", {
      method: "POST", // POST 요청으로 변경
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: item.title }), // JSON 형태로 요청 바디에 title 전송
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          // 검색된 데이터가 있을 경우에만 처리
          const product = data.data[0]; // 첫 번째 검색 결과만 사용
          setItem(product);
        } else {
          // 검색된 데이터가 없을 때 처리
          alert("검색된 제품이 없습니다.");
          setItem({ title: "", userId: "", ingredient: "", crisp: false }); // 상태 초기화
        }
      })
      .catch((error) => {
        console.error("Error searching products:", error);
      });
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
            value={item.userId}
            
          />
        </Grid>
        <Grid item xs={12}>
          <span style={{ marginRight: 8 }}>Ingredient:</span>
          <TextField
            name="ingredient"
            placeholder="Ingredient"
            fullWidth
            value={item.ingredient}
            
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="crisp"
                checked={item.crisp}
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
