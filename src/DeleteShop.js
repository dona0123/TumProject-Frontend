import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

const DeleteShop = (props) => {
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
          // 삭제 요청 보내기
          fetch("http://localhost:8080/shop", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: product.id }),
          })
            .then((response) => response.json())
            .then((data) => {
              // 여기서는 예시로만 처리; 실제 응답 데이터에 따라 조정 필요
              alert("제품이 삭제되었습니다.");
            })
            .catch((error) => {
              console.error("Error updating product:", error);
            });
        } else {
          // 검색된 데이터가 없을 때 처리
          alert("검색된 제품이 없습니다.");
          setItem({ title: "", userId: "", ingredient: "", crisp: "" }); // 상태 초기화
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
