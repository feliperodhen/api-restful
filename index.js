const express = require("express");
const productsRouter = require("./src/routes/routes_products");

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("views"));

app.use("/api/productos", productsRouter);

app.listen(PORT, () => console.log("Server activo en puerto " + PORT));

console.log("aiudamevivi :C");