const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');

//lib
const Users = require('./lib/Users');
const Rooms = require('./lib/Rooms');
const Messages = require('./lib/Messages');
const io = socketio();

const socketApi = {
  io
};

io.use(socketAuthorization);

/**
* REDIS ADAPTOR
* */

const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
    host : process.env.REDIS_URI,
    port : process.env.REDIS_PORT
}));



io.on('connection', socket => {
    console.log('kullanıcı giriş yaptı...' , socket.request.user.name);

    Users.upsert(socket.id, socket.request.user);

    Users.list(users =>{
        io.emit('onlineList', users);
    });

    socket.on('disconnect', () => {
        Users.remove(socket.request.user._id);

        Users.list(users =>{
            io.emit('onlineList', users);
        });
    });

    //odanın veritabanına kaydedilmesi
    socket.on('newRoom', roomName => {
        Rooms.upsert(roomName);
        Rooms.list(rooms =>{
            io.emit('roomList', rooms);
        });

    });

    Rooms.list(rooms => {
        io.emit('roomList', rooms);
    });

    socket.on('newMessage', data => {
        const messageData = {
            ...data,
            userId : socket.request.user._id,
            username : socket.request.user.name,
            surname : socket.request.user.surname,
        };
       //console.log(data);
       Messages.upsert(messageData);
       socket.broadcast.emit('receiveMessage', messageData);
    });



});


module.exports = socketApi;