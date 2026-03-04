// for login register pages
const togglePass = document.getElementById("togglePass");
const passwordInput = document.getElementById("password");
const iconEyeOpen = togglePass.querySelector(".icon-eye-open");
const iconEyeClosed = togglePass.querySelector(".icon-eye-closed");

togglePass.addEventListener("click", () => {
  const isPasswordVisible = passwordInput.type === "text";
  passwordInput.type = isPasswordVisible ? "password" : "text";
  iconEyeOpen.hidden = isPasswordVisible;
  iconEyeClosed.hidden = !isPasswordVisible;
});


