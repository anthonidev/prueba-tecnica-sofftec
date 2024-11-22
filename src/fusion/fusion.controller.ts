import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FusionService } from './fusion.service';
import { FusionDto } from './dto/fusion.dto';

@Controller('fusion')
export class FusionController {
  constructor(private fusionService: FusionService) {}

  @Get('fusionados')
  async getFusionados() {
    return await this.fusionService.getFusionData();
  }

  @Post('almacenar')
  async storeCustomData(@Body() data: any) {
    // Implementar lógica para almacenar datos personalizados
  }

  @Get('historial')
  async getHistory(@Query('page') page: number = 1) {
    // Implementar lógica de paginación
  }
}
