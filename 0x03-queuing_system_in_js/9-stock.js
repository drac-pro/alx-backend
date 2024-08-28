import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const listProducts = [
  {itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4},
  {itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10},
  {itemId: 3, itemname: 'Suitcase 650', price: 350, initialAvailableQuantity: 2},
  {itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5},
];

/**
 * finds a product by its id from a list 
 * @param {number} id - product id
 */
function getItemById(id) {
  return listProducts.find((product) => product.itemId === id);
}

const app = express();
const port = 1245;
const client = createClient();

client.on('error', (err) => console.error('Redis client error', err));

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

/**
 * set reserve stock for a given item by id 
 * @param {number} itemId - itemId
 * @param {number} stock - stock of the id
 */
async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

/**
 * get reserve stock for a given item by id
 * @param {number} itemId - itemId
 * @returns {Promise}
 */
async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock !== null ? parseInt(stock, 10) : 0;
}

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: "Product not found" });
  }

  const currentStock = await getCurrentReservedStockById(itemId);
  res.json({ ...product, currentQuantity: product.initialAvailableQuantity - currentStock });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: "Product not found" });
  }

  const currentStock = await getCurrentReservedStockById(itemId);
  if (currentStock >= product.initialAvailableQuantity) {
    return res.json({ status: "Not enough stock available", itemId });
  }

  await reserveStockById(itemId, currentStock + 1);
    res.json({ status: "Reservation confirmed", itemId });
  });
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export default app;
