// Elementos para el manejo del botón "Volver arriba"
const backToTopButton = document.getElementById("back-to-top");

// Elemento para el manejo del botón "Volver arriba"
const backToTopImage = document.getElementById("foto-personal");

// Elementos para el manejo de testimonios
const toggleTestimonialsButton = document.getElementById("toggle-testimonials");
const testimonialsList = document.getElementById("testimonials-list");

// Elemento para el manejo de copyright
const copyright = document.getElementById("copyright");
const currentYear = new Date().getFullYear();

// Elementos para el manejo de modo claro/oscuro
const cambioButton = document.getElementById("claro-oscuro");
const solIcono = document.getElementById("sol");
const lunaIcono = document.getElementById("luna");

// Elementos para el manejo de formulario
const contactoForm = document.getElementById("contactar");
const controlador = new AbortController();

// Actualizar el año en el copyright
copyright.textContent = `© ${currentYear} Emmanuel Duarte. Todos los derechos reservados.`;

// Funcionalidad del botón "Volver arriba"
const updateBackToTopVisibility = () => {
	backToTopButton.classList.toggle("is-visible", window.scrollY > 400);
};

window.addEventListener("scroll", updateBackToTopVisibility);

backToTopButton.addEventListener("click", () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
});

// Funcionalidad secreta al hacer click en la foto personal
let contador=0;
backToTopImage.addEventListener("click", () => {
	contador++;

	if (contador === 10) {
		alert("¡Felicidades! Has encontrado el secreto 🎉");
		contador = 0;
	}
});


// Funcionalidad del botón "Cambiar a modo claro/oscuro"
cambioButton.addEventListener("click", () => {
	const body = document.getElementById("cuerpo");
    const modoClaroActivo = body.classList.toggle("modo-claro");

	solIcono.hidden = modoClaroActivo;
	lunaIcono.hidden = !modoClaroActivo;
	
    cambioButton.setAttribute(
		"aria-label", 
		modoClaroActivo ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
});


// Funcionalidad del botón "Mostrar/Ocultar referencias"
toggleTestimonialsButton.addEventListener("click", () => {
	const areTestimonialsVisible = toggleTestimonialsButton.getAttribute("aria-expanded") === "true";

	toggleTestimonialsButton.setAttribute("aria-expanded", String(!areTestimonialsVisible));
	toggleTestimonialsButton.textContent = areTestimonialsVisible
		? "Mostrar referencias"
		: "Ocultar referencias";
	testimonialsList.hidden = areTestimonialsVisible;
});


// Funcionalidad de los botones "Ver testimonio"
document.querySelectorAll(".ver-testimonio").forEach((button) => {
	button.addEventListener("click", () => {
		const description = document.getElementById(button.getAttribute("aria-controls"));
		const isDescriptionVisible = button.getAttribute("aria-expanded") === "true";

		button.setAttribute("aria-expanded", String(!isDescriptionVisible));
		button.textContent = isDescriptionVisible ? "Ver testimonio" : "Ocultar testimonio";
		description.hidden = isDescriptionVisible;
	});
});

// Funcionalidad del formulario de contacto


contactoForm.addEventListener("submit", async (event) => {
	// Evita el comportamiento por defecto del formulario
	event.preventDefault();

	setTimeout(() => {
		controlador.abort(); //Cancela la peticion a los 5s
	}, 5000);

	// Obtiene los valores de los campos del formulario y 
	// elimina espacios en blanco al inicio y al final
	const nombre = document.getElementById("name").value.trim();
	const email = document.getElementById("email").value.trim();
	const mensaje = document.getElementById("message").value.trim();
	const telefono= document.getElementById("telefono").value.trim();
	const metodoContacto = document.querySelector(
    'input[name="contact-method"]:checked')?.value;

	if (!nombre || !email || !mensaje || !telefono || !metodoContacto) {
		alert("Por favor, completa todos los campos del formulario.");
		return;
	}	
  try {
        const resultado = await enviarFormulario({
            name: nombre,
            email: email,
            message: mensaje,
            telefono: telefono,
			contactMethod: metodoContacto
        });
		contactoForm.reset();
        alert("Formulario enviado con éxito." || resultado.message);
    } catch (error) {
        if (error.name === "AbortError") {
	console.log("El recurso fue cancelado por un timeout");
  } else {
	console.error("Fetch error:", error);
	alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
	}
    }
});



// Peticion a la api de formboost
async function enviarFormulario(datos) {
const response = await fetch("https://formboost.app/f/48hpqk7v", {
	signal: controlador.signal,
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(datos)
})
if (!response.ok) {
	console.log(response);
  throw new Error(`HTTP error! status: ${response.status}`);
}
return response.json();
}


