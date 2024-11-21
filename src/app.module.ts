import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamoDBService } from './dynamodb.service';
import { FusionModule } from './fusion/fusion.module';
@Module({
  imports: [ConfigModule.forRoot(), FusionModule],
  providers: [DynamoDBService],
  exports: [DynamoDBService],
})
export class AppModule {}
