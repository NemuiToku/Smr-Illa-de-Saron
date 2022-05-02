REM este script muestra la informacion del usuario y dá detalles de los directorios
@echo off
(
echo	=========================================
echo	INICIO
echo	=========================================
)

echo	Este e o contido do meu directorio de traballo en Windows

echo	Son:  Jose Manuel, Guirado, Fernández

echo	O meu usuario é:	smr1_05
echo	=========================================
@echo off
cd c:\users\smr1_05

tree
(
echo	========================================
echo	FIN
echo	========================================
)
pause