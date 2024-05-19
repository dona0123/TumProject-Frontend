import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import AddShop from "./AddShop";
import SearchShop from "./SearchShop";
import { call } from "./ApiService";
import EditShop from "./EditShop";
import DeleteShop from "./DeleteShop";

function App() {
  // 제품 리스트를 저장할 상태 변수
  const [products, setProducts] = useState([]);

  // 컴포넌트가 마운트될 때 한 번만 실행되는 useEffect
  useEffect(() => {
    // 백엔드 서버로부터 제품 리스트를 가져와 상태 변수에 저장
    call("/shop", "GET", null)
      .then((response) => {
        setProducts(response.data); // 백엔드에서 받은 데이터를 상태 변수에 저장
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  //  제품 추가 함수 
  const addItem = (item) => {
    call("/shop", "POST", item)
    .then((response) => setProducts(response.data)); 
  };

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
              {products?.map((product) => (
                <TableRow>
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
        <br />
        <AddShop addItem={addItem}/> {/* 추가 폼 */}
        <br />
        <SearchShop /> {/* 검색 폼 */}
        <br />
        <EditShop /> {/* 수정 폼 */}
        <br />
        <DeleteShop /> {/* 삭제 폼 */}
        <br />
        <br />
        <br />
      </Container>
    </div>
  );
}

export default App;
