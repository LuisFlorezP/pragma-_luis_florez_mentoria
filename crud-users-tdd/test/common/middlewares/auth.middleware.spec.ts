import { AuthMiddleware } from '@src/common/middlewares/auth.middleware';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    authMiddleware = new AuthMiddleware();
    req = {
      headers: {}
    };
    res = {};
    next = jest.fn();
  });

  it('should throw UnauthorizedException if authorization header is missing', () => {
    expect(() => authMiddleware.use(req, res, next)).toThrow(UnauthorizedException);
    expect(() => authMiddleware.use(req, res, next)).toThrow('Authorization header is missing');
  });

  it('should throw UnauthorizedException if token is missing', () => {
    req.headers['authorization'] = 'Bearer ';
    expect(() => authMiddleware.use(req, res, next)).toThrow(UnauthorizedException);
    expect(() => authMiddleware.use(req, res, next)).toThrow('Token is missing');
  });

  it('should call next if authorization header and token are present', () => {
    req.headers['authorization'] = 'Bearer valid-token';
    authMiddleware.use(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});