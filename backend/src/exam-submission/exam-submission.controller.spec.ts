import { Test, TestingModule } from '@nestjs/testing';
import { ExamSubmissionController } from './exam-submission.controller';

describe('ExamSubmissionController', () => {
  let controller: ExamSubmissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamSubmissionController],
    }).compile();

    controller = module.get<ExamSubmissionController>(ExamSubmissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
