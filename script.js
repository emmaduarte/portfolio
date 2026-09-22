const backToTopButton = document.getElementById("back-to-top");
const backToTopImage = document.getElementById("foto-personal");
const toggleTestimonialsButton = document.getElementById("toggle-testimonials");
const testimonialsList = document.getElementById("testimonials-list");
const copyright = document.getElementById("copyright");
const currentYear = new Date().getFullYear();
const cambioButton = document.getElementById("claro-oscuro");
const solIcono = document.getElementById("sol");
const lunaIcono = document.getElementById("luna");
let contador=0;

copyright.textContent = `© ${currentYear} Emmanuel Duarte. Todos los derechos reservados.`;

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
backToTopImage.addEventListener("click", () => {
	contador++;

	if (contador === 10) {
		alert("¡Felicidades! Has encontrado el secreto 🎉");
		contador = 0;
	}
});
cambioButton.addEventListener("click", () => {
	const body = document.getElementById("cuerpo");
    const modoClaroActivo = body.classList.toggle("modo-claro");

	solIcono.hidden = modoClaroActivo;
	lunaIcono.hidden = !modoClaroActivo;
	
    cambioButton.setAttribute(
		"aria-label", 
		modoClaroActivo ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
});
toggleTestimonialsButton.addEventListener("click", () => {
	const areTestimonialsVisible = toggleTestimonialsButton.getAttribute("aria-expanded") === "true";

	toggleTestimonialsButton.setAttribute("aria-expanded", String(!areTestimonialsVisible));
	toggleTestimonialsButton.textContent = areTestimonialsVisible
		? "Mostrar referencias"
		: "Ocultar referencias";
	testimonialsList.hidden = areTestimonialsVisible;
});
document.querySelectorAll(".ver-testimonio").forEach((button) => {
	button.addEventListener("click", () => {
		const description = document.getElementById(button.getAttribute("aria-controls"));
		const isDescriptionVisible = button.getAttribute("aria-expanded") === "true";

		button.setAttribute("aria-expanded", String(!isDescriptionVisible));
		button.textContent = isDescriptionVisible ? "Ver testimonio" : "Ocultar testimonio";
		description.hidden = isDescriptionVisible;
	});
});