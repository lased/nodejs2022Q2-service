import { IsNotEmpty, IsString } from 'class-validator';

import { RewriteValidationOptions } from 'src/decorators';

@RewriteValidationOptions({ errorHttpStatusCode: 401 })
export class RefreshAuthDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
