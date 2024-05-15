import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

const AddShop = (props) => {
  // 사용자의 입력을 저장할 오브젝트
  const [item, setItem] = useState({ title: "" });
  const addItem = props.addItem; // 부모가 전달해준 함수

  // 입력 값이 변경될 때 호출되는 함수
  const onInputChange = (e) => {
    setItem({ title: e.target.value });
    console.log(item);
  };

  // 추가 버튼 클릭 시 호출되는 함수
  const onButtonClick = (e) => {
    addItem(item);
    setItem({ title: "" }); // 입력 값 초기화하여 리렌더링 발생
  };

  const enterEventHandler = (e) => {
    if (e.key === 'Enter') {
      onButtonClick(); 
    }
  }

  return (
    <Grid container spacing={2} alignItems="center" style={{ marginTop: 20 }}>
      <Grid item xs={12}>
        <span style={{ marginRight: 8 }}>title:</span>
        <TextField
          name="title"
          placeholder="Title"
          fullWidth
          onChange={onInputChange}
          onKeyPress={enterEventHandler}
          value={item.title}
        />
      </Grid>
      <Grid item xs={12}>
        <span style={{ marginRight: 8 }}>userId:</span>
        <TextField
          name="userId"
          placeholder="User ID"
          fullWidth
          onChange={onInputChange}
          onKeyPress={enterEventHandler}
          value={item.userId}
        />
      </Grid>
      <Grid item xs={12}>
        <span style={{ marginRight: 8 }}>ingredient:</span>
        <TextField
          name="ingredient"
          placeholder="Ingredient"
          fullWidth
          onChange={onInputChange}
          onKeyPress={enterEventHandler}
          value={item.ingredient}
        />
      </Grid>
      <Grid item xs={12}>
        <span style={{ marginRight: 8 }}>crisp:</span>
        <TextField
          name="crisp"
          placeholder="Crisp"
          fullWidth
          onChange={onInputChange}
          onKeyPress={enterEventHandler}
          value={item.crisp}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          color="secondary"
          variant="outlined"
          onClick={() => onButtonClick('add')}
        >
          제품 검색
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddShop;