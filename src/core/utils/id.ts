import { randomBytes } from 'node:crypto';

export function generateId(prefix: string = 'blk'): string {
  const suffix = randomBytes(4).toString('hex');
  return `${prefix}_${suffix}`;
}
