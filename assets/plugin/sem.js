const functions = {
  'print': (t, inner) => consola.innerHTML = inner.concat(t.value),
  'dump': (t, inner) => consola.innerHTML = inner.concat(t.type),
  'println': (t, inner) => consola.innerHTML = inner.concat(t.value, '<br>'),
  '_print': (t) => t.value,
  '_dump': (t) => t.type,
}

const logicalFunc = {
  '+': (n, m) => Number(n.value)+Number(m.value),
  '-': (n, m) => Number(n.value)-Number(m.value),
  '*': (n, m) => Number(n.value)*Number(m.value),
  '/': (n, m) => {
    if(m.value == 0 || n.value == 0){
      throw new Error('Imposible dividir un factor con 0.')
    }

    return Number(n.value)/Number(m.value);
  },
}

function doAssignation(index, tokens, vars){
  let x = index+1;
  let value = 0;
  let type = "";
  let pass = true;
  let firstPass = false;

  while(pass){
    const token = tokens[x];
    const otherToken = tokens[x+2];

    if(token && tokens[x+1] && otherToken){

      const firstPlace = vars[token.value] || token;
      const otherPlace = vars[otherToken.value] || otherToken;

      if(otherPlace.type == 'numero' && tokens[x+1].type != 'PR' && firstPlace.type == 'numero'){
        value = makeOperations((firstPass ? {value: value} : firstPlace), tokens[x+1], otherPlace, vars);
        x = x+2;
        firstPass = true;
        type = "numero";
      } else if (otherPlace.type == 'texto' && firstPlace.type == 'texto'){
        value = firstPass ? value.concat(otherPlace.value) : firstPlace.value.concat(otherPlace.value)
        x = x+2;
        firstPass = true;
        type = "texto"
      } else {
        if(tokens[x+1].type === 'OA' || tokens[x+1].type != 'PR'){
          throw new Error('No podemos realizar esta operacion... Pruebe con un compilador real')
        } else {
          pass = false;
        }
      }
    } else {
      pass = false;
    }
  }

  vars[tokens[index-1].value] = {value, type};
  return x-1;
}

function doOperation(index, tokens, vars, inner){
  const func = functions[tokens[index].value];

  let x = index+1;
  let value = 0;
  let pass = true;
  let type = "";
  let firstPass = false;

  while(pass){
    const token = tokens[x];
    const otherToken = tokens[x+2];

    if(token && tokens[x+1] && otherToken){

      const firstPlace = vars[token.value] || token;
      const otherPlace = vars[otherToken.value] || otherToken;

      if(otherPlace.type == 'numero' && tokens[x+1].type != 'PR' && firstPlace.type == 'numero'){
        value = makeOperations((firstPass ? {value: value} : firstPlace), tokens[x+1], otherPlace, vars);
        x = x+2;
        firstPass = true;
        type = "numero";
      } else if (otherPlace.type == 'texto' && tokens[x+1].type != 'PR' && firstPlace.type == 'texto'){
        value = firstPass ? value.concat(otherPlace.value) : firstPlace.value.concat(otherPlace.value)
        x = x+2;
        firstPass = true;
        type = "texto"
      } else {
        if(tokens[x+1].type === 'OA' || tokens[x+1].type != 'PR'){
          throw new Error('No podemos realizar esta operacion... Pruebe con un compilador real')
        } else {
          pass = false;
        }
      }
    } else {
      pass = false;
    }
  }

  func({value: value, type: type}, inner)
  return x-1;
}

function makeOperations(token, operation, nextToken, vars){
  return logicalFunc[operation.value](token, nextToken)
}

function evalSemantico(data){
  const { tokens, vars } = data;

  for (let i = 0; i < tokens.length; i++) {
    const inner = consola.innerHTML;
    const token = tokens[i];
    const nextToken = tokens[i+1];
    const lastToken = tokens[i-1];

    if(token.type == 'OR'){
      if(vars[lastToken.value]){
        const target = vars[nextToken.value] || nextToken

        if(tokens[i+2]){
          if(tokens[i+2].type == 'OA'){
            i = doAssignation(i, tokens, vars);
          } else {
            vars[lastToken.value] = target;
          }
        } else {
          vars[lastToken.value] = target;
        }
      }
    }

    // Function
    if(functions[token.value] && nextToken){
      if(functions[nextToken.value]){
        throw new Error('No es posible concatenar dos funciones')
      } else {
        if(tokens[i+2]){
          if(tokens[i+2].type == 'OA'){
            i = doOperation(i, tokens, vars, inner);
          } else {
            functions[token.value](vars[nextToken.value] || nextToken, inner)
          }
        } else {
          functions[token.value](vars[nextToken.value] || nextToken, inner)
        }
      }
    }
  }
}
