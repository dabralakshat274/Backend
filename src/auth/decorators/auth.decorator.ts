import { SetMetadata } from '@nestjs/common';
import { Authtype } from '../enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';

export const Auth = (...authTypes: Authtype[]) => 
    SetMetadata(AUTH_TYPE_KEY, authTypes);
