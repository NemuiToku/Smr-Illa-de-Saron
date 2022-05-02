#!/bin/bash

clear

  echo CALCULADORA v3.0
  echo ----------------
#VARIABLES

n1="0"
n2="0"
op="0"
res="0"
FILE_INPUT="./SOM_Act_4.1_Scripting_Avanzado_NonInteractivo_DATOS_IN.csv"
FILE_OUTPUT="./SOM_Act_4.1_Scripting_Avanzado_NonInteractivo_DATOS_OUT.log"	
DELIMITADOR=","

#PROGRAMA

	cat $FILE_INPUT | while read LINEA
	 do
		echo 
		echo "mostrando linea:" $LINEA
		echo

		n1=$( echo $LINEA | cut -d $DELIMITADOR -f 1 )
		n2=$( echo $LINEA | cut -d $DELIMITADOR -f 2 )
		op=$( echo $LINEA | cut -d $DELIMITADOR -f 3 )

		echo "Operación $n1 $op $n2"
		echo
		res=$(($n1$op$n2))

		echo "$n1 $op $n2 = $res" >> $FILE_OUTPUT
	done
