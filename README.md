# Alfred Hotels · Audit Client Mystère

- `index.html` : l'application (plateforme + parcours client mystère).
- `refs/` : photos de référence affichées dans le questionnaire.
- `apps-script.gs` : la base de données (Google Sheet) qui reçoit automatiquement les questionnaires validés.

Une fois l'adresse Apps Script collée dans `index.html` (ligne `const API_URL=''`), les questionnaires
validés par les clients arrivent seuls sur la plateforme, sans code à envoyer.
