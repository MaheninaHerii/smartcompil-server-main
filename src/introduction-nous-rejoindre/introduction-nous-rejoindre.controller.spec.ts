import { Test, TestingModule } from '@nestjs/testing';
import { IntroductionNousRejoindreController } from './introduction-nous-rejoindre.controller';

describe('IntroductionNousRejoindreController', () => {
  let controller: IntroductionNousRejoindreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntroductionNousRejoindreController],
    }).compile();

    controller = module.get<IntroductionNousRejoindreController>(IntroductionNousRejoindreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
