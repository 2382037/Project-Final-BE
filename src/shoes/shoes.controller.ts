import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Req,
  } from '@nestjs/common';
  import { ShoesService } from './shoes.service';
  import { CreateShoesDTO } from './shoes.dto';
  import { Shoes } from './shoes.entity';
  import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
  import { ApiParam, ApiQuery } from '@nestjs/swagger';
  
  @Controller('shoes')
  export class ShoesController {
    constructor(private readonly shoesService: ShoesService) {}
  
    @Post()
    async create(@Req() request: Request, @Body() dto: CreateShoesDTO) {
      const shoes = new Shoes();
      const user: JwtPayloadDto = request['user'];
      shoes.user_id = user.sub;
      shoes.name = dto.name;
      shoes.size = dto.size;
      shoes.price = dto.price;
      await this.shoesService.save(shoes);
    }
  
    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    async findAll(
      @Req() request: Request,
      @Query('page') page = 1,
      @Query('limit') limit = 10,
    ): Promise<Shoes[]> {
      const user: JwtPayloadDto = request['user'];
      return await this.shoesService.findByUserId(user.sub, page, limit);
    }
  
    @Get(':id')
    @ApiParam({ name: 'id', type: Number })
    async findOne(@Req() request: Request, @Param('id') id: number): Promise<Shoes> {
      const user: JwtPayloadDto = request['user'];
      return await this.shoesService.findByUserIdAndShoeId(user.sub, id);
    }
  
    @Put(':id')
    async updateOne(
      @Req() request: Request,
      @Param('id') id: number,
      @Body() dto: CreateShoesDTO,
    ) {
      const user: JwtPayloadDto = request['user'];
      const shoes = await this.shoesService.findByUserIdAndShoeId(user.sub, id);
      if (!shoes.id) throw new NotFoundException();
      shoes.name = dto.name;
      shoes.size = dto.size;
      shoes.price = dto.price;
      await this.shoesService.save(shoes);
    }
  
    @Delete(':id')
    async deleteOne(@Req() request: Request, @Param('id') id: number) {
      const user: JwtPayloadDto = request['user'];
      const shoes = await this.shoesService.findByUserIdAndShoeId(user.sub, id);
      if (!shoes.id) throw new NotFoundException();
      await this.shoesService.deleteById(id);
    }
  }
  