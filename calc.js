function calcular (){

    var VP = parseFloat(document.getElementById("VP").value);
    var VF = parseFloat(document.getElementById("VF").value);
    var i = parseFloat(document.getElementById("i").value);
    var n = parseFloat(document.getElementById("periods").value);
    var R = parseFloat(document.getElementById("R").value);

    document.getElementById(result_id).value = formula(VP, VF, i, n, R);
}

function init(){
    document.getElementById("R_r").disabled = true;
    document.getElementById("VF_r").checked = true;
    document.getElementById("anualidad_ordinaria").checked = true;
    document.getElementById("con_VP").checked = true;
    document.getElementById("i").value=0.01;
    var formula = function () {
        return 0;
    }
    var result_id = "VP";
    showFormula()

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
        var r  = document.getElementById("VP_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$VP ={ VF\\over\(1 + i)^n}$$";
            MathJax.typeset();
            result_id="VP"
            formula = function (VP, VF, i, n, R) {
                return (VF / Math.pow(1 + i, n)).toFixed(2);
            }
        }
        r = document.getElementById("VF_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$VF = VP(1+i)^n$$";
            MathJax.typeset();
            result_id = "VF";
            formula = function (VP, VF, i, n, R) {
                return (VP*Math.pow(1 + i, n)).toFixed(2);
            }
        }
        r = document.getElementById("i_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$i = \\sqrt[n]{VF\\over\ VP}-1$$";
            MathJax.typeset();
            result_id = "i";
            formula = function (VP, VF, i, n, R) {
                return (Math.pow(VF/VP, 1.0/n)-1).toFixed(8);
            }
        }
        r = document.getElementById("n_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = "$$n = {ln({VF\\over\ VP})\\over\{ln(1+i)}}$$";
            MathJax.typeset();
            result_id = "periods";
            formula = function (VP, VF, i, n, R) {
                return (Math.log(VF/VP)/Math.log(1+i)).toFixed(2);
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
            result_id = "VP";
            formula = function (VP, VF, i, n, R) {
                return (R*(1-1/Math.pow(1+i, n))/i).toFixed(2);
            }
        }
        r = document.getElementById("VF_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML = 
            "$$VF = R\\Big[{\\sum_{t=1}^n {(1+i)^{n-t}}}\\Big] = R\\Big[{{(1+i)^n-1}\\over\ i}\\Big]$$";
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
                "i calculada numéricamente desde: $$VP = R\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]$$";
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
        var r = document.getElementById("VP_r");
        if (r.checked) {
            document.getElementById("equation_paragraph").innerHTML =
                "$$VP = R\\Big[{\\sum_{t=1}^n {1\\over\ {(1+i)^{t-1}}}}\\Big] = R(1+i)\\Big[{1-{1\\over\ {(1+i)^n}}\\over\ i}\\Big]$$";
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

window.addEventListener("load", init);