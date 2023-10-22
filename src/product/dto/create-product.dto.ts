import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name;

  @IsNotEmpty()
  @IsInt()
  price;
}
