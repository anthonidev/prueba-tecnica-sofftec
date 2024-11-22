import { forwardRef, Module } from '@nestjs/common';
import { FusionService } from './fusion.service';
import { FusionController } from './fusion.controller';
import { AppModule } from 'src/app.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [forwardRef(() => AppModule), HttpModule],
  providers: [FusionService],
  controllers: [FusionController],
})
export class FusionModule {}
