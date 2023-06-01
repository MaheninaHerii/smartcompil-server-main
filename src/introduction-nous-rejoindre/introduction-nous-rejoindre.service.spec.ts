import { Test, TestingModule } from '@nestjs/testing';
import { IntroductionNousRejoindreService } from './introduction-nous-rejoindre.service';

describe('IntroductionNousRejoindreService', () => {
  let service: IntroductionNousRejoindreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntroductionNousRejoindreService],
    }).compile();

    service = module.get<IntroductionNousRejoindreService>(IntroductionNousRejoindreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
