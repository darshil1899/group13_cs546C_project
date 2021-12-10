const dbConnection = require("./mongoConnection");

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.connectToDb();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  patients_doctors: getCollectionFn("patients_doctors"),
  doctors: getCollectionFn("doctors"),
  users: getCollectionFn("users"),
  appointments: getCollectionFn("appointments"),
};
