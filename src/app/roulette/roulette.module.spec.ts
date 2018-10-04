import { RouletteModule } from './roulette.module';

describe('RouletteModule', () => {
  let rouletteModule: RouletteModule;

  beforeEach(() => {
    rouletteModule = new RouletteModule();
  });

  it('should create an instance', () => {
    expect(rouletteModule).toBeTruthy();
  });
});
