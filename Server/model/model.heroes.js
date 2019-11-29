import mongoose from "mongoose";
const Schema = mongoose.Schema;

const positions = [
  "Front",
  "Middle",
  "Back"
]
const damageTypes = [
  "magic",
  "physical"
]
const DataSchema = new Schema(
  { //TODO: go through heroes.json and see what can be added were in the Schema!
    id: Number,
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    title: String,
    class: String,
    damageType: damageTypes,
    position: positions,
    weapon: {
      uniqueWeapon: {
        name: String,
        effect: [String]
      },
      soulWeapon: {
        advancement0: String,
        advancement1: String,
        advancement2: String,
        activation: String,
        cooldown: Number,
        charges: Number
      }
    },
    skills: [
      {
        skillId: Number,
        skillInfo: {
          skillNumber: String,
          name: String,
          effect: String,
          cooldown: Number,
          cost: Number
        },
        linked: Boolean,
        light: String,
        dark: String,
        books: [String],
        uniqueTreasure: {
          name: String,
          effect: [String],
          introduction: String
        }
      }
    ],
    light: String,
    dark: String,
    skins: [String],
    background: {
      story: String,
      profile: { //TODO: look for abnormalities in the profile points ingame
        gender: String,
        race: String,
        age: Number,
        height: Number,
        birthday: String,
        constellation: String, //TODO: look up if you could use an ENUM here
        likes: String,
        dislikes: String
      },
      itemStories: {
        uniqueWeapon: String, 
        uniqueTreasure: [String]
      },
      dialog: {
        idle: String,
        recruiting: {
            greet: String,
            conversation: [String],
            gift: String
        },
        affinty: {
          greet: String,
          conversation: [String],
          gift: String
        },
        relationship: {
          greet: String,
          conversation: [String]
        }
      },
      voice: {
        actor: {
          jp: String,
          kr: String,
          en: String
        },
        lines: {
          jp: [String],
          kr: [String],
          en: [String]
        }
      }
    }
  },
  { timestamps: true, collection: "heroes" }
);

export default mongoose.model("Heroes", DataSchema);
