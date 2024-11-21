import { forwardRef, Module } from '@nestjs/common';
import { FusionService } from './fusion.service';
import { FusionController } from './fusion.controller';
import { AppModule } from 'src/app.module';
@Module({
  imports: [forwardRef(() => AppModule)],
  providers: [FusionService],
  controllers: [FusionController],
})
export class FusionModule {}
