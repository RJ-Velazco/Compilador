function includes(label, arr, v){
  for (var i = 0; i < arr.length; i++) {
    if(label.includes(arr[i])){
      return (v ? arr[i] : true);
    }
  }

  return false;
}

function evalSintactico(code) {
  const lines = code.split(';')

  for (let i = 0; i < lines.length; i++) {
    // Dividr las líneas en palabras.
    // Iterar cada línea
    const words = lines[i].split(' ');

    for (let index = 0; index < words.length; index++) {
      let w = words[index];

      // Encontrar si hay una palabra.
      let paragraph = false;
      if(w.includes('"') && !paragraph){
        for (let i = index+1; i < words.length; i++) {
          w = w.concat(' ', words[i]);

          if(w.includes('"')){
            paragraph = true;
            index = i;
            break;
          }
        }

        if(!paragraph){
          console.error(new Error("El texto está incompleto."))
          return;
        }
      }

      // Detectar los elementos reservados del lenguaje.
      if(includes(w, TP)){
        console.log('Tipo de dato: '+includes(w, TP, true))
      } else if(includes(w, OR)){
        console.log('Operador: '+includes(w, OR, true))
      } else if(includes(w, OA)){
        console.log('Operador: '+includes(w, OA, true))
      } else if(includes(w, OL)){
        console.log('Operador: '+includes(w, OL, true))
      } else if(includes(w, EL)){
        console.log('Elemento del sistema: '+includes(w, EL, true))
      } else if(includes(w, DT)){
        console.log('Tipo específico: '+includes(w, DT, true))
      } else if(includes(w, PR)){
        console.log('Palabra reservada: '+includes(w, PR, true))
      } else {

        // Detectar la referencia de variable y uso.
        if(words[index-1]){
          const wLast = words[index-1];
          if(includes(wLast, TP)){
            console.log('Definición implícita: '+w)
          } else if(includes(wLast, DT)){
            console.log('Definición explícita ('+includes(wLast, DT, true)+'): '+w)
          } else if(includes(wLast, OR)){
            console.log('Comparación ('+includes(wLast, OR, true)+'): '+w)
          } else if(includes(wLast, OA)){
            console.log('Operación ('+includes(w, OA, true)+'): '+w)
          } else if(includes(wLast, OL)){
            console.log('Relación ('+includes(w, OL, true)+'): '+w)
          } else if(typeof w === "number"){
            console.log('Número: '+w)
          } else if(typeof w === "string"){
            console.log("Palabra: "+w)
          } else {
            console.log('Valor desconocido: '+w)
          }

          // Detetar cualquier otra escritura.
        } else {
          if(typeof w === "number"){
            console.log('Número: '+w)
          } else if(typeof w === "string"){
            console.log("Palabra: "+w)
          }
        }
      }
    }
  }

}
