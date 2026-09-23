# CALANQOO CITY DATA MANAGEMENT SYSTEM — FULL VERSION PROTOTYPE

## Kan maal keessa jira?
- 🔐 Roles: Admin, Finance, GIS, Data Entry, Supervisor (demo login)
- 🗄️ Production PostgreSQL/PostGIS schema: `server-schema.sql`
- 🗺️ GPS/browser geolocation + GIS feature prototype
- 📸 Photo upload for assets/projects (local prototype)
- 📊 Date-range reports + print to A4/PDF
- 📥 CSV Excel-compatible import/export
- 🔎 Search/filter
- 📝 Audit log
- 💾 JSON backup/restore
- 📱 PWA manifest/service worker
- 🌐 Deployment starter: `server.js`

## Demo login
admin / 1234
finance / 1234
gis / 1234
data / 1234
supervisor / 1234

## Hubachiisa barbaachisaa
`index.html` kun prototype browser-local dha. Database dhugaa, password hashing/JWT, multi-user online access, photo object storage, PostGIS GIS, HTTPS, backup schedule fi server deployment production keessatti `server-schema.sql` fi `server.js` irraa itti fufsiisuun barbaachisa.

Online URL dhugaa as keessatti hin uumin; hosting/account deployment malee URL sobaa kennuun sirrii miti.

## Production architecture
Android/Web PWA → HTTPS → Node/Express API → PostgreSQL + PostGIS
                                   ↘ object storage (photos)
                                   ↘ automated backup
