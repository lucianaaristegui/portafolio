// ===================================================
// 1. BOTONES PARA VOLVER ARRIBA (FLOTANTE Y FOOTER)
// ===================================================
const botonArriba = document.getElementById("btnVolverArriba");
const botonFooterArriba = document.getElementById("btnFooterArriba");

function subirAlInicio() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    botonArriba.classList.add("visible");
  } else {
    botonArriba.classList.remove("visible");
  }
});

if (botonArriba) botonArriba.addEventListener("click", subirAlInicio);
if (botonFooterArriba) botonFooterArriba.addEventListener("click", subirAlInicio);


// ===================================================
// 2. VISOR DE PROYECTOS ESTILO REVISTA
// ===================================================
// Reemplazá las rutas de 'imagen' por tus archivos reales
const proyectosPorCarpeta = {
  branding: {
    titulo: "BRANDING",
    paginas: [
      {
        imagen: "img/brand/alfre.jpeg",
        titulo: "Identidad Visual - Marca 1",
        descripcion: "Desarrollo de logotipo, paleta cromática y manual de marca."
      },
      {
        imagen: "img/brand/lali.jpeg",
        titulo: "Rediseño de Marca - Marca 2",
        descripcion: "Sistema gráfico aplicado a indumentaria y papelería."
      },
      {
        imagen: "img/branding/proyecto3.jpg",
        titulo: "Isologotipo y Aplicaciones",
        descripcion: "Construcción geométrica y variantes tipográficas."
      }
    ]
  },
  publicitario: {
    titulo: "DISEÑO PUBLICITARIO",
    paginas: [
      {
        imagen: "img/dispublicitario/poster1.jpeg",
        titulo: "Campaña Redes Sociales",
        descripcion: "Piezas gráficas y estrategia visual para lanzamiento."
      },
      {
        imagen: "img/dispublicitario/poster2.jpeg",
        titulo: "Afiche Promocional",
        descripcion: "Composición tipográfica y fotomontaje publicitario."
      }
    ]
  },
  audiovisual: {
    titulo: "AUDIOVISUAL",
    paginas: [
      {
        imagen: "img/audiovisual/escena1.jpg",
        titulo: "Diseño Sonoro y Foley",
        descripcion: "Montaje de audio, ambientes y sincronización en Reaper."
      },
      {
        imagen: "img/audiovisual/escena2.jpg",
        titulo: "Animatic y Storyboard",
        descripcion: "Dirección de arte, ilustración de cuadros y narrativa visual."
      }
    ]
  }
};

const carpetas = document.querySelectorAll(".tarjeta-carpeta");
const modalRevista = document.getElementById("modalRevista");
const cerrarRevista = document.getElementById("cerrarRevista");
const hojaRevista = document.getElementById("hojaRevista");
const tituloCategoriaRevista = document.getElementById("tituloCategoriaRevista");
const imagenRevista = document.getElementById("imagenRevista");
const tituloProyectoRevista = document.getElementById("tituloProyectoRevista");
const descripcionProyectoRevista = document.getElementById("descripcionProyectoRevista");
const contadorPaginas = document.getElementById("contadorPaginas");
const btnAnterior = document.getElementById("btnPaginaAnterior");
const btnSiguiente = document.getElementById("btnPaginaSiguiente");

let categoriaActual = null;
let indicePagina = 0;

function mostrarPaginaRevista(direccion = null) {
  const datos = proyectosPorCarpeta[categoriaActual];
  if (!datos) return;

  const pagina = datos.paginas[indicePagina];

  if (direccion) {
    const claseAnimacion = direccion === "siguiente" ? "pasando-siguiente" : "pasando-anterior";
    hojaRevista.classList.add(claseAnimacion);

    setTimeout(() => {
      imagenRevista.src = pagina.imagen;
      tituloProyectoRevista.textContent = pagina.titulo;
      descripcionProyectoRevista.textContent = pagina.descripcion;
      contadorPaginas.textContent = `Página ${indicePagina + 1} de ${datos.paginas.length}`;
      hojaRevista.classList.remove(claseAnimacion);
    }, 180);
  } else {
    imagenRevista.src = pagina.imagen;
    tituloProyectoRevista.textContent = pagina.titulo;
    descripcionProyectoRevista.textContent = pagina.descripcion;
    contadorPaginas.textContent = `Página ${indicePagina + 1} de ${datos.paginas.length}`;
  }
}

carpetas.forEach((carpeta) => {
  carpeta.addEventListener("click", () => {
    categoriaActual = carpeta.getAttribute("data-categoria");
    if (!proyectosPorCarpeta[categoriaActual]) return;

    indicePagina = 0;
    tituloCategoriaRevista.textContent = proyectosPorCarpeta[categoriaActual].titulo;
    mostrarPaginaRevista();
    modalRevista.classList.add("activo");
    modalRevista.setAttribute("aria-hidden", "false");
  });
});

function irPaginaSiguiente() {
  if (!categoriaActual) return;
  const total = proyectosPorCarpeta[categoriaActual].paginas.length;
  indicePagina = (indicePagina + 1) % total;
  mostrarPaginaRevista("siguiente");
}

function irPaginaAnterior() {
  if (!categoriaActual) return;
  const total = proyectosPorCarpeta[categoriaActual].paginas.length;
  indicePagina = (indicePagina - 1 + total) % total;
  mostrarPaginaRevista("anterior");
}

function cerrarModalRevista() {
  modalRevista.classList.remove("activo");
  modalRevista.setAttribute("aria-hidden", "true");
}

btnSiguiente.addEventListener("click", irPaginaSiguiente);
btnAnterior.addEventListener("click", irPaginaAnterior);
cerrarRevista.addEventListener("click", cerrarModalRevista);

// Cerrar haciendo clic fuera del cuadro o usando teclas
modalRevista.addEventListener("click", (e) => {
  if (e.target === modalRevista) cerrarModalRevista();
});

document.addEventListener("keydown", (e) => {
  if (!modalRevista.classList.contains("activo")) return;
  if (e.key === "ArrowRight") irPaginaSiguiente();
  if (e.key === "ArrowLeft") irPaginaAnterior();
  if (e.key === "Escape") cerrarModalRevista();
});


// ===================================================
// 3. FORMULARIO DE CONTACTO (FORMSPREE)
// ===================================================
const formularioContacto = document.getElementById("formulario-contacto");
const estadoEnvio = document.getElementById("estado-envio");
const btnSubmit = document.getElementById("btn-submit");

if (formularioContacto) {
  formularioContacto.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    btnSubmit.disabled = true;
    btnSubmit.textContent = "Enviando...";
    estadoEnvio.textContent = "";
    estadoEnvio.className = "estado-mensaje";

    const datos = new FormData(formularioContacto);

    try {
      const respuesta = await fetch("https://formspree.io/f/myewkqyk", {
        method: "POST",
        body: datos,
        headers: {
          "Accept": "application/json"
        }
      });

      if (respuesta.ok) {
        estadoEnvio.textContent = "¡Mensaje enviado! Te respondo pronto.";
        estadoEnvio.classList.add("exito");
        formularioContacto.reset();
      } else {
        const errorData = await respuesta.json();
        if (errorData.errors) {
          estadoEnvio.textContent = errorData.errors.map(err => err.message).join(", ");
        } else {
          estadoEnvio.textContent = "No se pudo enviar. Intentá de nuevo.";
        }
        estadoEnvio.classList.add("error");
      }
    } catch (error) {
      estadoEnvio.textContent = "Error de conexión. Revisá tu internet.";
      estadoEnvio.classList.add("error");
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.textContent = "Enviar";
    }
  });
}
