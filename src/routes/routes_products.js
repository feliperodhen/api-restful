const express = require("express");
const ProductsController = require("../../products.js");

const router = express.Router();
const controller = new ProductsController("productos.json");

router.get("/", async (req, res) => {
  try {
    const productos = await controller.getAll();
    console.log("productos", productos);
    res.status(201).json(productos);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const producto = await controller.getById(id);
    res.status(201).json(producto);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = {
      title: req.body.title,
      price: parseInt(req.body.price),
    };
    console.log("newProduct", newProduct.price);
    const savedProduct = await controller.save(newProduct);
    res.json(savedProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = req.body;
    await controller.updateProduct(id, product);
    const updatedProduct = await controller.getById(id);
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await controller.deleteById(id);
    res.json({ success: `Product with id ${id} deleted` });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
