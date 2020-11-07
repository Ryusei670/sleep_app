// const {MongoClient} = require('mongodb');
// async function dbtest() {
//     const uri = "mongodb+srv://ibes-user:yAZXmKEqzw7Xh2sv@sleepcluster.pmxtb.mongodb.net/Sleep?retryWrites=true&w=majority";
    
//     const client = new MongoClient(uri);
//     try {
//       await client.connect();
//       await listDatabases(client);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       await client.close();
//     }
//   }

//   dbtest().catch(console.error);

//   async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();
  
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//   }
  