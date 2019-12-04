if(process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}

const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors');
const morgan= require('morgan');
const errorHandler= require('./middlewares/errorHandler');
const routes= require('./routes');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URL, { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongoDb now is connected'))
  .catch(console.log)

app.use('/', routes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))