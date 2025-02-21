import { IsArray, IsBoolean, IsObject, IsString } from "class-validator";
import { CreateListingDto } from "../listing/create-listing.dto";
import { CreateTagDto } from "../tag/create-tag.dto";

export class CreateItemDto {

    @IsString()
    name:string;

    @IsBoolean()
    public:boolean

    @IsObject()
    listing:CreateListingDto //exporter le dto du listign create pour avoir un objet listing:{descr}

    @IsArray()
    tags:CreateTagDto[]
}
