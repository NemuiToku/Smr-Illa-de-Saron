mkdir carpetitapruebaperoenpowershell
cd carpetitapruebaperoenpowershell
mkdir carpetitaprueba2peroenpowershell
cd carpetitaprueba2peroenpowershell
New-Item .\test123.txt
Set-Content .\test123.txt 'Esta es la prueba pero en powershell'
Copy-Item .\test123.txt ..
