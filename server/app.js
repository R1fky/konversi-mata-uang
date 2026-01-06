import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 3000;

//try api
app.get("/", (req, res) => {
  try {
    res.json({ message: "HIT API", status: 200 });
    console.log("API Berhasil di aktifkan");
  } catch (error) {
    console.log(error);
  }
});

//api konvert mata uang

// link api : https://api.frankfurter.app/latest
app.get("/convert-mata-uang", async (req, res) => {
  try {
    //response data
    const response = await fetch("https://api.frankfurter.app/latest");
    if (!response.ok) {
      return res.json({
        message: "response data fetch Kurs tidak berhasil",
      });
    }

    // result data
    const ApiData = await response.json();
    return res.json({
      message: "Berhasil Mengambil Data Kurs",
      data: ApiData,
    });
  } catch (error) {
    return res.json({
      message: "API Konversi Tidak Berhasil",
      status: 404,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
