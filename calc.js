function init(){
    document.getElementById("R_r").disabled = true;
    document.getElementById("VF_r").checked = true;
    document.getElementById("anualidad_ordinaria").checked = true;

    showFormula()

}

function valorFinal() {
    var VP = document.getElementById("VP").value;
    var i = document.getElementById("i").value;
    var n = document.getElementById("periods").value;
    var VF = Math.pow((1 + parseFloat(i) / 1200), n) * VP;
    document.getElementById("VF").value = VF.toFixed(2);
}

function valorPresente() {
    var VF = document.getElementById("VF").value;
    var i = document.getElementById("i").value;
    var n = document.getElementById("periods").value;
    var VP = VF / Math.pow((1 + parseFloat(i) / 1200), n);
    document.getElementById("VF").value = VF.toFixed(2);
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
        }
        r = document.getElementById("VF_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$VF = VP(1+i)^n$$";
            MathJax.typeset();
        }
        r = document.getElementById("i_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$i = \\sqrt[n]{VF\\over\ VP}-1$$";
            MathJax.typeset();
        }
        r = document.getElementById("n_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$n = {ln({VF\\over\ VP})\\over\{ln(1+i)}}$$";
            MathJax.typeset();
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
        r = document.getElementById("i_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$i$$";
            MathJax.typeset();
        }
        r = document.getElementById("n_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$n$$";
            MathJax.typeset();
        }
        r = document.getElementById("R_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$R$$";
            MathJax.typeset();
        }
    }
    else {

    }
}

window.addEventListener("load", init);