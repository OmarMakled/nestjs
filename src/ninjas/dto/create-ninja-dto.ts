import { IsEnum, MinLength } from "class-validator"

export class CreateNinjaDto {
    id: number

    @MinLength(5)
    name: string

    @IsEnum(['A', 'B'], {message: 'Select A or B'})
    weapon: 'A' | 'B'
}