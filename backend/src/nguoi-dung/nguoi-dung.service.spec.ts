import { Test, TestingModule } from '@nestjs/testing';
import { NguoiDungService } from './nguoi-dung.service';

describe('NguoiDungService', () => {
  let service: NguoiDungService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NguoiDungService],
    }).compile();

    service = module.get<NguoiDungService>(NguoiDungService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
