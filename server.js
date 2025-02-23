const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/autRoutes");
const subscribeRoute = require("./routes/SubscribeRoute");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/", authRoutes);
app.use("/subscribe", subscribeRoute);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
