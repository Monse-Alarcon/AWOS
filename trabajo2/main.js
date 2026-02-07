const boton = document.getElementById('btnCargar');
const lista = document.getElementById('listaProductos');

boton.addEventListener("click", async() => {
    try{
        const respuesta = await fetch('http://localhost:4000/api/productos');
        const datos = await respuesta.json();
        
        
        lista.innerHTML = '';  

        datos.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - $${producto.precio} - ${producto.stock}`;

            if(producto.stock < 5){
                li.style.color = 'red';
            }
            
            lista.appendChild(li);
        });
    }
    catch(error){
        console.error("Error al cargar: ", error);
        alert("No se pudo conectar a la API");
    }
});