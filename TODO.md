1. Skapa ett Github repo för uppgiften
2. Installera vitest: npm install -D vitest

===============================================

Kom ihåg listan:

1. Kolla package.json server (Har den json servern?)
   1. "dependencies": {
      "json-server": "^1.0.0-beta.3"
2. npm i json-server (Istallera servern)
3. npx json-server vehicles.json (Testar servern!)
4. Modifiera package.json till:
   1."scripts": {
   "server": "npx json-server vehicles.json"

5. npm run server (startar servern!)

===============================================
Kommandon:
tsc --watch /TypeScript compiler
npm run server db.json /Startar servern
npm test (Kör Vitest)
===============================================

---

3st sidor för STEG 1
3 end-points!

---

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > <>

Workflow

1. JSON-Servern och end-points (Själva datan)

   1. Modell för interface (APIn) ICourses.ts
      1. HTTP-klienten (pratar med vårt API: GET, POST, PUT, DELETE)
         1. DOM hanteringen (funktioner som visar kurserna)

Börja sätta ihop delarna

1. Courses.ts

2. courses-details.ts (mer detaljerad information om en specifik kurs)

3. config.ts (onfigurationsinställningar)
   services.ts (hantera API-anrop)

4. course-services.ts (Som en bro mellan frontend och backend)

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > <>
