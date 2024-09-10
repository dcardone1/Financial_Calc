

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

function showFormula() {
    var r  = document.getElementById("VP_r");
    if (r.checked) {
        document.getElementById("equation_paragraph").innerHTML = "$$VP = VF\over \(1+i)^n$$";
        MathJax.typeset();
    }
    r = document.getElementById("VF_r");
    if (r.checked) {
        document.getElementById("equation_paragraph").innerHTML = "$$VF = VP(1+i)^n$$";
        MathJax.typeset();
    }
}

