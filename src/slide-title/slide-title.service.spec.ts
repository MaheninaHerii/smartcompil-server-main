import { Test, TestingModule } from '@nestjs/testing';
import { SlideTitleService } from './slide-title.service';

describe('SlideTitleService', () => {
  let service: SlideTitleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlideTitleService],
    }).compile();

    service = module.get<SlideTitleService>(SlideTitleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
