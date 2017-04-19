export-spweb -identity http://portal.intermark.com -itemurl /lists/Departments -path C:\temp\importList\listFiles\Departments_Export.cmp
export-spweb -identity http://portal.intermark.com -itemurl /lists/PositionTypes -path C:\temp\importList\listFiles\PositionTypes_Export.cmp
export-spweb -identity http://portal.intermark.com -itemurl /lists/Employees -path C:\temp\importList\listFiles\Employees_Export.cmp
export-spweb -identity http://portal.intermark.com -itemurl /EmployeePhotos -path C:\temp\importList\listFiles\EmployeePhotos_Export.cmp

Write-Output "Exportacion finalizada."