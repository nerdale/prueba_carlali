document.addEventListener("DOMContentLoaded", function () {
  const inputSueldo = document.getElementById("sueldo");
  const inputHorasExtras = document.getElementById("horas-extras-trabajadas");
  const selectHorasSemanales = document.getElementById("hora-semanal");
  const inputHoraExtra = document.getElementById("hora-extra");
  const inputTotal = document.getElementById("total");
  const mensajeHora = document.getElementById("mensaje-hora");

  function formatearChileno(numero){
    return `$${numero.toLocaleString("es-CL")}`;
  }

  function calcularYMostrar(){
    const sueldoRaw = inputSueldo.value.replace(/\D/g, "");
    const sueldo = parseInt(sueldoRaw, 10);

    const horasExtrasRaw = inputHorasExtras.value.replace(/\D/g, "");
    const horasExtras = parseInt(horasExtrasRaw, 10);

    // Validación: si no hay sueldo válido, limpiar los valores numéricos
    if (!sueldo || isNaN(sueldo)) {
      inputHoraExtra.value = "";
      inputTotal.value = "";
      return;
    }

    const horasSemanales = parseInt(selectHorasSemanales.value, 10) || 44;
    const valorHoraExtra = ((sueldo * 28) / (30 * horasSemanales * 4)) * 1.5;

    inputHoraExtra.value = formatearChileno(valorHoraExtra);

    // Si no hay horas extras válidas, no calcular el total, pero no limpiar mensaje
    if (!horasExtras || isNaN(horasExtras)){
      inputTotal.value = "";
      return;
    }

    const total = horasExtras * valorHoraExtra;
    inputTotal.value = formatearChileno(total);

    // Actualizar mensaje solo si hay ambos datos
    if (mensajeHora){
      const textoHoras =
        horasExtras === 1 ? "1 hora extra" : `${horasExtras} horas extras`;
      mensajeHora.textContent = `Esto es lo que recibirás por trabajar ${textoHoras}.`;
    }
  }

  inputSueldo.addEventListener("input", calcularYMostrar);
  inputHorasExtras.addEventListener("input", calcularYMostrar);
  selectHorasSemanales.addEventListener("change", calcularYMostrar);
});
