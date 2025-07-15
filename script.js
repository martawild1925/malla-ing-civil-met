const ramos = {
  "Semestre 1": [
    { id: "FIN100", nombre: "Desarrollo Integral", prereqs: [] },
    { id: "MAT1001", nombre: "Fund. Matemáticas", prereqs: [] },
    { id: "MET143", nombre: "Fund. de Procesos", prereqs: [] },
    { id: "QUI100", nombre: "Química Ing.", prereqs: [] },
  ],
  "Semestre 2": [
    { id: "EIQ120", nombre: "Fund. Ingeniería", prereqs: ["MET143"] },
    { id: "MAT1002", nombre: "Cálculo Dif. e Integral", prereqs: ["MAT1001"] },
    { id: "QUI161", nombre: "Química Inorgánica", prereqs: ["QUI100"] },
  ]
};

const estado = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function guardarEstado() {
  localStorage.setItem("estadoRamos", JSON.stringify(estado));
}

function estaAprobado(id) {
  return estado[id] === "aprobado";
}

function puedeActivarse(ramo) {
  return ramo.prereqs.every(pr => estaAprobado(pr));
}

function crearMalla() {
  const contenedor = document.getElementById("malla");

  Object.entries(ramos).forEach(([semestre, lista]) => {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<div class="titulo-semestre">${semestre}</div>`;

    const box = document.createElement("div");
    box.className = "ramos";

    lista.forEach(ramo => {
      const btn = document.createElement("div");
      btn.className = "ramo";
      btn.id = ramo.id;
      btn.textContent = ramo.nombre;

      if (!puedeActivarse(ramo)) {
        btn.classList.add("bloqueado");
      } else if (estaAprobado(ramo.id)) {
        btn.classList.add("aprobado");
      }

      btn.addEventListener("click", () => {
        if (btn.classList.contains("aprobado")) {
          delete estado[ramo.id];
        } else {
          estado[ramo.id] = "aprobado";
        }
        guardarEstado();
        location.reload();
      });

      box.appendChild(btn);
    });

    div.appendChild(box);
    contenedor.appendChild(div);
  });
}

crearMalla();

