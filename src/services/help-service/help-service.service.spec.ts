import { Test, TestingModule } from '@nestjs/testing';
import { HelpServiceService } from './help-service.service';

describe('HelpServiceService', () => {
  let service: HelpServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpServiceService],
    }).compile();

    service = module.get<HelpServiceService>(HelpServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
