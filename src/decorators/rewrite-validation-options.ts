import { SetMetadata, ValidationPipeOptions } from '@nestjs/common';

export const REWRITE_VALIDATION_OPTIONS = 'REWRITE_VALIDATION_OPTIONS';

export const RewriteValidationOptions = (options: ValidationPipeOptions) =>
  SetMetadata(REWRITE_VALIDATION_OPTIONS, options);
