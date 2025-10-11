const formEl = document.getElementById("shorten-form");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formEl);
  const url = formData.get("url");
  const shortCode = formData.get("shortCode");

  console.log(url, shortCode);
});
