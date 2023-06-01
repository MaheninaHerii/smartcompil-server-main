import { Test, TestingModule } from '@nestjs/testing';
import { ContactezNousService } from './contactez-nous.service';

describe('ContactezNousService', () => {
  let service: ContactezNousService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactezNousService],
    }).compile();

    service = module.get<ContactezNousService>(ContactezNousService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
