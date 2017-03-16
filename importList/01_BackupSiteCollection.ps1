$url = "http://contitest:19531/"

Backup-SPSite $url -Path C:\temp\importList\siteCollectionBackup\contiSiteCollection.bak

Write-Output "Copia de seguridad de la colección de sitios finalizada."