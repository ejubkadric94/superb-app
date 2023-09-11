import app from "./index";

const PORT: number = Number(process.env.PORT) || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
}

export default app;