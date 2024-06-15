import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

const EditShop = ({ setProducts }) => {
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

  const onSearchButtonClick = () => {
    // 검색어가 비어있는지 확인
    if (!item.title) {
      alert("검색어를 입력하세요.");
      console.error("검색어를 입력하세요.");
      return;
    }

    // 검색 요청 보내기
    fetch("http://localhost:8080/shop/title", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: item.title }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          const product = data.data[0];
          setItem(product);
        } else {
          alert("검색된 제품이 없습니다.");
          setItem({ title: "", userId: "", ingredient: "", crisp: "" });
        }
      })
      .catch((error) => {
        console.error("Error searching products:", error);
      });
  };

  const onEditButtonClick = () => {
    // 수정 요청 보내기
    fetch("http://localhost:8080/shop", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: item.title,
        userId: item.userId,
        ingredient: item.ingredient,
        crisp: item.crisp,
        id: item.id,
      }), // 필드 이름을 일치시킴
    })
      .then((response) => response.json())
      .then((data) => {
        // 여기서는 예시로만 처리; 실제 응답 데이터에 따라 조정 필요
        alert("제품이 수정되었습니다.");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center" style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            ― 제품 수정 ―
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <span style={{ marginRight: 8 }}>Title:</span>
          <TextField
            name="title"
            placeholder="수정하려는 제품의 Title를 입력하세요"
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
            onChange={onInputChange}
            value={item.userId}
          />
        </Grid>
        <Grid item xs={12}>
          <span style={{ marginRight: 8 }}>Ingredient:</span>
          <TextField
            name="ingredient"
            placeholder="Ingredient"
            fullWidth
            onChange={onInputChange}
            value={item.ingredient}
          />
        </Grid>
        <Grid item xs={12}>
          <span style={{ marginRight: 8 }}>Crisp:</span>
          <TextField
            name="crisp"
            placeholder="Crisp"
            fullWidth
            onChange={onInputChange}
            value={item.crisp}
          />
        </Grid>
        <Grid item xs={12} container spacing={2}>
          {" "}
          {/* 버튼들을 감싸는 Grid 컨테이너에 spacing 속성 추가 */}
          <Grid item xs={12}>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={onSearchButtonClick}
            >
              제품 검색
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={onEditButtonClick} // 이 버튼의 onClick 이벤트 핸들러는 나중에 수정이 필요할 수 있습니다.
            >
              제품 수정
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditShop;
