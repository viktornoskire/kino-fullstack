import mongoose from "mongoose";

const openSchema = new mongoose.Schema({
  _id: String,
  monday: Date,
  tuesday: Date,
  wensday: Date,
  thursday: Date,
  friday: Date,
  saturday: Date,
  sunday: Date,
});

const openHour =
  mongoose.models.openHour || mongoose.model("openHour", openSchema);

export { openHour };
