import { Test, TestingModule } from '@nestjs/testing';
import { ContactezNousController } from './contactez-nous.controller';

describe('ContactezNousController', () => {
  let controller: ContactezNousController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactezNousController],
    }).compile();

    controller = module.get<ContactezNousController>(ContactezNousController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
