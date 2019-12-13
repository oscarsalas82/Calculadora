var calculadora = {

	visor: document.getElementById("display"),
	valorDisplay: "0",
	oper: "",
	primerNumero: 0,
	segundoNumero: 0,
	ultimoNumero: 0,
	resultado: 0,
	auxTeclaIgual: false,

	init: (function(){
		this.eFormatoBotones(".tecla");
		this.FuncionOperacionesMatmaticas();
	}),

	eFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eBotonChico;
			x[i].onmouseleave = this.eBotonOriginal;
		};
	},

	eBotonChico: function(event){
		calculadora.BotonChico(event.target);
	},

	eBotonOriginal: function(event){
		calculadora.aBotonOriginal(event.target);
	},

	BotonChico: function(elemento){
		var x = elemento.id;
		if (x=="0" || x=="igual" || x=="punto" || x=="1" || x=="2" || x=="3" ) {
			elemento.style.width = "27%";
			elemento.style.height = "61px";
		} else if(x=="mas") {
			elemento.style.width = "87%";
			elemento.style.height = "97%";
		} else {
		elemento.style.width = "20%";
		elemento.style.height = "61px";
		}
	},

	aBotonOriginal: function(elemento){
		var x = elemento.id;
		if (x=="0" || x=="igual" || x=="punto" || x=="1" || x=="2" || x=="3" ) {
			elemento.style.width = "28%";
			elemento.style.height = "61.91px";
		} else if(x=="mas") {
			elemento.style.width = "89%";
			elemento.style.height = "89%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "61.91px";
		}
	},

	FuncionOperacionesMatmaticas: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.Numero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.Numero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.Numero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.Numero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.Numero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.Numero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.Numero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.Numero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.Numero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.Numero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.limpiarDisplay();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.btnSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.btnDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verMate();});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresooper("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresooper("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresooper("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresooper("+");});
	},

	limpiarDisplay: function(){

	    this.valorDisplay = "0";
		this.oper = "";
		this.primerNumero = 0;
		this.segundoNumero = 0;
		this.resultado = 0;
		this.auxTeclaIgual = false;
		this.ultimoNumero = 0;
		this.updateVisor();
	},

	btnSigno: function(){
		if (this.valorDisplay !="0") {
			var aux;
			if (this.valorDisplay.charAt(0)=="-") {
				aux = this.valorDisplay.slice(1);
			}	else {
				aux = "-" + this.valorDisplay;
			}
		this.valorDisplay = "";
		this.valorDisplay = aux;
		this.updateVisor();
		}
	},

	btnDecimal: function(){
		if (this.valorDisplay.indexOf(".")== -1) {
			if (this.valorDisplay == ""){
				this.valorDisplay = this.valorDisplay + "0.";
			} else {
				this.valorDisplay = this.valorDisplay + ".";
			}
			this.updateVisor();
		}
	},

	Numero: function(valor){
		if (this.valorDisplay.length < 8) {

			if (this.valorDisplay=="0") {
				this.valorDisplay = "";
				this.valorDisplay = this.valorDisplay + valor;
			} else {
				this.valorDisplay = this.valorDisplay + valor;
			}
		this.updateVisor();
		}
	},

	ingresooper: function(oper){
		this.primerNumero = parseFloat(this.valorDisplay);
		this.valorDisplay = "";
		this.oper = oper;
		this.auxTeclaIgual = false;
		this.updateVisor();
	},

	verMate: function(){

		if(!this.auxTeclaIgual){
			this.segundoNumero = parseFloat(this.valorDisplay);
			this.ultimoNumero = this.segundoNumero;
			this.realizaroper(this.primerNumero, this.segundoNumero, this.oper);

		} else {
			this.realizaroper(this.primerNumero, this.ultimoNumero, this.oper);
		}

		this.primerNumero = this.resultado;
		this.valorDisplay = "";

		if (this.resultado.toString().length < 9){
			this.valorDisplay = this.resultado.toString();
		} else {
			this.valorDisplay = this.resultado.toString().slice(0,8) + "...";
		}

		this.auxTeclaIgual = true;
		this.updateVisor();

	},

	realizaroper: function(primerNumero, segundoNumero, oper){
		switch(oper){
			case "+":
				this.resultado = eval(primerNumero + segundoNumero);
			break;
			case "-":
				this.resultado = eval(primerNumero - segundoNumero);
			break;
			case "*":
				this.resultado = eval(primerNumero * segundoNumero);
			break;
			case "/":
				this.resultado = eval(primerNumero / segundoNumero);
			break;
		}
	},

	updateVisor: function(){
		this.visor.innerHTML = this.valorDisplay;
	}

};

calculadora.init();
