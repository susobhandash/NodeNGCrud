module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      title: String,
      plot: String,
      fullplot: String,
      genres: Array
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