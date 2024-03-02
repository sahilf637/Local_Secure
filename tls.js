import { createCA, createCert } from "mkcert"
import fs from "fs"
import { log } from "console"

export const makeCert = async () => {
    const ca = await createCA({
        organization: "LocalHost",
        countryCode: "IND",
        state: "LKO",
        locality: "Neelmatha",
        validity: 365
    })

    const cert = await createCert({
        ca: { key: ca.key , cert: ca.cert },
        domains: ["127.0.0.1", "localhost"],
        validity: 365
    })
    
    fs.writeFile("./Certificate/LocalHost.cert", ca.cert, (err) => {
        console.log(err);
    })

    fs.writeFile("./Certificate/key.key", cert.key, (err) => {
        console.log(err);
    })

    fs.writeFile("./Certificate/localhostCert.cert", `${ca.cert}${cert.cert}`, (err) => {
        console.log(err);
    })
}

makeCert();
