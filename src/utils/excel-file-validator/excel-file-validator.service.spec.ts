import { Test, TestingModule } from '@nestjs/testing';
import { ExcelFileValidatorService } from './excel-file-validator.service';

describe('ExcelFileValidatorService', () => {
  let service: ExcelFileValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcelFileValidatorService],
    }).compile();

    service = module.get<ExcelFileValidatorService>(ExcelFileValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
