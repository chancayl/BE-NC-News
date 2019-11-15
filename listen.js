const app = require("./apps/app");
const { PORT = 9090 } = process.env;

// app.listen(9090, () => {
//   console.log("Insomnia");
// });


app.listen(PORT, () => console.log(`Listening on ${PORT}...`));