#!/bin/bash
clear

	echo CALCULADORA v2.1
	echo ----------------


	# Variables
	separador="============================"

	# Funciones
	entradadigitos() {
		echo "Introduce Valor Número 1 ->"
		read n1
		echo "Introduce Valor Número 2 ->"
		read n2
		echo " "
		echo Escogiste $n1 y $n2
		echo " "
	}

	menucalculadora() {
		echo 1. "(+) sumar"
		echo 2. "(-) restar"
		echo 3. "(*) multiplicar"
		echo 4. "(/) dividir"
		echo " "
		read menu_opcion
		echo " "
		case $menu_opcion in
	  	 1)echo Escogiste Sumar	;;
		 2)echo Escogiste Restar	;;
		 3)echo Escogiste Multiplicar	;;
		 4)echo Escogiste Dividir	;;
		esac

	}

	calculo() {
		case $menu_opcion in
	 	 1)res=$(echo $n1 + $n2 | bc)  				;;
	 	 2)res=$(echo $n1 - $n2 | bc)  				;;
	 	 3)res=$(echo $n1 \* $n2 | bc) 				;;
	 	 4)res=$(echo "scale=2; $n1 / $n2" | bc)	 	;;
	  	*)res=$(echo " ERROR ") 				;;
		esac

		echo " "
		echo "Resultado : $res"
		echo " "
	}

	confirmacionbucle() {
		echo "Continuar? (S/N)"
		echo " "
		read confirmacion
		echo " "
		echo $separador
		if [[ $confirmacion =~ ^([sS][iI]|[sS])$ ]]
		then
			echo " "
		else
			echo >> ./Datos.csv
			echo "=============================" >> ./Datos.csv
			exit 0
		fi
	}
	LOG() {
		case $menu_opcion in
	  	 1)op="+"	;;
		 2)op="-"	;;
		 3)op="*"	;;
		 4)op="/"	;;
		esac

		echo $n1 $op $n2 "=" $res >> ./Datos.csv
}

	# Bucle
	while true
	do

	# A. Entrada Dígitos // Guarda los datos de tus digitos
	entradadigitos

	# B. tipo de operación // que va a hacer
	echo escoge:
	menucalculadora

	# calculos // en caso de escoger X, va a hacer x operacion
	calculo

	#LOG
	LOG

	#Confirmacion // hace un loop(reinicio) en caso de Confirmar
	confirmacionbucle

done


