import database from "../database/mysql/database.js";

const getUser = (fields) => {
  const query = database("users");
  for (const field in fields) {
    query.where(field, fields[field]);
  }

  return query
    .first()
    .then((user) => user)
    .catch((error) => null);
};

const createUser = ({ id, password }) => {
  return database("users")
    .insert({ id, password })
    .then(() => ({ userCreated: true }))
    .catch((error) => console.log(error), ({ userCreated: false }));
};

export default {
  getUser,
  createUser,
};
