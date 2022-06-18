import express from "express";
import imageRouter from "./routes/images";

const app = express();

app.use("/api/images", imageRouter);

//TEST DUMMY ENDPOINT
app.get("/test", (req, res) => {
  res.send("hello");
});

//SERVER LISTNENING IN PORT 3000
app.listen(3000, () => {
  console.log("Listening");
});

export default app;
