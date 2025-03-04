import { Test, TestingModule } from '@nestjs/testing';
import { ExamSubmissionService } from './exam-submission.service';

describe('ExamSubmissionService', () => {
  let service: ExamSubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamSubmissionService],
    }).compile();

    service = module.get<ExamSubmissionService>(ExamSubmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
