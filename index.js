const konversi_uang = document.getElementById("konversi_uang");

konversi_uang.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const dataUang = {
      from: document.getElementById("from").value,
      amount: document.getElementById("amount").value,
      to: document.getElementById("to").value,
    };

    const response = await fetch("http://localhost:3000/convert-mata-uang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUang),
    });

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});
