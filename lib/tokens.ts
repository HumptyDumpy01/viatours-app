// import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export async function generateVerificationToken() {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  return token;
}