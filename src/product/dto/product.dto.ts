import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name;

  @IsNotEmpty()
  @IsInt()
  price;
}
