require("dotenv").config()
const { PORT = 3031, DATABASE_URL }=process.env
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

mongoose.connect(DATABASE_URL)
mongoose.connection
    .on("open", () => console.log("MongoDB connected"))
    .on("close", () => console.log("MongoDB disconnected"))
    .on("error", (error) => console.log(error))

const BookmarksSchema = new mongoose.Schema({
    title: String,
    url: String
})

const Bookmarks = mongoose.model("Bookmarks", BookmarksSchema)

app.get("/", (req, res) => {
    res.send("testing testing one two three")
})
// INDEX ROUTE
app.get("/bookmark", async (req, res) => {
    try {
        res.json(await (await Bookmarks.find({})).reverse()) //Adds bookmark to top of list
    } catch (error) {
        res.status(400).json(error)
    }
})

// DELETE ROUTE
app.delete("/bookmark/:id", async (req, res) => {
    try {
        res.json(await Bookmarks.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// UPDATE ROUTE

app.listen(PORT, () => console.log(`We are listening on PORT ${PORT}`))
