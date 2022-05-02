Clear-Host
#Variables
$Ordenador = $env:COMPUTERNAME
$usuario = $env:USERNAME
$NombreSO = (Get-WmiObject -classname Win32_OperatingSystem).name | %{$_.split('|')[0]}
$BuildSO = (Get-CimInstance -classname Win32_OperatingSystem).BuildNumber
$ASO = (Get-CimInstance -ClassName Win32_OperatingSystem).OSArchitecture
$VersionPowershell = ($PsVersionTable).PSVersion

$UP = cd $env:USERPROFILE
$treeuserpath = Tree
$ContarArchivos = Get-ChildItem -Recurse | Measure-Object | % {$_. Count}
$TamañoArchivos = (Get-ChildItem $env:USERPROFILE -recurse | Measure-Object -property length -sum).sum /1gb
$archivogrande = Get-ChildItem -recurse| sort -descending -property length | select -first 1 FullName, @{Name="Gigabytes";Expression={[Math]::round($_.length / 1GB, 3)}}

$MAC = ipconfig /all | Select-String -Pattern 'f?sica *'|%{$_.Line.Split(":")} | Select -Last 1
$IP = ipconfig | Select-String -Pattern 'IPv4'|%{$_.Line.Split(":")} | Select -Last 1
$mascara_subred = ipconfig | Select-String -Pattern 'de subred'|%{$_.Line.Split(":")} | Select -Last 1
$PuertaEnlace = ipconfig | Select-String -Pattern 'Puerta*'|%{$_.Line.Split(":")} | Select -Last 1
$pingipgoogle = ping 8.8.8.8
$pingurlgoogle = ping google.com
$Fecha = Get-Date -Format yyyyMMdd_hhmmss
$SpeedTest=$a=Get-Date;Invoke-WebRequest https://www.hq.nasa.gov/alsj/a17/A17_FlightPlan.pdf|Out-Null; "$((10/((Get_Date)-$a).TotalSeconds)*8) Mbps"
#Script
Write-Output ("
----------------------------------------------------------------------------------------------------
El ordenador $Ordenador del usuario $usuario tiene las siguientes características: ")

Write-Output ("        
        - Sistema Operativo:
            - Nombre  $NombreSO
            - Versión $BuildSO
            - Bits    $ASO
            - Intérprete de comandos: Estas Usando Powershell
            - PowerShell versión: $VersionPowershell
            ")

Write-Output ("
        - Usuario: $Usuario
            - Nombre: $Usuario
            - Directorio de trabajo del usuario:
                - Mostrarlo en modo árbol sin ficheros, solo los directorios de su zona de trabajo:")

$treeuserpath
                                
                Write-Output ("
                 - Contar los ficheros que tiene: $UP
                    - Número de ficheros: $ContarArchivos
                    - Tamaño ocupado por todos los ficheros: $TamañoArchivos Gb
                    - Tamaño del fichero más grande y mostrar la ruta:
                    ") 
$archivogrande

Write-Output ("
        - Conexión
            - Dirección física MAC: $MAC
            - Dirección lógica IP: $IP
            - Máscara de red: $mascara_subred
            - Puerta de enlace: $PuertaEnlace
            - Test ping contra IP: ")

$pingipgoogle
Write-Output ("
            - Test ping contra URI:
")

$pingurlgoogle
Write-Output ("
            - Velocidad de conexión a Internet (subida y bajada)
            $SpeedTest
----------------------------------------------------------------------------------------------------
")

#LOG
Write-Output ("
----------------------------------------------------------------------------------------------------
El ordenador $Ordenador del usuario $usuario tiene las siguientes características: ") >> $env:USERPROFILE\Desktop\SOM_Act1.4_InventarioSO_Avanzado_script_PowerShell_v.5.1_GuiradoFernandez_JoseManuel_v.01.00.00_20201104_$Fecha.log

Write-Output ("        
        - Sistema Operativo:
            - Nombre  $NombreSO
            - Versión $BuildSO
            - Bits    $ASO
            - Intérprete de comandos: Estas Usando Powershell
            - PowerShell versión: $VersionPowershell
            ") >> $env:USERPROFILE\Desktop\SOM_Act1.4_InventarioSO_Avanzado_script_PowerShell_v.5.1_GuiradoFernandez_JoseManuel_v.01.00.00_20201104_$Fecha.log

Write-Output ("
        - Usuario: $Usuario
            - Nombre: $Usuario
            - Directorio de trabajo del usuario:
                - Mostrarlo en modo árbol sin ficheros, solo los directorios de su zona de trabajo:") >> $env:USERPROFILE\Desktop\SOM_Act1.4_InventarioSO_Avanzado_script_PowerShell_v.5.1_GuiradoFernandez_JoseManuel_v.01.00.00_20201104_$Fecha.log

$treeuserpath >> $env:USERPROFILE\Desktop\SOM_Act1.4_InventarioSO_Avanzado_script_PowerShell_v.5.1_GuiradoFernandez_JoseManuel_v.01.00.00_20201104_$Fecha.log
                                
                Write-Output ("
                 - Contar los ficheros que tiene: $UP
                    - Número de ficheros: $ContarArchivos
                    - Tamaño ocupado por todos los ficheros: $TamañoArchivos Gb
                    - Tamaño del fichero más grande y mostrar la ruta:
                    ") >> $env:USERPROFILE\Desktop\SOM_Act1.4_InventarioSO_Avanzado_script_PowerShell_v.5.1_GuiradoFernandez_JoseManuel_v.01.00.00_20201104_$Fecha.log
$archivogrande >> $env:USERPROFILE\Desktop\SOM_Act1.4_InventarioSO_Avanzado_script_PowerShell_v.5.1_GuiradoFernandez_JoseManuel_v.01.00.00_20201104_$Fecha.log

Write-Output ("
        - Conexión
            - Dirección física MAC: $MAC
            - Dirección lógica IP: $IP
            - Máscara de red: $mascara_subred
            - Puerta de enlace: $PuertaEnlace
            - Test ping contra IP: ")>> $env:USERPROFILE\Desktop\SOM_Act1.4_InventarioSO_Avanzado_script_PowerShell_v.5.1_GuiradoFernandez_JoseManuel_v.01.00.00_20201104_$Fecha.log

$pingipgoogle >> $env:USERPROFILE\Desktop\SOM_Act1.4_InventarioSO_Avanzado_script_PowerShell_v.5.1_GuiradoFernandez_JoseManuel_v.01.00.00_20201104_$Fecha.log
Write-Output ("
            - Test ping contra URI:
") >> $env:USERPROFILE\Desktop\SOM_Act1.4_InventarioSO_Avanzado_script_PowerShell_v.5.1_GuiradoFernandez_JoseManuel_v.01.00.00_20201104_$Fecha.log

$pingurlgoogle >> $env:USERPROFILE\Desktop\SOM_Act1.4_InventarioSO_Avanzado_script_PowerShell_v.5.1_GuiradoFernandez_JoseManuel_v.01.00.00_20201104_$Fecha.log
Write-Output ("
            - Velocidad de conexión a Internet (subida y bajada)
            $SpeedTest
----------------------------------------------------------------------------------------------------
") >> $env:USERPROFILE\Desktop\SOM_Act1.4_InventarioSO_Avanzado_script_PowerShell_v.5.1_GuiradoFernandez_JoseManuel_v.01.00.00_20201104_$Fecha.log

pause

