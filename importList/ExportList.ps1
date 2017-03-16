export-spweb -identity http://portal.intermark.com -itemurl /lists/Departments -path C:\Backups\Continental\Export\Departments.cmp
export-spweb -identity http://portal.intermark.com -itemurl /lists/PositionTypes -path C:\Backups\Continental\Export\PositionTypes.cmp
export-spweb -identity http://portal.intermark.com -itemurl /lists/Employees -path C:\Backups\Continental\Export\Employees.cmp
export-spweb -identity http://portal.intermark.com -itemurl /EmployeePhotos -path C:\Backups\Continental\Export\EmployeePhotos.cmp

Write-Output "Exportacion finalizada."