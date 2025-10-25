// Función pequeña para el botón en index.html
function irACotizar() {
  window.location.href = "cotizar.html";
}

// Función para cotizar (maneja el submit del form)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCotizar");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // evita recargar la página
      cotizar();
    });

    // Cambiar imagen de preview según tipo seleccionado (opcional)
    const tipoSelect = document.getElementById("tipo");
    if (tipoSelect) {
      tipoSelect.addEventListener("change", actualizarImagenPreview);
      actualizarImagenPreview(); // inicializa preview
    }
  }
});

function cotizar() {
  const tipo = document.getElementById("tipo").value;
  const relleno = document.getElementById("relleno").value;
  const tamano = document.getElementById("tamano").value;
  const cantidad = parseInt(document.getElementById("cantidad").value) || 1;
  const resultado = document.getElementById("resultado");

  if (!tipo || !relleno || !tamano) {
    resultado.innerHTML = "<p style='color:red;'>Por favor selecciona todas las opciones.</p>";
    return;
  }

  // Precios base por tamaño (en quetzales)
  let precioBase = 0;
  if (tamano === "pequeno") precioBase = 80;
  else if (tamano === "mediano") precioBase = 150;
  else if (tamano === "grande") precioBase = 230;

  // Ajuste según relleno
  if (relleno === "nuez" || relleno === "chocolate") precioBase += 20;
  else if (relleno === "fresa") precioBase += 10;

  // Ajuste según tipo de pastel (ejemplo: Red Velvet +20)
  if (tipo === "redvelvet") precioBase += 20;
  if (tipo === "zanahoria") precioBase += 10;

  // Total por cantidad
  const total = precioBase * cantidad;

  // Nombres legibles
  const nombres = {
    chocolate: "Chocolate",
    vainilla: "Vainilla",
    redvelvet: "Red Velvet",
    zanahoria: "Zanahoria"
  };
  const rellenosNombres = {
    crema: "Crema pastelera",
    fresa: "Fresa",
    chocolate: "Chocolate",
    nuez: "Nuez"
  };
  const tamanos = {
    pequeno: "Pequeño (6 porciones)",
    mediano: "Mediano (12 porciones)",
    grande: "Grande (20 porciones)"
  };

  resultado.innerHTML = `
    <h3>Tu cotización</h3>
    <p><strong>Pastel:</strong> ${nombres[tipo] || tipo}</p>
    <p><strong>Relleno:</strong> ${rellenosNombres[relleno] || relleno}</p>
    <p><strong>Tamaño:</strong> ${tamanos[tamano] || tamano}</p>
    <p><strong>Cantidad:</strong> ${cantidad}</p>
    <h2>Total estimado: Q${total}.00</h2>
    <p>💌 Si te gusta la cotización, contáctanos para confirmar el pedido.</p>
  `;
}

// Función opcional: actualiza la imagen de preview según selección
function actualizarImagenPreview() {
  const tipo = document.getElementById("tipo").value;
  const img = document.getElementById("imgPastel");
  if (!img) return;

  const urls = {
    chocolate: "https://images.unsplash.com/photo-1608198093002-ad4e005484d8?auto=format&fit=crop&w=800&q=60",
    vainilla: "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=800&q=60",
    redvelvet: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60",
    zanahoria: "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=800&q=60"
  };

  img.src = urls[tipo] || "https://images.unsplash.com/photo-1608198093002-ad4e005484d8?auto=format&fit=crop&w=800&q=60";
}
