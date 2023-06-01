import { Test, TestingModule } from '@nestjs/testing';
import { NousSommesService } from './nous-sommes.service';

describe('NousSommesService', () => {
  let service: NousSommesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NousSommesService],
    }).compile();

    service = module.get<NousSommesService>(NousSommesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
