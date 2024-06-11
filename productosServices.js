function getProds(){
   return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.open("GET", "https://peleteriasanrafael.vercel.app/api/productos", true); // Asegúrate de que esta URL es correcta
    xhr.send();
  });
  }
