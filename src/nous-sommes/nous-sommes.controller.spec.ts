import { Test, TestingModule } from '@nestjs/testing';
import { NousSommesController } from './nous-sommes.controller';

describe('NousSommesController', () => {
  let controller: NousSommesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NousSommesController],
    }).compile();

    controller = module.get<NousSommesController>(NousSommesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
