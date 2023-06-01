import { Test, TestingModule } from '@nestjs/testing';
import { NosServicesEtProduitsController } from './nos-services-et-produits.controller';

describe('NosServicesEtProduitsController', () => {
  let controller: NosServicesEtProduitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NosServicesEtProduitsController],
    }).compile();

    controller = module.get<NosServicesEtProduitsController>(NosServicesEtProduitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
