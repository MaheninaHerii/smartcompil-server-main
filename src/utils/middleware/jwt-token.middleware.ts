import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { JwtService } from "@nestjs/jwt";

/**
 * JWT token middle wire
 *
 * decode & verify authorization bearer token and
 * inject as req user
 */
@Injectable()
export class JwtTokenMiddleware implements NestMiddleware {

  /**
   * @ignore
   */
  constructor(
    protected readonly jwtService: JwtService
  ) {
  }

  /**
   * @ignore
   */
  async use(req: any, res: any, next: () => void) {

    req.locals = req.locals || {};
    req.locals.user = null;

    const token: string = JwtTokenMiddleware.getBearerToken(req);
    if (token) {
      const isTokenValid: boolean = this.verifyToken(token);
      if (isTokenValid) {
        const payload: any = JwtTokenMiddleware.getTokenPayload(token);
        req.locals.user = {
          id: payload.userId,
          email: payload.email,
          roles: payload.roles
        };
      }
    }

    next();
  }

  /**
   * Decode given jwt token and returns token payload
   */
  private static getTokenPayload(token: string): any {
    const decodedToken: any = jwt.decode(token, { complete: true });
    return decodedToken.payload;
  }

  /**
   * verify token
   */
  private verifyToken(token: string): boolean {
    try {
      return !!this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  /**
   * returns bearer header authorization token from request object
   */
  private static getBearerToken(req: any): string {
    try {
      return req.headers.authorization.split(" ")[1];
    } catch (error) {
      return null;
    }
  }
}
