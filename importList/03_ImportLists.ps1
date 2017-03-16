$url = "http://contitest:19531/"

Import-SPweb -identity $url -path C:\temp\importList\listFiles\Departments.cmp
import-spweb -identity $url -path C:\temp\importList\listFiles\PositionTypes.cmp
import-spweb -identity $url -path C:\temp\importList\listFiles\Employees.cmp
import-spweb -identity $url -path C:\temp\importList\listFiles\EmployeePhotos.cmp

Write-Output "Importacion finalizada."