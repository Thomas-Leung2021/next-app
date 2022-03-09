const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

// node database-test.js
(async () => {
  // open the database
  const db = await sqlite.open('database.sqlite', { driver: sqlite3.Database });

  await db.migrate({ force: true });
  
  const person = await db.all('select * from Person');
  console.log("ALL PEOPLE: ", JSON.stringify(person, null, 2));

  const vehicle = await db.all('select * from Vehicle');
  console.log("ALL Vehicle: ", JSON.stringify(vehicle, null, 2));
})();
