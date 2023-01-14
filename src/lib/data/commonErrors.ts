import ISpotError from '../interfaces/ISpotError';

const COMMON_ERRORS: { [key: string]: ISpotError } = {
  USER_NOT_FOUND: {
    name: 'USER_NOT_FOUND',
    code: 'USER_001',
    message: 'User not found',
    description: 'User not found',
  },
  INVALID_CREDENTIALS: {
    name: 'INVALID_CREDENTIALS',
    code: 'USER_002',
    message: 'Invalid credentials',
    description: 'Invalid credentials',
  },
  INVALID_ROLE: {
    name: 'INVALID_ROLE',
    code: 'USER_003',
    message: 'Invalid role',
    description: 'Invalid role',
  },
  INVALID_TOKEN: {
    name: 'INVALID_TOKEN',
    code: 'USER_004',
    message: 'Invalid token',
    description: 'Invalid token',
  },
  TOKEN_MISSING: {
    name: 'TOKEN_MISSING',
    code: 'USER_005',
    message: 'Token missing',
    description: 'Token missing',
  },
};

export default COMMON_ERRORS;
