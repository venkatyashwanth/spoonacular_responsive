function isLoggedIn() {
  const data = localStorage.getItem("_token");
  if (!data) {
    return false;
  }
  return true;
}

function doLogout() {
  localStorage.removeItem("_token");
  window.location = "/";
}

export { isLoggedIn, doLogout };