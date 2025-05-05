import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shoes } from './shoes.entity';
import { ShoesService } from './shoes.service';
import { ShoesController } from './shoes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shoes])],
  providers: [ShoesService],
  controllers: [ShoesController],
})
export class ShoesModule {}
