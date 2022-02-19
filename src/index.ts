import app from "./express/server";
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on ${port}`));
