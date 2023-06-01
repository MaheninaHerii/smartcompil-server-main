import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

/**
 * Role based auth guard
 */
@Injectable()
export class RolesGuard implements CanActivate {

  /**
   * @ignore
   */
  constructor(private readonly reflector: Reflector) {
  }

  /**
   * @ignore
   */
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (!request || !request.locals) return false;
    const user = request.locals.user;
    if (!user) return false;
    const hasRole = () => user.roles.find((role) => roles.includes(role));
    return user && user.roles && hasRole();
  }
}
