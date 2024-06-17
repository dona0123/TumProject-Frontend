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
  Button,
  TextField,
  Select,
  MenuItem
} from "@mui/material";
import AddShop from "./AddShop";
import SearchShop from "./SearchShop";
import EditShop from "./EditShop";
import DeleteShop from "./DeleteShop";
import Favorites from "./Favorites"; // 즐겨찾기 컴포넌트 추가
import { useNavigate } from "react-router-dom";
import { call, signout } from "./ApiService"; // ApiService에서 call, signout 가져오기

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
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

    // 즐겨찾기 상태를 로컬 스토리지에서 불러오기
    const storedFavorites = JSON.parse(localStorage.getItem("FAVORITES")) || [];
    setFavorites(storedFavorites);
  }, [navigate]);

  // 검색 함수 정의
  const searchProduct = (title) => {
    return call("/shop/title", "POST", { title })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const product = response.data[0];
          console.log("검색된 제품:", product);
          return product;
        } else {
          alert("검색된 제품이 없습니다.");
          return null;
        }
      })
      .catch((error) => {
        console.error("Error searching products:", error);
        throw error;
      });
  };

  // 추가 함수 정의
  const addItem = (newItem) => {
    return call("/shop", "POST", newItem)
      .then((response) => {
        setProducts(response.data);
        console.log("상품이 추가되었습니다.", response.data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        throw error;
      });
  };

  // 수정 함수 정의
  const updateProduct = (updatedProduct) => {
    return call("/shop", "PUT", updatedProduct)
      .then((response) => {
        console.log("상품이 성공적으로 수정되었습니다.", response.data);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        throw error;
      });
  };

  // 삭제 함수 정의
  const deleteProduct = (title) => {
    return call("/shop/title", "POST", { title })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const product = response.data[0];
          // 검색된 제품이 있으면 해당 제품을 삭제
          return call(`/shop`, "DELETE", { id: product.id });
        } else {
          // 검색된 제품이 없을 때
          throw new Error("Product not found");
        }
      })
      .then(() => {
        alert("제품이 삭제되었습니다.");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        throw error;
      });
  };

  // 즐겨찾기 토글 함수 정의
  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId];

      localStorage.setItem("FAVORITES", JSON.stringify(updatedFavorites)); // 로컬 스토리지에 즐겨찾기 저장
      return updatedFavorites;
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getFilteredAndSortedProducts = () => {
    let filteredProducts = products;

    if (filter) {
      filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      filteredProducts = filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      filteredProducts = filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    return filteredProducts;
  };

  const renderFilterAndSortUI = () => (
    <Grid container spacing={2} justifyContent="flex-end" style={{ margin: '16px 0' }}>
      <Grid item>
        <TextField
          label="Filter"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );

  const renderComponent = () => {
    switch (activeTab) {
      case 0:
        return <AddShop addItem={addItem} />;
      case 1:
        return <SearchShop onSearch={searchProduct} />;
      case 2:
        return <EditShop onUpdate={updateProduct} onSearch={searchProduct} />;
      case 3:
        return <DeleteShop onDelete={deleteProduct} />;
      case 4:
        return <Favorites products={products} favorites={favorites} />;
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
                    <Tab label="Favorites" className="tab-item" />
                  </Tabs>
                </Grid>
              </Toolbar>
            </AppBar>
            <Box p={3}>
              {renderComponent()}
            </Box>
            {renderFilterAndSortUI()}
            <Paper style={{ margin: 16 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>User ID</TableCell>
                    <TableCell>Ingredient</TableCell>
                    <TableCell>Crisp</TableCell>
                    <TableCell>Favorite</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getFilteredAndSortedProducts().map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.userId}</TableCell>
                      <TableCell>{product.ingredient}</TableCell>
                      <TableCell>{product.crisp ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Button onClick={() => toggleFavorite(product.id)}>
                          {favorites.includes(product.id) ? "Unfavorite" : "Favorite"}
                        </Button>
                      </TableCell>
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
