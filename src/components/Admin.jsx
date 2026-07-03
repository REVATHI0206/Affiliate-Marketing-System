const token = localStorage.getItem("token");

const user = JSON.parse(atob(token.split(".")[1]));

if (user.role !== "admin") {
  window.location.href = "/login";
}