fetch("http://localhost:8080/app/3")
  .then((response) => response.json())
  .then((data) => console.log(data));
