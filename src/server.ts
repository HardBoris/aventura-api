import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected!");
    const port = process.env.PORT ?? 3000;

    app.listen(port, () => {
      console.log(`App running o http://localhost:${port}/`);
    });
  })
  .catch((err) => console.error(err));
