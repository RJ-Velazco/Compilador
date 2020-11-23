function stringify(tokens){
  const arr = [];

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    if(token.type === "texto"){
      if(tokens[i].value.includes("'") && tokens[i].value.lastIndexOf("'") === tokens[i].value.indexOf("'")){
        token.value = token.value.replace("'", '')

        let alt = 1;
        while(tokens[i+alt]){
          if(tokens[i+alt].value.includes("'")){
            token.value = token.value.concat(' ', tokens[i+alt].value.replace("'", ''))
            alt++;
          } else {
            break;
          }
        }

        i = i + alt-1;
      } else {
        token.value = token.value.replace("'", '')
        token.value = token.value.replace("'", '')
      }

      if(token.value.includes("'"))
        throw new Error('El string no está correctamente formado.');
    }
    arr.push(token);
  }

  return arr;
}

function evalSintactico(tokens) {
  const _Tokens = tokens;
  const _Vars = [];

  for (var i = 0; i < _Tokens.length; i++) {
    const token = _Tokens[i];
    //console.log(token)

    if(i > 0){

      /* Si el token es una variable */
      if(token.type === 'VR'){
        if(_Vars[token.value]){
          console.log({
            action: 'Llamada',
            ...token
          })
        } else {
          if(_Tokens[i-1].type !== 'TP'){
            throw new Error('El identificador ('+token.value+') no ha sido establecido.')
          } else {
            _Vars[token.value] = token;
            console.log({
              action: 'Establecimiento',
              ...token
            })
          }
        }
      }

      /* El token es una palabra reservada */
      if(token.type === 'PR'){
        console.log({
          action: 'Instrucción',
          ...token
        })
      }


      /* El token es una expresión relacional */
      if(token.type === 'OR'){

        /* El token está asignando una variable */
        if(token.value === '='){

          /* El token anterior es una variable */
          if(_Tokens[i-1].type === 'VR'){
            console.log({
              action: 'Asignación',
              ...token
            })

            /* El token anterior no es una variable */
          } else {
            throw new Error('Imposible asignar una constante sin identificador')
          }

          /* El token es una operación relacional */
        } else {
          console.log({
            action: 'Conjución',
            ...token
          })
        }
      }

      /* El token es una expresión aritmética */
      if(token.type==='OA'){

        /* Hay un token después de la expresión */
        if(_Tokens[i+1]){
          console.log({
            action: 'Operación',
            ...token
          })
        } else {
          throw new Error('Imposible operar sobre un identificador que no existe');
        }
      }

      if(token.value === '('){
        /* Hay un token después de la expresión */
        const nexToken = _Tokens[i+1];
        if(nexToken){
          if(nexToken.type !== 'texto' && nexToken.type !== 'numero'){
            throw new Error('No es posible encapsular un identificador ('+nexToken.value+') que no sea un valor textual o numérico.')
          } else {
            console.log({
              action: 'Encapsulación',
              ...token
            })
          }
        } else {
          throw new Error('No hay un elemento para abrir y encapsular.');
        }
      }
      if(token.value === ')'){
        /* Hay un token antes de la expresión */
        const lastToken = _Tokens[i-1]

        if(lastToken.type !== 'texto' && lastToken.type !== 'numero'){
          throw new Error('No es posible encapsular un identificador ('+lastToken.value+') que no sea un valor textual o numérico.')
        } else {
          console.log({
            action: 'Encapsulación',
            ...token
          })
        }
      }

      if(token.type === "texto"){
        const lastToken = _Tokens[i-1];
        const nextToken = _Tokens[i+1] || {};

        if(lastToken.value === '='){
          console.log({
            action: 'Asignación',
            ...token
          })
        } else if(lastToken.type === 'PR' || (lastToken.value === '(' && nextToken.value === ')')){
          console.log({
            action: 'Constante',
            ...token
          })
        } else {
          throw new Error('El texto "'+token.value+'" no forma parte de una operación definida.')
        }
      }

      if(token.type === 'numero'){
        const lastToken = _Tokens[i-1];
        const nextToken = _Tokens[i+1];
        if(lastToken.type === 'TP'){
          console.log({
            action: 'Asignación',
            ...token
          })
        } else if(lastToken.type === 'OR' || lastToken.type === 'PR' || lastToken.type === 'OA' || lastToken.value === '(' || nextToken.value === ")"){
          console.log({
            action: 'Constante',
            ...token
          })
        } else {
          throw new Error('El número ('+token.value+') no forma parte de una operación definida.')
        }
      }

    } else {
      /* El primer token no puede ser un texto / número / OA / OR / OL / EL */

      if(token.type === "numero" || token.type === "texto"){
        throw new Error('Identificador no establecido ('+token.value+')');
      } else {

        /* El token #1 solo puede ser una Declaración o Instrucción */
        if(token.type==='TP'){
          console.log({
            action: 'Declaración',
            ...token
          })
        } else if (token.type==='PR'){
          console.log({
            action: 'Instrucción',
            ...token
          })
        } else {
          throw new Error('No se reconoce la instrucción ('+token.value+').')
        }

      }
    }
  }

  /*
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
  */

}
