import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({default:true})
    public:boolean


    //celui ci a pour objectif de mettre les attr optionnelle en utilisation, pour eviter err ts par exmple on peut faire ca sans err const x = new Item({name:"lala"}) regarde,j'ai pas mis le plublic, de plus 
    constructor(item:Partial<Item>){
        Object.assign(this,item);
    }
}
