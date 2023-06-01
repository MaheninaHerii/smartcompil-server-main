import { Test, TestingModule } from '@nestjs/testing';
import { NosServicesEtProduitsService } from './nos-services-et-produits.service';

describe('NosServicesEtProduitsService', () => {
  let service: NosServicesEtProduitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NosServicesEtProduitsService],
    }).compile();

    service = module.get<NosServicesEtProduitsService>(NosServicesEtProduitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
