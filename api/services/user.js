const dbConfig = require('../config/db');
const arangojs = require("arangojs");
const systemDB = new arangojs.Database({
  url: dbConfig.url
});

let db = systemDB.database(dbConfig.database);
db.useBasicAuth(dbConfig.username, dbConfig.password);

let collection = db.collection('users');

const faker = require('faker');
exports.initialize = async () => {
  let connected = await db.exists();
  if (!connected) {
    db = await systemDB.createDatabase(dbConfig.database);
  }
  
  try {
    await collection.drop();
  } catch (e) {}
  try {
    await collection.create();
  } catch (e) {}
  try {
    const promises = [...Array(1000).keys()].map(item => {
      let randomName = faker.name.findName();
      let randomEmail = faker.internet.email();
      let randomCity = faker.address.city();
      
      return collection.save({
            name: randomName,
            email: randomEmail,
            city: randomCity,
          });
    });

    await Promise.all(promises);
  } catch (e) {
    console.error('Something went wrong', e.stack);
  }
}

exports.insert = async (data) => {
  return collection.save(data).catch(e => {
		return new Promise((resolve, reject) => {
      reject(error);
    });
	});
}

exports.queryData = async (page=1, results=10, sortField='date', sortOrder='desc') => {
	try {
    const users = await db.query(arangojs.aql`
      FOR user IN ${collection}
      SORT user.${sortField}
      ${sortOrder.toUpperCase()}
      LIMIT ${(page - 1) * results}, ${results}
      RETURN user
    `);

    let res = [];
    for await (const user of users) {
      res.push(user);
    }

    return res;
  } catch (err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
};

  