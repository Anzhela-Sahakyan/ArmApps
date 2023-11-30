import mongoose from "mongoose";

const appSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide an app name"],
    unique: true,
  },
  icon: String,
  title: String,
  platform: String,
  version: String,
  store: String,
});

const App = mongoose.models.apps || mongoose.model("apps", appSchema);

export default App;
