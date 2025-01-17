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
const cron = require('./helpers/cron')

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/API-Dota', { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongoDb now is connected'))
  .catch(console.log)

app.use('/', routes);


io.on('connection', (socket) => {
  console.log('connect to socket ios')
  socket.on('send-message', data => {
    console.log(data)
    io.emit('send-message', data)
  })
})

app.use(errorHandler);

http.listen(PORT, cron, () => console.log(`Listening on PORT ${PORT}`))