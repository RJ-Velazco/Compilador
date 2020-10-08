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
