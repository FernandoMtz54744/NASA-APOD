const key = "DEMO_KEY";

const boton = document.getElementById("buscar");
const date = document.getElementById("date");
const titulo = document.getElementById("titulo");
const imgApod = document.getElementById("imagen");
const videoApod = document.getElementById("video");
const descripcion = document.getElementById("descripcion");

const llamaAPI = async ()=>{
    const dateAPOD = date.value; //YYYY-MM-DD 
        const url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${dateAPOD}`;
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            muestaImagen(data);
        }).catch(error => {
            titulo.innerHTML = "Error [Too many request]";
            imgApod.setAttribute("hidden","");
            videoApod.setAttribute("hidden","");
            descripcion.setAttribute("hidden","");
        })

        /*const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        muestaImagen(data);*/
}

const muestaImagen = (data)=>{
    titulo.innerHTML="Imagen del "+data.date+ (data.copyright !== undefined ? " by "+data.copyright: "") +": " + data.title;
    descripcion.innerHTML = data.explanation;

    if(data.url.includes("youtube")){
        imgApod.setAttribute("hidden", "");
        videoApod.removeAttribute("hidden","");
        videoApod.src = data.url;
    }else{
        imgApod.removeAttribute("hidden","");
        videoApod.setAttribute("hidden","");
        const t = timestamp = new Date().getTime();
        imgApod.src=data.url;
    }
    
}

boton.addEventListener("click", ()=>{
    llamaAPI();
})

llamaAPI();