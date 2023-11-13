import { ApiProperty,PickType } from "@nestjs/swagger";
import { describe } from "node:test";
import { Users } from "../../entities/Users";


export class JoinRequestDto extends PickType(Users,[
    'email',
    'nickname',
    'password',

]as const){}