/* FETCH
proporciona una interfaz JS para acceder y manipular partes del canal HTTP, fetch encapsula las promesas
y trabaja internamente con ellas, cuando lo usamos, está creando el cb y response. Facilita la estructura 
del código, y provee un metodo global fetch() para obtener recursos de forma asíncrona.
*/

/*------COMPROBAR FETCH 
if(window.fetch=!undefine) console.log('Fetch ok')
else console.log ('No funciona')

----*/

const button = document.getElementById('button')

// res = response 

button.addEventListener('click',()=>{
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))  // comprueba que todo está ok
  .then(res => res.json()) // Convierte a json a js
  .then(res => {
      const list = document.getElementById('list');
      const fragment= document.createDocumentFragment()
      for (const userInfo of res){
          const listItem = document.createElement('li');
          listItem.textContent = `${userInfo.id} - ${userInfo.name}`
          fragment.appendChild(listItem)
      }
      list.appendChild(fragment)
  })   
})

// POST petiiciones post
/*
fetch (url,{
    method: 'POST',
    body: Los datos que enviamos, si es objeto convertir con JSON.stringify(datos),
    headers:{
        cabeceras de información sobre lo que estaos enviando
    }  

    REVISAR HTTP HEADERS EN DEVELOPER MOZILLA
}) */

const send = document.getElementById('send')
send.addEventListener ('click', ()=>{
    const newP = {
        title:'Post nuevo',
        body:'El cuerpo de los datos.',
        userId: 1
    }

    fetch('https://jsonplaceholder.typicode.com/posts',{
        method: 'POST',
        body : JSON.stringify(newP),
        headers:{
            "Content-type":"application/json"
        }
    }) .then(res=>res.json())
    .then(data=>console.log(data))

})



// FETCH III
// blob(): Binary long object

const buttonImg = document.getElementById('btn-img')
const buttonPdf = document.getElementById('btn-pdf')

buttonImg.addEventListener('click', () =>{
    fetch('dog.jpg')
    .then(res => res.blob()) // convierte la respuesta en un blob 
    .then(img =>{
        document.getElementById('img').src = URL.createObjectURL(img) // Convierte blob a una url que lee el nav
    } )

})

buttonPdf.addEventListener('click', () =>{
    fetch('demo.pdf')
    .then(res => res.blob()) // convierte la respuesta en un blob 
    .then(pdf =>{
        document.getElementById('pdf').href = URL.createObjectURL(pdf) // Convierte blob a una url que lee el nav
    } )

})