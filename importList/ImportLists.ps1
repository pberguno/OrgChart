$url = "http://contitest:19531/"

Import-SPweb -identity $url -path C:\temp\import\Departments.cmp
import-spweb -identity $url -path C:\temp\import\PositionTypes.cmp
import-spweb -identity $url -path C:\temp\import\Employees.cmp
import-spweb -identity $url -path C:\temp\import\EmployeePhotos.cmp

Write-Output "Importacion finalizada."