// import { ENV } from "../constants/env.constant.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";

// const signIn =
document
  .getElementById("login-customer")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);

    const response = await fetch(`http://localhost:5000/api/auth/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data.data);

    // + 유저가 고객인지는 확인 못함.
    if (data.status !== HTTP_STATUS.OK) {
      alert(data.message);
    } else {
      alert(data.message);
      const accessToken = data.data.accessToken;
      const refreshToken = data.data.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }

    window.location.href = "./index-customer.html";
  });
