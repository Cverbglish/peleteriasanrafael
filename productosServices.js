async function getProds(){
    const res = await fetch("https://peleteriasanrafaelventas.cleverapps.io:8080/productos");
    const resJson = await res.json();
    return resJson;
  }
