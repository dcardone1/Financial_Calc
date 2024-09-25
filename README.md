# Financial_Calc
Cálculos financieros en html

Se debe agregar la librería MATHJAX para mostrar las formulas escritas en formato LATEX

con:

"<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>"

ejemplo de fórmula:

"$$VP ={ VF\\over\(1 + i)^n}$$"

En esta página desarrollada totalmente en frontend se muestra una calcualdora financiera que permite
calcular todas las variables involucradas a partir del resto de las variables.

Se debe seleccionar el radio button correspondiente al valor a calcular. Se mostrará en pantalla la fórmula de cálculo utilizada y se resalta el campo que será calculado.

En la fórmula podemos ver las variables necesarias a completar para obetener el valor deseado.

El objetivo de este proyecto es desarrollar una herramienta de cálculo didáctica que permita jugar con los valores y observar como influye por ejemplo la tasa de interes en los valores futuros y presentes en distintas situaciones.

La mayoría de las variables se calculan con la fórmula que resulta de resolver la ecuación que involucra dicha variable en forma algebraica, sin embargo en el caso de la tasa de interes i para anualidades no es posible despejar la variable por lo cual se ha recurrido al método de Newton para obtener las raices de una ecuación en forma numérica.

i, representa la tasa de interes convertida para los periodos de capitalización correspondientes. por ejempo i=0.01 representa una tasa de interes anual de 12%

Desarrollado por: Diego Cardone.

