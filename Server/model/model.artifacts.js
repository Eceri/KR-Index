import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    id: Number,
    name: {
      required: true,
      type: String,
      trim: true,
      unique: true
    },
    description: { required: true, type: [String] },
    story: String
  },
  { timestamps: true, collection: "artifacts" }
);

export default mongoose.model("Artifact", DataSchema);
