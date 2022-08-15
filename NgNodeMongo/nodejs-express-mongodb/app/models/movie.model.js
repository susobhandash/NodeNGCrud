module.exports = mongoose => {
    const movies = mongoose.model(
      "movies",
      mongoose.Schema(
        {
          name: String,
          summary: String,
        },
      )
    );
    return movies;
};