import { Test, TestingModule } from '@nestjs/testing';
import { SlideTitleController } from './slide-title.controller';

describe('SlideTitleController', () => {
  let controller: SlideTitleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlideTitleController],
    }).compile();

    controller = module.get<SlideTitleController>(SlideTitleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
