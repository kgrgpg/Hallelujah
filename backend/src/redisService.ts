import Redis from 'ioredis';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const redis = new Redis();

export default {
  get: (key: string): Observable<any> => from(redis.get(key)).pipe(
    map(result => {
      if (result) {
        console.log('Fetched from Redis:', result);
        return result; // Return the raw string to be parsed later
      }
      return null;
    }),
    catchError(err => {
      if (err instanceof Error) {
        throw new Error('Redis get failed: ' + err.message);
      } else {
        throw new Error('Redis get failed: Unknown error');
      }
    })
  ),
  set: (key: string, value: string): Observable<any> => from(redis.set(key, value)).pipe(
    map(() => true),
    catchError(err => {
      if (err instanceof Error) {
        throw new Error('Redis set failed: ' + err.message);
      } else {
        throw new Error('Redis set failed: Unknown error');
      }
    })
  ),
  del: (key: string): Observable<any> => from(redis.del(key)).pipe(
    map(() => true),
    catchError(err => {
      if (err instanceof Error) {
        throw new Error('Redis del failed: ' + err.message);
      } else {
        throw new Error('Redis del failed: Unknown error');
      }
    })
  )
};
