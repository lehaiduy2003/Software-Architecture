import { createClient } from 'redis';

const redisClient = createClient({
    username: 'default',
    password: 'q9gWudSO2mhM801PSATgUdM5sgjlRrXs',
    socket: {
        host: 'redis-15315.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com',
        port: 15315
    }
});

redisClient.on('error', (err : any) => console.log('Redis Client Error', err));

export default redisClient;