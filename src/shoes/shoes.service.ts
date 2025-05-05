import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shoes } from './shoes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShoesService {
  constructor(
    @InjectRepository(Shoes) private shoesRepo: Repository<Shoes>,
  ) {}

  async save(shoes: Shoes): Promise<Shoes> {
    return this.shoesRepo.save(shoes);
  }

  async findByUserId(userId: number, page: number, limit: number): Promise<Shoes[]> {
    return this.shoesRepo.find({
      where: { user_id: userId },
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });
  }

  async findByUserIdAndShoeId(userId: number, shoeId: number): Promise<Shoes> {
    const shoe = await this.shoesRepo.findOne({
      where: { user_id: userId, id: shoeId },
    });
    return shoe || new Shoes();
  }

  async deleteById(id: number) {
    await this.shoesRepo.delete({ id });
  }
}
