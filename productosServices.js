async function getProds(){
    const res = await fetch("https://peleteriasanrafael.vercel.app:3306/productos");
    const resJson = await res.json();
    return resJson;
  }
