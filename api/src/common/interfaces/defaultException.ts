import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class DefaultException {
  @ApiProperty()
  statusCode: HttpStatus;
  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  message: string | string[];
  @ApiProperty()
  error: string;
}
