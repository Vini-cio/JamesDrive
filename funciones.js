/**************
INICIO
***************/
window.onload = function () {
	canvas = document.getElementById("miCanvas");
	if (canvas && canvas.getContext) {
		ctx = canvas.getContext("2d");
		if (ctx) {
			x = canvas.width / 2;
			mensaje("DRIVE");
			//Instanciamos los objetos de las imagenes
			imgObsta_1 = new Image();
			imgObsta_2 = new Image();
			imgObsta_3 = new Image();
			imgCarrito = new Image();
			//Cargamos las imagenes
			imgObsta_1.src = "src/obsta_1.png";
			imgObsta_2.src = "src/obsta_2.png";
			imgObsta_3.src = "src/obsta_3.png";
			imgCarrito.src = "src/carrito.png";
			//Creamos los obstaculos
			imgCarrito.onload = function () {
				carrito = new carrito(0,450);
			}
			imgObsta_1.onload = function () {
				obsta_1 = new Obstaculo_1(240,0);
			}
			imgObsta_2.onload = function () {
				obsta_2 = new Obstaculo_2(120,0);
			}
			imgObsta_3.onload = function () {
				obsta_3 = new Obstaculo_3(40, 0);
				setTimeout(anima, 1500);
			}
			//Esperamos un intervalo de 1 segundo
			//Y llamamos a la funcion para calcular el puntaje
			setInterval('puntaje()',1000);
		} else {
			alert("Error al crear tu contexto");
		}
	}
}
/*************
LISTENER
**************/
window.requestAnimationFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function (callback) { window.setTimeout(callback, 17); }
})();
//Comprueba si la tecla se mantiene pulsada
document.addEventListener("keydown", function (e) {
	teclaPulsada = e.keyCode;
	tecla[e.keyCode] = true;
});
//Comprueba si la tecla se dejo de pulsar
document.addEventListener("keyup", function (e) {
	tecla[e.keyCode] = false;
});
/*******************
VARIABLES
********************/
var canvas, ctx;
var fondo;
var x = 100;
var y = 450;
var teclaIzquierda = 37;
var teclaDerecha = 39;
var teclaArriba = 38;
var teclaAbajo = 40;
var imgCarrito, imgObsta_3, imgObsta_2, imgObsta_1;
var teclaPulsada = null;
var tecla = [];
var endGame = false;
var puntos = 0;
/*****************
OBJETOS
******************/
function carrito(x,y) {
	this.x = x;
	this.y = y;
	this.w = 30;
	this.h = 15;
	this.dibuja = function (x,y) {
		this.x = x;
		this.y = y;
		ctx.drawImage(imgCarrito,0   , 0   , 40  , 55  , this.x, this.y, 35  , 35);
	};
}
function Obstaculo_1(x, y) {
	this.x = x;
	this.y = y;
	//Velocidad del obstaculo
	this.w = 35;
	this.dy = 3;
	this.dibuja = function () {
		//Damos la posicion del obstaculo
		if (this.y > canvas.height - 20){
			this.y = 0;
			//Generamos una posicion de forma aleatoria para que inicie nuestro obtaculo
			this.x = getRandomArbitrary(0,300 - 20);
		}
		if (this.y < 0){
			this.dy++;
		}
		this.y += this.dy;
		//Dibujamos el obstaculo
		ctx.drawImage(imgObsta_1, 0   , 0   , 80  , 32  , this.x, this.y, 35  , 35);
		//           (imgFile, xini, yini, wimg, himg, xpos  , ypos  , wrez, hrez)
	};
}
function Obstaculo_2(x, y) {
	this.x = x;
	this.y = y;
	this.w = 35;
	this.dy = 5;
	this.dibuja = function () {
		if (this.y > canvas.height - 20){
			this.y = 0;
			this.x = getRandomArbitrary(0,300 - 20);
		}
		if (this.y < 0){
			this.dy++;
		}
		this.y += this.dy;
		ctx.drawImage(imgObsta_2, 0   , 0   , 126  , 60  , this.x, this.y, 35  , 35);
	};
}
function Obstaculo_3(x, y) {
	this.x = x;
	this.y = y;
	this.w = 35;
	this.dy = 7;
	this.dibuja = function () {
		if (this.y > canvas.height - 20){
			this.y = 0;
			this.x = getRandomArbitrary(0,300 - 20);
		}
		if (this.y < 0){
			this.dy++;
		}
		this.y += this.dy;
		ctx.drawImage(imgObsta_3, 0   , 0   , 80  , 32  , this.x, this.y, 45  , 45);
	};
}
/*****************
FUNCIONES
******************/
//Aqui iniciamos todas las funciones necesarias
function anima() {
	if (endGame == false) {
		requestAnimationFrame(anima);
		verifica();
		colisiones();
		pinta();
	}
}
//Metodo para genear un numero randomico
function getRandomArbitrary(min, max) {
	//Obtenemos un # de forma random
	return Math.random() * (max - min) + min;
}
//Metodo para visualizar mensajes
function mensaje(cadena) {
	var lon = (canvas.width - (15 * cadena.length)) / 2;
	ctx.fillStyle = "white";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "bold 25px Arial";
	ctx.fillText(cadena, lon, 220);
}
//Metodo dque suma el puntaje
function puntaje(){
	//Valor de puntos por cada segundo
	puntos += 10;
}
//Metodo que controla las colisiones con los obtaculos
function colisiones() {
	if (obsta_1.x < carrito.x + 35 &&
		obsta_1.x + 35 > carrito.x &&
		obsta_1.y < carrito.y + 35 &&
		35 + obsta_1.y > carrito.y) {
		gameOver();
	}
	if (obsta_2.x < carrito.x + 35 &&
		obsta_2.x + 35 > carrito.x &&
		obsta_2.y < carrito.y + 35 &&
		35 + obsta_2.y > carrito.y) {
		gameOver();
	}
	if (obsta_3.x < carrito.x + 35 &&
		obsta_3.x + 35 > carrito.x &&
		obsta_3.y < carrito.y + 35 &&
		35 + obsta_3.y > carrito.y) {
		gameOver();
	}
}
//Metodo para visualizar el puntaje al terminar el juego
function verPuntaje(){
	mensaje("Puntaje: "+puntos);
}
//Metodo al termianr el juego
function gameOver() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	mensaje("GAME OVER");
	setTimeout(verPuntaje, 1500);
	endGame = true;
}
//Metodo que actualiza el puntaje en tiempo real
function score() {
	ctx.save();
	ctx.fillStyle = "white";
	ctx.clearRect(0, 0, canvas.width, 20);
	ctx.font = "bold 12px Courier";
	ctx.fillText("SCORE: " + puntos, 10, 20);
	ctx.restore();
}
//Metodo que mueve el vehiculo
function verifica() {
	//Desplaza el carrito por el canvas
	if (tecla[teclaDerecha]) x += 5;
	if (tecla[teclaIzquierda]) x -= 5;
	if (tecla[teclaArriba]) y -= 5;
	if (tecla[teclaAbajo]) y += 5;
	//Verifica que el carrito no se salga del canvas
	if (x > canvas.width - 20) x = canvas.width - 20;
	if (x < 0) x = 0;
	if (y > canvas.height - 20) y = canvas.height - 20;
	if (y < 0) y = 0;
}
//Metodo que dibuja todos los objetos en la pista
function pinta() {
	//Limpia el canvas de todos los objetos
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Dibuja el puntaje
	score();
	//Dibuja el carrito
	carrito.dibuja(x,y);
	//Dibuja los obstaculos
	obsta_1.dibuja();
	obsta_2.dibuja();
	obsta_3.dibuja();
}

