import { IsArray, IsBoolean, IsObject} from "class-validator"
import { CreateCommentDto } from "../comment/create-comment.dto"


export class UpdateItemDto {
    @IsBoolean()
    public:boolean

    comments:CreateCommentDto[]
}
