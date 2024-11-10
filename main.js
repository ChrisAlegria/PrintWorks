// Importar funciones necesarias de Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCHTUNTswipZegyNYJuCCHdaz21gsr0cKo",
  authDomain: "printworks-edbd5.firebaseapp.com",
  databaseURL: "https://printworks-edbd5-default-rtdb.firebaseio.com",
  projectId: "printworks-edbd5",
  storageBucket: "printworks-edbd5.firebasestorage.app",
  messagingSenderId: "704045205671",
  appId: "1:704045205671:web:bac4daa2801aebdae2f382"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Obtener referencia de la base de datos

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto de recargar la página al enviar el formulario
        
        // Obtener los valores de los campos
        const nombre = document.querySelector("#nombre").value;
        const servicio = document.querySelector("#servicio").value;
        const correo = document.querySelector("#correo").value;
        const telefono = document.querySelector("#telefono").value;
        const mensaje = document.querySelector("#mensaje").value;
        
        // Validar que todos los campos estén completos
        if (!nombre || !servicio || !correo || !telefono || !mensaje) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Crear un objeto con los datos del formulario
        const formData = {
            nombre: nombre,
            servicio: servicio,
            correo: correo,
            telefono: telefono,
            mensaje: mensaje,
            fecha: new Date().toISOString() // Agregar la fecha y hora
        };

        // Guardar los datos en Firebase Realtime Database
        const dbRef = ref(database, "pedidos"); // Ruta donde se almacenarán los datos
        push(dbRef, formData)
            .then(() => {
                alert("¡Tu mensaje ha sido enviado correctamente!");
                form.reset(); // Limpiar el formulario
            })
            .catch((error) => {
                console.error("Error al enviar el mensaje: ", error);
                alert("Hubo un error al enviar tu mensaje. Intenta nuevamente.");
            });
    });
});
