const privateStrings = [ 'string', 'number', 'var', 'print', 'for', 'while', 'equal', 'if', 'else', 'then'];

const regexDiv = new RegExp('</div>', 'g');
const regexBr = new RegExp('<br>', 'g');
const regexEx = new RegExp(';', 'g');
const regexSpan = new RegExp('<span class="highlights">', 'g');
const regexSpan2 = new RegExp('</span>', 'g');
const regexColor = new RegExp('<font color="#2b79c2">', 'g');
const regexColor2 = new RegExp('</font>', 'g');

var PR = ['print', 'dump', 'if', 'else', 'function', 'return'];  // -- Palabras Reservadas.
var TP = ['var', 'string', 'number', 'bool', 'null']  // -- Tipo de Datos.
var OA = ['+', '-', '*', '/'];  // -- Operadores Aritmeticos.
var OR = ['>', '=', '<', '!'];  // -- Operadores Relaciones.
var OL = ['AND', 'OR', '&&', '||']  // -- Operadores  Logicos.
var EL = ['{', '}', '[', ']', '(', ')', ';', ','] // -- Elementos del Sistema. 
var DT = ['texto', 'numero', 'boolean'];  // -- DataType.


var controlador;

data.addEventListener('change', function(e){
  console.log(e)
  console.log(data)
})

data.addEventListener('blur', function(e){
  const line = data.innerHTML;
  console.log(line);

  // Eliminar todas las entidades html.
  const noempty = line.replace(regexDiv, '')
  const nojump = noempty.replace(regexBr, '');
  const datos = nojump.split('<div>');
  highlights(datos);

  const lexico = datos.map(i => {
    // Eliminar los ';'
    const item = i.replace(regexEx, '');
    const nospan = item.replace(regexSpan, '');
    const nospan2 = nospan.replace(regexSpan2, '');

    return nospan2
  }).join(' ');

  // controlador  = evalLexico(lexico);
  // console.log(controlador);
  console.log(evalLexico(lexico));
})

function highlights(text){
  // Aplicar colores a las palabras reservadas
  const mapeo = text.map(item => {
    return item.split(' ').map( d => {
      if(privateStrings.includes(d)){
        return '<span class="highlights">'+d+'</span>'
      }
      return d;
    }).join(' ')
  }).join('<div></div>');

  const nocolor = mapeo.replace(regexColor, '');
  const nocolor2 = nocolor.replace(regexColor2, '');
  data.innerHTML = nocolor2;
}

function evalLexico(code) {
  return code.split(/\s+/)
          .filter(function (t) { return t.length > 0 })
          .map( token =>{
            
            if(PR.indexOf(token)>=0){
              return { type: 'PR', value: token }
            }
            else if(TP.indexOf(token)>=0){
                controlador = token;
                return { type: 'TP', value: token }
            }
            else if(OR.indexOf(token) >= 0){
                return { type: 'OR',value: token };
            } else if (OA.indexOf(token) >= 0){
                return { type: 'OA', value: token };
            } else if(OL.indexOf(token) >= 0){
                return { type: 'OL', value: token };
            } else if(EL.indexOf(token) >= 0){
                return { type: 'EL', value: token};
            } else if(token == 'true'){
                return {type: 'boolean', value: true};
            } else if(token == 'false'){
                return {type: 'boolean', value: false};
            } else if(isNaN(token)){
                if(TP.indexOf(controlador) >= 0){ 
                  controlador = '';
                  return {type: 'VR', value: token}
                }
                return {type: 'texto', value: token};
            } else {
                return {type: 'numero', value: token};
            }
              
        });
}
