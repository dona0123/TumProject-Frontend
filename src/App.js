import "./App.css";
import React, { useState, useEffect } from "react";
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import AddShop from "./AddShop";
import { call } from "./ApiService";

function App() {
  // 제품 리스트를 저장할 상태 변수
  const [products, setProducts] = useState([]);

  // 컴포넌트가 마운트될 때 한 번만 실행되는 useEffect
  useEffect(() => {
    // 백엔드 서버로부터 제품 리스트를 가져와 상태 변수에 저장
    call("/shop", "GET", null).then((response) => {
      setProducts(response.data); // 백엔드에서 받은 데이터를 상태 변수에 저장
    }).catch((error) => {
      console.error("Error fetching products:", error);
    });
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div className="App">
      <Container maxWidth="md">
        <div className="center-div">
          <div className="title">고로케 판매 사이트</div>
          <hr className="hr-line" />
        </div>
        <Paper style={{ margin: 16 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Ingredient</TableCell>
                <TableCell>Crisp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.userId}</TableCell>
                  <TableCell>{product.ingredient}</TableCell>
                  <TableCell>{product.crisp ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <AddShop /> {/* 추가 폼 */}
      </Container>
    </div>
  );
}

export default App;
