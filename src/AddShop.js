import React, { useState } from "react";
import { Button, Grid, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";

const AddShop = (props) => {
  // 사용자의 입력을 저장할 오브젝트
  const [item, setItem] = useState({ title: "", userId: "", ingredient: "", crisp: false });
  const addItem = props.addItem; // 부모가 전달해준 함수

  // 입력 값이 변경될 때 호출되는 함수
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item, // 기존 상태 객체의 속성들을 복사
      [name]: value // 변경된 속성만 업데이트
    });
  };

  // 체크박스 값이 변경될 때 호출되는 함수
  const onCheckboxChange = (e) => {
    setItem({
      ...item,
      crisp: e.target.checked // 체크 여부를 업데이트
    });
  };

  // 추가 버튼 클릭 시 호출되는 함수
  const onButtonClick = (e) => {
    addItem(item);
    setItem({ title: "", userId: "", ingredient: "", crisp: false }); // 입력 값 초기화하여 리렌더링 발생
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
            제품 추가
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddShop;
