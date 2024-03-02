import express from "express"
import https from "https"
import fs from "fs"
import cors from "cors"
import Proxy from "express-http-proxy"
import morgan from "morgan"
import { log } from "console"

const app = express();

app.use(morgan("dev"))


app.use(express.json())

// const proxy = httproxy.createServer()

// app.use("/", (req, res) => {
//     // if(req.method == "POST"){

//     // }else
//     console.log(req.headers);
//     proxy.web(req, res)
//   });
app.use((req, res, next) => {
    console.log(req.body);
    next()
})

app.use("/", Proxy("http://localhost:8080", {
    secure: true
}))


app.use(cors({
    credentials: true
}))

const cert = fs.readFileSync("./Certificate/fullchain.pem")
const key = fs.readFileSync("./Certificate/cert-key.pem")


const options = {
    cert: cert,
    key:key
}

const server = https.createServer(options, app)
  
  const port = 3000;
  server.listen(port, () => {
    console.log(`Server is listening on https://localhost:${port}`);
  });


