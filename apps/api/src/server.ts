import app from './index';

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
