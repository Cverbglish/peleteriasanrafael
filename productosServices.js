async function getProds(){
    const res = await fetch("https://peleteriasanrafael.vercel.app:8080/productos");
    const resJson = await res.json();
    return resJson;
  }
