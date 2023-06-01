import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

/**
 * RefreshToken dto
 */
export class RefreshTokenDto {
  /**
   * access token
   */
  @ApiModelProperty()
  readonly refreshToken: string;
}
