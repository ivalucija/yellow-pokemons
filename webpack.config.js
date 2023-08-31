const path = require("path");

module.exports = {
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "myscript.js",
  },
};

// ulazi u main.js, izrađuje folder dist
