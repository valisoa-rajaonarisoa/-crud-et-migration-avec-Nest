import { IsString } from "class-validator";


export class CreateListingDto {
    @IsString()
    description:string //pour la creation, ban on a juste besoin du desc
}