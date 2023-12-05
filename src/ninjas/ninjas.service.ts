import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja-dto';
import { UpdateNinjaDto } from './dto/update-ninja-dto';
@Injectable()
export class NinjasService {
    private ninjas = [
        {id: 1, name: 'alex', weapon: "a"},
        {id:2, name: 'bar', weapon: "b"}
    ]

    getNinjas(weapon?: 'a' | 'b'){
        if (weapon) {
            return this.ninjas.filter(ninja => ninja.weapon === weapon);
        }

        return this.ninjas;
    }

    getNinja(id: number) {
        const ninja = this.ninjas.find(n => n.id === id);

        if (!ninja) {
            throw new Error(`Ninja with ID ${id} not found`);
        }

        return ninja;
    }

    createNinja(createNinjaDto: CreateNinjaDto) {
        const newNinja = {
            id: Date.now(),
            ...createNinjaDto,
        };

        this.ninjas.push(newNinja);

        return newNinja;
    }


    updateNinja(id: number, updateNinjaDTO: UpdateNinjaDto) {
        const index = this.ninjas.findIndex(ninja => ninja.id === id);

        if (index === -1) {
            throw new Error(`Ninja with ID ${id} not found`);
        }

        this.ninjas[index] = { ...this.ninjas[index], ...updateNinjaDTO };

        return this.ninjas[index];
    }

    deleteNinja(id: number) {
        const index = this.ninjas.findIndex(ninja => ninja.id === id);

        if (index === -1) {
            throw new Error(`Ninja with ID ${id} not found`);
        }

        this.ninjas.splice(index, 1);
    }
}
