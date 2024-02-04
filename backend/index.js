
const express = require("express");
const cors = require('cors')
const rootRouter = require("./routes/index");
const useRouter = require("./routes/user");
const PORT = 3000

const app = express();

app.use(cors())
app.use(express.json());
app.use("/api/v1", rootRouter);


app.listen(PORT, () => {
    console.log("Port is running on ", PORT)
})


