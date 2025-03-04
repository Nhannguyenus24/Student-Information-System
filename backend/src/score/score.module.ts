import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { Score, ScoreSchema } from 'src/schemas/score.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }])],
  providers: [ScoreService],
  controllers: [ScoreController]
})
export class ScoreModule {}
