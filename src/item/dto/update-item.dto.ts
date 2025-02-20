import { IsBoolean, IsString } from "class-validator"


export class UpdateItemDto {
    @IsString()
    name:string

    @IsBoolean()
    public:boolean
}
