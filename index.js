const redis = require("redis");

const redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.on('error', err => {
    console.error(err);
});

redisClient.set('myName', 'zhimin111', redis.print);

redisClient.get('myName', (err, value) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(value);
    redisClient.quit();
})