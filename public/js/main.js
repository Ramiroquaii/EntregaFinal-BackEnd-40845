const socket = io();

let btnAdmin;
let btnMessage;
let btnLogout;
let btnQuienSoy;

function eventsAfterLogin() {
  btnMessage = document.querySelector("#btn-newMessage");
  btnMessage.addEventListener("click", addNewMessage);

  btnLogout = document.querySelector("#btn-logout");
  btnLogout.addEventListener("click", logout);

  btnAdmin = document.querySelector("#btn-admin");
  btnAdmin.addEventListener("click", panelAdmin);

  btnQuienSoy = document.querySelector("#btn-info");
  btnQuienSoy.addEventListener("click", info);
}

function insertarAntesDe(elementoExistente, nuevoContenido) {
  const existingElement = document.getElementById(elementoExistente); // Obtén la referencia al elemento existente
  existingElement.insertAdjacentHTML('beforebegin', nuevoContenido);  // Inserta el nuevo contenido antes del elemento existente
}


function info() {
  var respuesta = confirm('¿ Va a abandonar la sesion para acceder a este contenido ?');
  if (respuesta) {
    receivedToken = null;
    window.location.replace('/info');
  }
}

function getFirstLoadData() {
  fetch('/api/productos')
    .then(response => response.json())
    .then(data => {
      let html = ""; //document.getElementById('productList').innerHTML;
      data.forEach(element => {
        html = `${html}
        <div class="table-line">
        <p class="nameTb">${element.name}</p>
        <p class="priceTd">$ ${element.price}</p>
        <img src="${element.photo}" alt="${element.name}">
        <button class="btn btn-success" id="btn-addPrd" data-indice="${element._id}">+</button>
        <button class="btn btn-success" id="btn-delPrd" data-indice="${element._id}">-</button>
        </div>`;
      });
      document.getElementById('productList').innerHTML = `${html}`;
    })
    .catch(error => console.error(error));

  fetch('/api/mensajes')
    .then(response => response.json())
    .then(data => {
      let html = ""; //document.getElementById('chatContent').innerHTML;
      data.forEach(message => {
        html += `<div class="chatLine" li><p class="user">${message.autor}&nbsp;</p> <p class="time">[ ${message.timestamp} ] :&nbsp;</p> <p class="msg">${message.mensaje}</p></div>`
      });
      document.getElementById('chatContent').innerHTML = `${html}`;
    })
    .catch(error => console.error(error));
}

function logout(event) {
  event.preventDefault();
  receivedToken = null;
  window.location.href = '/';
}

// --------- PANEL ADMINISTRADOR --------------------------------------------------------------- //

function eventsAfterAdmin() {
  btnProduct = document.querySelector("#btn-newProduct");
  btnProduct.addEventListener("click", addNewProduct);

  btnProduct = document.querySelector("#btn-newProductExit");
  btnProduct.addEventListener("click", salirPanelAdmin);
}

function addNewProduct(){
  alert("ADD PRODUCT BUTTON PRESSED")
}

function salirPanelAdmin(){
  alert("SALIR ADMIN BUTTON PRESSED")
}

async function panelAdmin() {
  await fetch('/adminPage', {
    method: 'GET',
    headers: {
        'Authorization': `${receivedToken}` // Incluir el token en el encabezado de autorización
    }
  })
    .then(response => {
        // Manejar la respuesta de la ruta protegida
        if (response.ok) {
            // La solicitud se completó con éxito
            const authHeader = response.headers.get('Authentication');
            if (authHeader) {
              receivedToken = authHeader;
              console.log('Encabezado de autenticación:', authHeader);
            }
            return response.json();
        } else {
            // La solicitud falló, manejar el error
            throw new Error('Error en la solicitud de la ruta protegida');
        }
    })
    .then(data => {
        // Hacer algo con la respuesta de la ruta protegida
        if(data.hasOwnProperty('estado') && data.estado == 1){
          alert("Permisos Insuficinetes...\n\nDebe ser administrador !!");
        } else {
          insertarAntesDe("productlistPanel", data.page);
          eventsAfterAdmin();
        }
    })
    .catch(error => {
        // Manejar el error de la solicitud
        console.log(error);
        alert("Error de Solicitud...\n\n Refresque el Navegador e Intente nuevamente !!");
    });
}

// --------- PANEL ADMINISTRADOR --------------------------------------------------------------- //


// --------- SOCKET.IO --------------------------------------------------------------- //

// ----------- CHAT
function addNewMessage(event) {
  event.preventDefault();
  const message = {
    autor: document.getElementById('usuario').value,
    mensaje: document.getElementById('mensaje').value
  };
  document.getElementById('usuario').value = '';
  document.getElementById('mensaje').value = '';
  socket.emit('new-message', message);
}

socket.on('messages', data => {
  let html = document.getElementById('chatContent').innerHTML;

  data.forEach(message => {
    html += `<div class="chatLine" li><p class="user">${message.autor}&nbsp;</p> <p class="time">[ ${message.timestamp} ] :&nbsp;</p> <p class="msg">${message.mensaje}</p></div>`
  });

  document.getElementById('chatContent').innerHTML = `${html}`;
});

socket.on('message-added', message => {
  let html = document.getElementById('chatContent').innerHTML;

  html += `<div class="chatLine" li><p class="user">${message.autor} </p> <p class="time"> [ ${message.timestamp} ] : </p> <p class="msg"> ${message.mensaje}</p></div>`;

  document.getElementById('chatContent').innerHTML = `${html}`;
});

// --------- SOCKET.IO --------------------------------------------------------------- //