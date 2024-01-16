import jwt from 'jsonwebtoken';

export class JwtService {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(data: any, expiresIn: string): string {
    return jwt.sign(data, this.secretKey, { expiresIn });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      console.error('JWT verification failed:', error);
      return null;
    }
  }
}
