import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    id: Number,
    name: String,
    description: [String],
    story: String,
    picture: Number
  },
  { timestamps: true, collection: "artifacts" }
);

export default mongoose.model("Artifact", DataSchema);
