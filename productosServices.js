async function getProds(){
    const res = await fetch("https://peleteriasanrafael.vercel.app:4000/productos");
    const resJson = await res.json();
    return resJson;
  }
