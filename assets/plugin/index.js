const consola = document.getElementById('console');

const regexDiv = new RegExp('</div>', 'g');
const regexBr = new RegExp('<br>', 'g');
const regexEx = new RegExp(';', 'g');
const regexSpan = new RegExp('<span class="highlights">', 'g');
const regexSpan2 = new RegExp('</span>', 'g');
const regexColor = new RegExp('<font color="#2b79c2">', 'g');
const regexColor2 = new RegExp('</font>', 'g');

// Expresiones Regulares para la gramatica del compilador.
const nospace = new RegExp('&nbsp', 'g');
const asignador = new RegExp('=', 'g');
const apertura = new RegExp('[(]', 'g');
const cierre = new RegExp('[)]', 'g');

// Expresion Regular para las variables
const regexVariables = new RegExp(/^[a-zA-Z]([a-zA-Z0-9]+)?$/, 'g')

// Palabras Reservadas del Compilador.
var PR = ['print', 'dump', 'if', 'else', 'function', 'return']; // -- Palabras Reservadas.
var TP = ['var', 'string', 'number', 'bool', 'null'] // -- Tipo de Datos.
var OA = ['+', '-', '*', '/']; // -- Operadores Aritmeticos.
var OR = ['&gt', '=', '&lt', '!']; // -- Operadores Relaciones.
var OL = ['AND', 'OR', '&&', '||'] // -- Operadores  Logicos.
var EL = ['{', '}', '[', ']', '(', ')', ';', ','] // -- Elementos del Sistema.
var DT = ['texto', 'numero', 'boolean']; // -- DataType.

// Objeto de Objetos de varibales.
var variables = {};
var controlador;
var texto = "";
var noTextAnlz = true;
var init = false;