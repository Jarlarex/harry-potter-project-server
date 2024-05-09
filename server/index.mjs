import express from 'express';
import cors from 'cors';
import "./loadEnvironment.mjs";
import likedCharactersRoutes from './routes/likedCharacters.mjs';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/likes", likedCharactersRoutes);

app.use((err, _req, res, next) => {
  console.error(err);
  res.status(500).send("Uh oh! An unexpected error occurred.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
