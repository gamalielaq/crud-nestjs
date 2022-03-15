import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

// PartialType: convierte todas las propiedades de la clase CreateUserDto en opcionales ya que en la misma son obligatorias

export class EditUserDto  extends PartialType(CreateUserDto) {
    
}   
