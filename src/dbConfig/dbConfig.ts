import mongoose, { ConnectOptions } from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    } as ConnectOptions);

    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {});
    connection.on("error", (err) => {
      process.exit();
    });
  } catch (error) {}
}
