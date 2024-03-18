import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  username: string;
  
  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsArray()
  hobbies: string[];
  }  