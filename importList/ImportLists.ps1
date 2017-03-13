Add-PsSnapin Microsoft.SharePoint.PowerShell -ErrorAction SilentlyContinue -WarningAction SilentlyContinue | Out-Null 

$url = "http://intranet.continental.com"

Import-SPWeb $url -Path c:\backup\departamentos.cmp -UpdateVersions OverWrite
Import-SPWeb $url -Path c:\backup\puestos.cmp -UpdateVersions OverWrite
Import-SPWeb $url -Path c:\backup\empleados.cmp -UpdateVersions OverWrite
Write-Output "Importacion correcta."
