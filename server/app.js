import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3000;

//menerima data body json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors
app.use(cors());

//try api
app.get("/", (req, res) => {
  try {
    res.json({ message: "HIT API", status: 200 });
    console.log("API Berhasil di aktifkan");
  } catch (error) {
    res.json({ message: "Failed API", status: 404 });
    console.log(error);
  }
});

//api konvert mata uang
// link api : https://api.frankfurter.app/latest

//logika konversi uang
app.post("/convert-mata-uang", async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    //mengambil data
    const responseData = await fetch("https://api.frankfurter.app/latest");
    const resultData = await responseData.json();
    // ambil rates  atau jenis uang
    const rates = resultData.rates;

    if (!rates[from]) {
      return res.json({ message: "Mata Uang Tidak Valid" });
    }
    if (!rates[to]) {
      return res.json({ message: "Mata Uang Tidak Valid" });
    }

    //logika konversi
    let amountinEur = from === "EUR" ? amount : amount / rates[from];
    let resultKonvert = to === "EUR" ? amountinEur : amountinEur * rates[to];

    return res.json({
      message: "Pertukaran nilai Mata Uang Berhasil",
      data: resultKonvert,
      satus: 200,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
