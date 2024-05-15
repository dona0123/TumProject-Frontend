import React from 'react';

const ShopRow = ({ Shop }) => {
  return (
    <tr>
      <td>{Shop.id}</td>
      <td>{Shop.userId}</td>
      <td>{Shop.ingredient}</td>
      <td>{Shop.title}</td>
      <td>{Shop.crisp}</td>
    </tr>
  );
};

export default ShopRow;
