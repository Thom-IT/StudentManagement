module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://tzjzgitazfyyoj:deba41a9eda109a2b8c5552a75d9f769b00dd95499faf3e09565873721fd48f9@ec2-54-156-121-142.compute-1.amazonaws.com:5432/d7pcsf1upnqg1g',
        migrations: {
            directory: _dirname + '/migrations',
        },
        seeds: {
            directory: __dirname + '/controllers',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: _dirname + '/migrations',
        },
        seeds: {
            directory: __dirname + '/controllers',
        },
    },

};