const server = require("./app")
const {conn, Abm} = require("./db")




conn.sync({ force: false })
.then(() => {
    server.listen(3001, () => {
      console.log(`DB listening at ${port}`); // eslint-disable-line no-console
  });
})