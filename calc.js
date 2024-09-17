function calcular (){

    var VP = document.getElementById("VP").value;
    var VF = document.getElementById("VF").value;
    var i = document.getElementById("i").value;
    var n = document.getElementById("periods").value;
    var R = document.getElementById("R").value;

    document.getElementById(result_id).value = formula(VP, VF, i, n, R)
}

function init(){
    document.getElementById("R_r").disabled = true;
    document.getElementById("VF_r").checked = true;
    document.getElementById("anualidad_ordinaria").checked = true;
    document.getElementById("con_VP").checked = true;
    var formula = function () {
        return 0;
    }
    var result_id = "VP";
    showFormula()

}

//show the corresponding formula according to the selected calculation
function showFormula() {
    var checkBoxAnualidad = document.getElementById("anualidad")
    if (!checkBoxAnualidad.checked){
        document.getElementById("R_r").disabled = true
        var r  = document.getElementById("VP_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$VP ={ VF\\over\(1 + i)^n}$$";
            MathJax.typeset();
            result_id="VP"
            formula = function (VP, VF, i, n, R) {
                return (VF / Math.pow(1 + parseFloat(i), n)).toFixed(2);
            }
        }
        r = document.getElementById("VF_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$VF = VP(1+i)^n$$";
            MathJax.typeset();
            result_id = "VF"
            formula = function (VP, VF, i, n, R) {
                return (VP*Math.pow(1 + parseFloat(i), n)).toFixed(2);
            }
        }
        r = document.getElementById("i_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$i = \\sqrt[n]{VF\\over\ VP}-1$$";
            MathJax.typeset();
            result_id = "i"
            formula = function (VP, VF, i, n, R) {
                return (Math.pow(parseFloat(VF)/parseFloat(VP), 1.0/n)-1).toFixed(6);
            }
        }
        r = document.getElementById("n_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$n = {ln({VF\\over\ VP})\\over\{ln(1+i)}}$$";
            MathJax.typeset();
            result_id = "periods"
            formula = function (VP, VF, i, n, R) {
                return (Math.log(parseFloat(VF)/parseFloat(VP))/Math.log(1+parseFloat(i))).toFixed(2);
            }
        }
    }
    else if (document.getElementById("anualidad_ordinaria").checked){
        document.getElementById("R_r").disabled = false
        var r = document.getElementById("VP_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = 
            "$$VP = R\\Big[{\\sum_{t=1}^n {1\\over\ {(1+i)^t}}}\\Big] = R\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]$$";
            MathJax.typeset();
        }
        r = document.getElementById("VF_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = 
            "$$VF = R\\Big[{\\sum_{t=1}^n {(1+i)^{n-t}}}\\Big] = R\\Big[{{(1+i)^n-1}\\over\ i}\\Big]$$";
            MathJax.typeset();
        }
        if(document.getElementById("con_VP").checked){
            r = document.getElementById("i_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML =
                "i calculada numéricamente desde: $$VP = R\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]$$";
                MathJax.typeset();
            }
            r = document.getElementById("n_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$n={{ln({{R}\\over\ {R - VPi}})}\\over\ {ln(1+i)}}$$";
                MathJax.typeset();
            }
            r = document.getElementById("R_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML =
                 "$$R = {{VPi}\\over\ {\\Big[{1-{1\\over\ {(1+i)^n}}}\\Big]}}$$";
                MathJax.typeset();
            }
        }
        else {
            r = document.getElementById("i_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = "i calculada numéricamente desde:\
                $$VF = R\\Big[{{(1+i)^n-1}\\over\ i}\\Big]$$";
                MathJax.typeset();
            }
            r = document.getElementById("n_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$n={{ln \\Big[{{VFi + R}\\over\ R}\\Big]}\\over\ {ln(1+i)}}$$";
                MathJax.typeset();
            }
            r = document.getElementById("R_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$R = {VFi\\over\ {\\Big[{(1+i)^n-1}\\Big]}}$$";
                MathJax.typeset();
            }
        }
        
    }
    else {
        document.getElementById("R_r").disabled = false
        var r = document.getElementById("VP_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML =
                "$$VP = R\\Big[{\\sum_{t=1}^n {1\\over\ {(1+i)^{t-1}}}}\\Big] = R(1+i)\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]$$";
            MathJax.typeset();
        }
        r = document.getElementById("VF_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML =
                "$$VF = R\\Big[{\\sum_{t=1}^n {(1+i)^{n+1-t}}}\\Big] = R(1+i)\\Big[{{(1+i)^n-1}\\over\ i}\\Big]$$";
            MathJax.typeset();
        }
        if (document.getElementById("con_VP").checked) {
            r = document.getElementById("i_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = "i Calculada numéricamente desde:\
                $$R(1+i)\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]$$";
                MathJax.typeset();
            }
            r = document.getElementById("n_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$n={{ln \\Big[{{R(1+i)}\\over\ {R(1+i)-VPi}} \\Big]}\\over\ {ln(1+i)}}$$";
                MathJax.typeset();
            }
            r = document.getElementById("R_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$R={VP\\over\ {(1+i)\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]}}$$";
                MathJax.typeset();
            }
        }
        else {
            r = document.getElementById("i_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = "i calculada numéricamente desde:\
                $$VF={R(1+i)\\Big[{{(1+i)^n-1}\\over\ i}\\Big]}$$";
                MathJax.typeset();
            }
            r = document.getElementById("n_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$n={{ln\\Big[{{VFi + R(1+i)}\\over\ {R(1+i)}}\\Big]}\\over\ {ln(1+i)}}$$";
                MathJax.typeset();
            }
            r = document.getElementById("R_r");
            if (r.checked) {
                document.getElementById("equation_paragraph").innerHTML = 
                "$$R={VF \\over\ {(1+i)\\Big[{{(1+i)^n-1}\\over\ i}\\Big]}}$$";
                MathJax.typeset();
            }
        }
    }
}

window.addEventListener("load", init);