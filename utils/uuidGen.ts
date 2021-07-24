import { v4 as uuidv4 } from 'uuid';
import { UUIDv4 } from '~/interfaces/uuidv4';

export function genUUIDv4(): UUIDv4 {
  return uuidv4()
}