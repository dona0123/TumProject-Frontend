import React from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

function Favorites({ products, favorites }) {
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
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
          {favoriteProducts.map((product) => (
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
  );
}

export default Favorites;
