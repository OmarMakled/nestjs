import { Controller, Post, Get, Param, Query, Body, Put, Delete, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja-dto';
import { NinjasService } from './ninjas.service';
import { UpdateNinjaDto } from './dto/update-ninja-dto';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
@UseGuards(BeltGuard)
export class NinjasController {
    constructor(private readonly ninjaService: NinjasService){

    }
    @Get()
    getNinjas(@Query('weapon') weapon: 'a' | 'b'){
        return this.ninjaService.getNinjas(weapon)
    }

    @Get(':id')
    getNinja(@Param('id', ParseIntPipe) id: number){
        try{
            return this.ninjaService.getNinja(id)
        }catch(err){
            throw new NotFoundException
        }
    }

    @Post()
    createNinja(@Body(new ValidationPipe()) body: CreateNinjaDto) {
        return this.ninjaService.createNinja(body);
    }

    @Put(':id')
    updateNinja(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateNinjaDto) {
        try{
            return this.ninjaService.updateNinja(id, body);
        }catch(err){
            throw new NotFoundException
        }
    }

    @Delete(':id')
    deleteNinja(@Param('id', ParseIntPipe) id: number) {
        try{
            this.ninjaService.deleteNinja(id);
            return { message: 'Ninja deleted successfully' };
        }catch(err){
            throw new NotFoundException
        }
    }
}
