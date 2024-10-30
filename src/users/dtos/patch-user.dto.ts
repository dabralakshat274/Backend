import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./createuser.dto";
  
/**
 * This extends class CreateUserDto as a PATCH Method
 */
  export class PatchUserDto extends PartialType(CreateUserDto)
  {}
  