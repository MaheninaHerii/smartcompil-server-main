import { Test, TestingModule } from '@nestjs/testing';
import { PosteController } from './poste.controller';

describe('PosteController', () => {
  let controller: PosteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosteController],
    }).compile();

    controller = module.get<PosteController>(PosteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
