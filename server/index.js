require("./helpers/environment")(process.env);

const app = require("express")();
const config = require(`${process.cwd()}/config`);
const cors = require("cors");

app.use(cors({
	origin: "http://localhost:4351", // TODO: Make this dynamic
}));

require("./helpers/db");
require("./middleware/global")(app);

app.use("/api", require("./routes"));

app.route(["/*", "*"]).all(require("./routes/fallback"));

app.use(require("./middleware/errorHandler"));

const server = app.listen(config.server.port, () => {
	console.log(`Server listening at port ${server.address().port}, running in ${process.env.NODE_ENV} mode. http://localhost:${server.address().port}/`); // eslint-disable-line no-console
});

module.exports = exports = server;
