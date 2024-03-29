//yeni bir message ekleme için redis işlemleri

const redisClient = require('../redisClient');
const shortid = require('shortid');
const _ = require('lodash');

function Messages() {
    this.client = redisClient.getClient()
}

module.exports = new Messages();

Messages.prototype.upsert = function ({ roomId, message, userId, username, surname,}) {

    this.client.hset(
        'messages' + roomId,
         shortid.generate(),
        JSON.stringify({
            userId,
            message,
            username,
            surname,
            when : Date.now()
        }),
        err => {
            if (err) {
                console.error(err);
            }
        }
    )
};


Messages.prototype.list = function (roomId, callback) {
    let messageList = [];

    this.client.hgetall('messages' + roomId, function (err, messages) {
        if(err){
            console.error(err);
            return callback([]);
        }

        for (let message in messages){
            messageList.push(JSON.parse(messages[message]));
        }
        return callback(_.orderBy(messageList, 'when', 'asc'));
    });
};

