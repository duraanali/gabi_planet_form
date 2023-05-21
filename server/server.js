require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3').verbose();

// Add body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const port = process.env.PORT || 8000;

// Create SQLite database connection
const db = new sqlite3.Database('./ecommerce.db'); // Replace with your desired database file name or path

// Create 'products' table
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, image TEXT, description TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)'
  );
});

// List all products
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products ORDER BY id DESC';
  db.all(query, (error, rows) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
    res.json(rows);
  });
});

// Create a new product
app.post('/products', (req, res) => {
  const { name, price, image, description } = req.body;
  const query =
    'INSERT INTO products (name, price, image, description) VALUES (?, ?, ?, ?)';
  db.run(query, [name, price, image, description], function (error) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
    const id = this.lastID;
    res.json({ id, name, price, image, description });
  });
});

// Update a product
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, image, description } = req.body;
  const query =
    'UPDATE products SET name = ?, price = ?, image = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  db.run(
    query,
    [name, price, image, description, id],
    function (error) {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ id, name, price, image, description });
    }
  );
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  db.run(query, [id], function (error) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
