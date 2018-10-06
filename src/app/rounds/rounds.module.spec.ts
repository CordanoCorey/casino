import { RoundsModule } from './rounds.module';

describe('RoundsModule', () => {
  let roundsModule: RoundsModule;

  beforeEach(() => {
    roundsModule = new RoundsModule();
  });

  it('should create an instance', () => {
    expect(roundsModule).toBeTruthy();
  });
});
