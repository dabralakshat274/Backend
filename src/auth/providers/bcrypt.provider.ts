import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hashPassword(data: string | Buffer): Promise<string> {
    //generate salt using sen salt method
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(data, salt);
    //throw new Error('Method not implemented.');
  }

  comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {

    return bcrypt.compare(data,encrypted)                 //returns boolean
    //throw new Error('Method not implemented');
  }
}
