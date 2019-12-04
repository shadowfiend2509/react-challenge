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
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const Msg = require('./models/message')

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URL, { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongoDb now is connected'))
  .catch(console.log)

app.use('/', routes);


io.on('connection', (socket) => {
  console.log('connect to socket ios')
  socket.on('send-message', (name, message) => {
    console.log('masuk dari client', name, message)
    io.emit('send-message', name, message)
  })
})

app.use(errorHandler);

http.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))