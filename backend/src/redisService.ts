import Redis from 'ioredis';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';

const redis = new Redis();

export default {
  get: (key: string) => from(redis.get(key)).pipe(
    catchError(err => {
      throw new Error('Redis get failed: ' + err.message);
    })
  ),
  set: (key: string, value: string) => from(redis.set(key, value)).pipe(
    catchError(err => {
      throw new Error('Redis set failed: ' + err.message);
    })
  )
};
