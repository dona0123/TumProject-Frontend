import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Grid,
  Typography,
  Button
} from "@mui/material";
import AddShop from "./AddShop";
import SearchShop from "./SearchShop";
import { call, signout } from "./ApiService";
import EditShop from "./EditShop";
import DeleteShop from "./DeleteShop";
import { useNavigate } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      navigate("/login");
      return;
    }
  
    call("/shop", "GET", null)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [navigate]);

  // 검색 함수 정의
  const searchProduct = (title) => {
    return call("/shop/title", "POST", { title }) // title을 전달하여 검색 요청
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const product = response.data[0];
          console.log("검색된 제품:", product);
          return product; // 검색된 제품 정보 반환
        } else {
          throw new Error("검색된 제품이 없습니다.");
        }
      })
      .catch((error) => {
        console.error("Error searching products:", error);
        throw new Error("제품 검색 중 오류가 발생했습니다.");
      });
  };

  const addItem = (item) => {
    call("/shop", "POST", item)
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderComponent = () => {
    switch (activeTab) {
      case 0:
        return <AddShop addItem={addItem} />;
      case 1:
        return <SearchShop onSearch={searchProduct} />; // 검색 함수를 props로 전달
      case 2:
        return <EditShop />;
      case 3:
        return <DeleteShop />;
      default:
        return <AddShop addItem={addItem} />;
    }
  };

  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">고로케 판매 사이트</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <div className="App">
          <Container maxWidth="md">
            <div style={{ height: '20px' }}></div>
            <AppBar position="static" color="default">
              <Toolbar>
                <Grid container justifyContent="center">
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    textColor="inherit"
                    indicatorColor="secondary"
                  >
                    <Tab label="Add Shop" className="tab-item" />
                    <Tab label="Search Shop" className="tab-item" />
                    <Tab label="Edit Shop" className="tab-item" />
                    <Tab label="Delete Shop" className="tab-item" />
                  </Tabs>
                </Grid>
              </Toolbar>
            </AppBar>
            <Box p={3}>
              {renderComponent()}
            </Box>
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
          </Container>
        </div>
      </Container>
    </div>
  );

  let loadingPage = <h1> 로딩중.. </h1>;
  let content = loadingPage;

  if (!loading) {
    content = todoListPage;
  }

  return <div className="App">{content}</div>;
}

export default App;
