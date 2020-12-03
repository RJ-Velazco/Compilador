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
              action: 'Identificador',
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

        if(lastToken.type === 'TP' || lastToken.type === 'OR' || lastToken.type === 'PR' || lastToken.type === 'OA' || lastToken.value === '(' || nextToken.value === ")"){
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

  return {
    tokens: _Tokens,
    vars: _Vars
  }
}
