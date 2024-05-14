import { Test, TestingModule } from '@nestjs/testing';
import { CasosController } from './casos.controller';

describe('CasosController', () => {
  let controller: CasosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasosController],
    }).compile();

    controller = module.get<CasosController>(CasosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
