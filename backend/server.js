const express = require('express')

const clientsRoutes = require("./routes/client.js")
const productsRoutes = require("./routes/product.js")
const purchasesRoutes = require("./routes/purchases.js")

const PORT = 4000

const app = express();

app.use(express.json())

app.use('/compras', purchasesRoutes)

app.use("/clientes", clientsRoutes)

app.use("/produtos", productsRoutes)



app.use("/", (req, res) =>{
    return res.send("API de Gerenciamento de Compras")
})

app.listen(PORT, () => { 
    console.log("Server running in port " + PORT)
})