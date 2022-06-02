require("dotenv").config()
const { PORT = 3031, DATATBASE_URL }=process.env
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const app = express()





app.listen(PORT, () => console.log(`We are listening on PORT ${PORT}`))
