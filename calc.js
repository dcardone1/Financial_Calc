var result_id;

var moneyFormatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

function formatCurrency(value) {
    if (isNaN(value)) return moneyFormatter.format(0);
    return moneyFormatter.format(value);
}

// Convierte "$ 1.200,50" -> 1200.50
function parseCurrency(value) {
    if (typeof value !== "string") return parseFloat(value);
    var cleaned = value
        .replace(/\$/g, "")
        .replace(/\s/g, "")
        .replace(/\./g, "")
        .replace(",", ".");
    return parseFloat(cleaned);
}

// Muestra el número "pelado" al hacer foco (para editar cómodo) y lo formatea al salir
function attachCurrencyFormatting(id) {
    var el = document.getElementById(id);
    el.addEventListener("focus", function () {
        var raw = parseCurrency(el.value);
        el.value = isNaN(raw) ? "" : raw;
    });
    el.addEventListener("blur", function () {
        var raw = parseCurrency(el.value);
        el.value = formatCurrency(isNaN(raw) ? 0 : raw);
    });
}

function i_12 (){
    var i = parseFloat(document.getElementById("i").value);
    i = i / 12
    document.getElementById("i").value = i
}

function i_100 (){
    var i = parseFloat(document.getElementById("i").value);
    i = i / 100
    document.getElementById("i").value = i
}

function calcular (){

    var VP = parseCurrency(document.getElementById("VP").value);
    var VF = parseCurrency(document.getElementById("VF").value);
    var i = parseFloat(document.getElementById("i").value);
    var n = parseFloat(document.getElementById("periods").value);
    var R = parseCurrency(document.getElementById("R").value);

    var resultado = formula(VP, VF, i, n, R);

    if (result_id === "VP" || result_id === "VF" || result_id === "R") {
        document.getElementById(result_id).value = formatCurrency(parseFloat(resultado));
    } else {
        document.getElementById(result_id).value = resultado;
    }
}

function resetForm(){
    document.getElementById("VF_r").checked = true;
    document.getElementById("VP_r").checked = false;
    document.getElementById("i_r").checked = false;
    document.getElementById("n_r").checked = false;
    document.getElementById("R_r").checked = false;
    document.getElementById("R_r").disabled = true;

    document.getElementById("anualidad").checked = false;
    document.getElementById("anualidad_ordinaria").checked = true;
    document.getElementById("anualidad_anticipada").checked = false;
    document.getElementById("con_VP").checked = true;
    document.getElementById("con_VF").checked = false;

    document.getElementById("i").value = 0.01;
    document.getElementById("periods").value = 0;
    document.getElementById("VP").value = formatCurrency(0);
    document.getElementById("VF").value = formatCurrency(0);
    document.getElementById("R").value = formatCurrency(0);

    var L = document.getElementsByTagName("input");
    for (const inp of L){
        inp.style.backgroundColor = "";
    }

    document.getElementById("amort_button").style.display = "none";
    document.getElementById("amortizacion_container").style.display = "none";
    document.getElementById("amortizacion_body").innerHTML = "";

    showFormula();
}

function init(){
    ["VP", "VF", "R"].forEach(attachCurrencyFormatting);
    resetForm();
}

function newtonMethod(VP, VF, i, n, R, iterations, formulaAux){

    var h = 0.000001;
    for (var iter=0; iter<iterations; iter++){
        i = i - h / (formulaAux(VP, VF, i + h, n, R) / formulaAux(VP, VF, i, n, R)-1.0);
        if (Math.abs(formulaAux(VP, VF, i, n, R))<0.01){
            return i.toFixed(8);
        }
    }
    return 0;

}

function setBackColor(id){
    var L = document.getElementsByTagName("input");
    for (const i of L){
        i.style.backgroundColor = "";
    }
    document.getElementById(id).style.backgroundColor = "#3193f5";
}

//show the corresponding formula according to the selected calculation
function showFormula() {
    var checkBoxAnualidad = document.getElementById("anualidad")
    if (!checkBoxAnualidad.checked){
        document.getElementById("R_r").disabled = true
        document.getElementById("amort_button").style.display = "none";
        document.getElementById("amortizacion_container").style.display = "none";
        var r  = document.getElementById("VP_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$VP ={ VF\\over\(1 + i)^n}$$";
            document.getElementById("description_paragraph").innerHTML = 
            "Se descuenta (trae a valor presente) el Valor Futuro a la tasa de interés i durante n períodos, para saber cuánto vale hoy un monto que se cobrará en el futuro.";
            MathJax.typeset();
            result_id="VP"
            formula = function (VP, VF, i, n, R) {
                return (VF / Math.pow(1 + i, n)).toFixed(2);
            }
        }
        r = document.getElementById("VF_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$VF = VP(1+i)^n$$";
            document.getElementById("description_paragraph").innerHTML = 
            "Se capitaliza el Valor Presente a la tasa de interés i durante n períodos, para saber en cuánto se convierte si se deja crecer con interés compuesto.";
            MathJax.typeset();
            result_id = "VF";
            formula = function (VP, VF, i, n, R) {
                return (VP*Math.pow(1 + i, n)).toFixed(2);
            }
        }
        r = document.getElementById("i_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$i = \\sqrt[n]{VF\\over\ VP}-1$$";
            document.getElementById("description_paragraph").innerHTML = 
            "Se calcula la tasa de interés por período necesaria para que el Valor Presente se convierta en el Valor Futuro en n períodos.";
            MathJax.typeset();
            result_id = "i";
            formula = function (VP, VF, i, n, R) {
                return (Math.pow(VF/VP, 1.0/n)-1).toFixed(8);
            }
        }
        r = document.getElementById("n_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$n = {ln({VF\\over\ VP})\\over\{ln(1+i)}}$$";
            document.getElementById("description_paragraph").innerHTML =
            "Se calcula la cantidad de períodos necesarios para que, a la tasa i, el Valor Presente se convierta en el Valor Futuro.";
            MathJax.typeset();
            result_id = "periods";
            formula = function (VP, VF, i, n, R) {
                return (Math.log(VF/VP)/Math.log(1+i)).toFixed(2);
            }
        }
    }
    else if (document.getElementById("anualidad_ordinaria").checked){
        document.getElementById("R_r").disabled = false
        if (document.getElementById("con_VP").checked) {
            document.getElementById("amort_button").style.display = "inline-block";
        } else {
            document.getElementById("amort_button").style.display = "none";
            document.getElementById("amortizacion_container").style.display = "none";
        }
        var r = document.getElementById("VP_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = 
            "$$VP = R\\Big[{\\sum_{t=1}^n {1\\over\ {(1+i)^t}}}\\Big] = R\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]$$";
            document.getElementById("description_paragraph").innerHTML = 
            "Se calcula el Valor Presente de una serie de n pagos iguales (R), realizados al final de cada período, descontados a la tasa i.";
            MathJax.typeset();
            result_id = "VP";
            formula = function (VP, VF, i, n, R) {
                return (R*(1-1/Math.pow(1+i, n))/i).toFixed(2);
            }
        }
        r = document.getElementById("VF_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = 
            "$$VF = R\\Big[{\\sum_{t=1}^n {(1+i)^{n-t}}}\\Big] = R\\Big[{{(1+i)^n-1}\\over\ i}\\Big]$$";
            document.getElementById("description_paragraph").innerHTML = 
            "Se calcula el Valor Futuro de una serie de n pagos iguales (R), realizados al final de cada período, capitalizados a la tasa i.";
            MathJax.typeset();
            result_id = "VF";
            formula = function (VP, VF, i, n, R) {
                return (R * (Math.pow(1 + i, n)-1) / i).toFixed(2);
            }
        }
        if(document.getElementById("con_VP").checked){
            r = document.getElementById("i_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML =
                "$$VP = R\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]$$";
                document.getElementById("description_paragraph").innerHTML = 
                "Se calcula, de forma numérica (método de Newton), la tasa de interés i que hace que n pagos iguales (R) al final de cada período equivalgan al Valor Presente.";
                MathJax.typeset();
                result_id = "i";
                formula = function (VP, VF, i, n, R) {
                    f = function (VP, VF, i, n, R) {
                        return VP - R * (1-1/Math.pow(1 + i, n)) / i;
                    }
                    var interest = newtonMethod(VP, VF, 0.00001, n, R, 100, f);
                    return interest;
                }
            }
            r = document.getElementById("n_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$n={{ln({{R}\\over\ {R - VPi}})}\\over\ {ln(1+i)}}$$";
                document.getElementById("description_paragraph").innerHTML = 
                "Se calcula la cantidad de pagos (n) necesarios, al final de cada período, para amortizar el Valor Presente a la tasa i con cuotas de valor R.";
                MathJax.typeset();
                result_id = "periods";
                formula = function (VP, VF, i, n, R) {
                    return ((Math.log(R/(R-VP*i))/Math.log(1+i))).toFixed(2);
                }
            }
            r = document.getElementById("R_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML =
                 "$$R = {{VPi}\\over\ {\\Big[{1-{1\\over\ {(1+i)^n}}}\\Big]}}$$";
                 document.getElementById("description_paragraph").innerHTML = 
                 "Se calcula el valor de la cuota (R) que, pagada al final de cada uno de los n períodos, equivale al Valor Presente a la tasa i.";
                MathJax.typeset();
                result_id = "R";
                formula = function (VP, VF, i, n, R) {
                    return (VP*i/(1-1/Math.pow(1+i,n))).toFixed(2);
                }
            }
        }
        else {
            r = document.getElementById("i_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = "i calculada numéricamente desde:\
                $$VF = R\\Big[{{(1+i)^n-1}\\over\ i}\\Big]$$";
                document.getElementById("description_paragraph").innerHTML = 
                "Se calcula, de forma numérica (método de Newton), la tasa de interés i que hace que n pagos iguales (R) al final de cada período acumulen el Valor Futuro.";
                MathJax.typeset();
                result_id="i";
                formula = function (VP, VF, i, n, R) {
                    f = function (VP, VF, i, n, R) {
                        return VF-R*(Math.pow(1+i, n)-1)/i;
                    }
                    var interest = newtonMethod(VP, VF, 0.00001, n, R, 100, f);
                    return interest;
                }
            }
            r = document.getElementById("n_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$n={{ln \\Big[{{VFi + R}\\over\ R}\\Big]}\\over\ {ln(1+i)}}$$";
                document.getElementById("description_paragraph").innerHTML = 
                "Se calcula la cantidad de pagos (n) necesarios, al final de cada período, para acumular el Valor Futuro ahorrando una cuota R a la tasa i.";
                MathJax.typeset();
                result_id = "periods";
                formula = function (VP, VF, i, n, R) {
                    return ((Math.log((VF*i+R)/R)/Math.log(1+i))).toFixed(2);
                }
            }
            r = document.getElementById("R_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$R = {VFi\\over\ {\\Big[{(1+i)^n-1}\\Big]}}$$";
                document.getElementById("description_paragraph").innerHTML = 
                "Se calcula el valor de la cuota (R) que, depositada al final de cada uno de los n períodos, acumula el Valor Futuro a la tasa i.";
                MathJax.typeset();
                result_id = "R";
                formula = function (VP, VF, i, n, R) {
                    return (VF*i/(Math.pow(1+i, n)-1)).toFixed(2);
                }
            }
        }
        
    }
    else {
        document.getElementById("R_r").disabled = false
        if (document.getElementById("con_VP").checked) {
            document.getElementById("amort_button").style.display = "inline-block";
        } else {
            document.getElementById("amort_button").style.display = "none";
            document.getElementById("amortizacion_container").style.display = "none";
        }
        var r = document.getElementById("VP_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML =
                "$$VP = R\\Big[{\\sum_{t=1}^n {1\\over\ {(1+i)^{t-1}}}}\\Big] = R(1+i)\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]$$";
            document.getElementById("description_paragraph").innerHTML = 
            "Se calcula el Valor Presente de una serie de n pagos iguales (R), realizados al inicio de cada período, descontados a la tasa i.";
            MathJax.typeset();
            result_id = "VP";
            formula = function (VP, VF, i, n, R) {
                return (R*(1+i)*(1 - 1 / Math.pow(1 + i, n)) / i).toFixed(2);
            }
        }
        r = document.getElementById("VF_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML =
                "$$VF = R\\Big[{\\sum_{t=1}^n {(1+i)^{n+1-t}}}\\Big] = R(1+i)\\Big[{{(1+i)^n-1}\\over\ i}\\Big]$$";
            document.getElementById("description_paragraph").innerHTML = 
            "Se calcula el Valor Futuro de una serie de n pagos iguales (R), realizados al inicio de cada período, capitalizados a la tasa i.";
            MathJax.typeset();
            result_id = "VF";
            formula = function (VP, VF, i, n, R) {
                return (R*(1+i)*(Math.pow(1 + i, n) - 1) / i).toFixed(2);
            }
        }
        if (document.getElementById("con_VP").checked) {
            r = document.getElementById("i_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = "i Calculada numéricamente desde:\
                $$VP = R(1+i)\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]$$";
                document.getElementById("description_paragraph").innerHTML = 
                "Se calcula, de forma numérica (método de Newton), la tasa de interés i que hace que n pagos iguales (R) al inicio de cada período equivalgan al Valor Presente.";
                MathJax.typeset();
                result_id = "i";
                formula = function (VP, VF, i, n, R) {
                    f = function (VP, VF, i, n, R) {
                        return VP - R*(1+i) * (1 - 1 / Math.pow(1 + i, n)) / i;
                    }
                    var interest = newtonMethod(VP, VF, 0.00001, n, R, 100, f);
                    return interest;
                }
            }
            r = document.getElementById("n_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$n={{ln \\Big[{{R(1+i)}\\over\ {R(1+i)-VPi}} \\Big]}\\over\ {ln(1+i)}}$$";
                document.getElementById("description_paragraph").innerHTML = 
                "Se calcula la cantidad de pagos (n) necesarios, al inicio de cada período, para amortizar el Valor Presente a la tasa i con cuotas de valor R.";
                MathJax.typeset();
                result_id = "periods";
                formula = function (VP, VF, i, n, R) {
                    return ((Math.log(R*(1+i) / (R*(1+i) - VP * i)) / Math.log(1 + i))).toFixed(2);
                }
            }
            r = document.getElementById("R_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$R={VP\\over\ {(1+i)\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]}}$$";
                document.getElementById("description_paragraph").innerHTML = 
                "Se calcula el valor de la cuota (R) que, pagada al inicio de cada uno de los n períodos, equivale al Valor Presente a la tasa i.";
                MathJax.typeset();
                result_id = "R";
                formula = function (VP, VF, i, n, R) {
                    return (VP*i/((1+i)*(1-1/Math.pow(1+i, n)))).toFixed(2);
                }
            }
        }
        else {
            r = document.getElementById("i_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = "i calculada numéricamente desde:\
                $$VF={R(1+i)\\Big[{{(1+i)^n-1}\\over\ i}\\Big]}$$";
                document.getElementById("description_paragraph").innerHTML = 
                "Se calcula, de forma numérica (método de Newton), la tasa de interés i que hace que n pagos iguales (R) al inicio de cada período acumulen el Valor Futuro.";
                MathJax.typeset();
                result_id = "i";
                formula = function (VP, VF, i, n, R) {
                    f = function (VP, VF, i, n, R) {
                        return VF - R * (1 + i) * (Math.pow(1 + i, n) - 1) / i;
                    }
                    var interest = newtonMethod(VP, VF, 0.00001, n, R, 100, f);
                    return interest;
                }
            }
            r = document.getElementById("n_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$n={{ln\\Big[{{VFi + R(1+i)}\\over\ {R(1+i)}}\\Big]}\\over\ {ln(1+i)}}$$";
                document.getElementById("description_paragraph").innerHTML = 
                "Se calcula la cantidad de pagos (n) necesarios, al inicio de cada período, para acumular el Valor Futuro ahorrando una cuota R a la tasa i.";
                MathJax.typeset();
                result_id = "periods";
                formula = function (VP, VF, i, n, R) {
                    return ((Math.log((VF*i+R*(1+i))/(R*(1+i))) / Math.log(1 + i))).toFixed(2);
                }
            }
            r = document.getElementById("R_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$R={VF \\over\ {(1+i)\\Big[{{(1+i)^n-1}\\over\ i}\\Big]}}$$";
                document.getElementById("description_paragraph").innerHTML = 
                "Se calcula el valor de la cuota (R) que, depositada al inicio de cada uno de los n períodos, acumula el Valor Futuro a la tasa i.";
                MathJax.typeset();
                result_id = "R";
                formula = function (VP, VF, i, n, R) {
                    return (VF*i/((1+i)*(Math.pow(1+i, n)-1))).toFixed(2);
                }
            }
        }
    }
    setBackColor(result_id);
}

function mostrarAmortizacion(){
    var VP = parseCurrency(document.getElementById("VP").value);
    var i = parseFloat(document.getElementById("i").value);
    var n = parseFloat(document.getElementById("periods").value);
    var R = parseCurrency(document.getElementById("R").value);
    var esAnticipada = document.getElementById("anualidad_anticipada").checked;

    var body = document.getElementById("amortizacion_body");
    body.innerHTML = "";
    var saldo = VP;

    for (var t = 1; t <= n; t++){
        var interes, amortizacion;

        if (esAnticipada && t === 1){
            interes = 0;
            amortizacion = R;
        } else {
            interes = saldo * i;
            amortizacion = R - interes;
        }

        saldo = saldo - amortizacion;

        var fila = document.createElement("tr");
        fila.innerHTML =
            "<td>" + t + "</td>" +
            "<td>" + formatCurrency(R) + "</td>" +
            "<td>" + formatCurrency(interes) + "</td>" +
            "<td>" + formatCurrency(amortizacion) + "</td>" +
            "<td>" + formatCurrency(Math.max(saldo, 0)) + "</td>";
        body.appendChild(fila);
    }

    document.getElementById("amortizacion_container").style.display = "block";
}

window.addEventListener("load", init);