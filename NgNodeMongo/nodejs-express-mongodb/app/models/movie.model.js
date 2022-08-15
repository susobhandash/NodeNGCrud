// module.exports = mongoose => {
//     const movies = mongoose.model(
//       "movies",
//       mongoose.Schema(
//         {
//           name: String,
//           summary: String,
//         },
//       )
//     );
//     movies.plugin(mongoosePaginate);
//     return movies;
// };

module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      name: String,
      summary: String,
    },
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  schema.plugin(mongoosePaginate);
  const movies = mongoose.model("movies", schema);
  return movies;
};
// const mongoose = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate-v2");
// const Schema = mongoose.Schema;

// const movies = new Schema({
//   name: String,
//   summary: String,
// });

// movies.plugin(mongoosePaginate);
// module.exports = mongoose.model("movies", movies);