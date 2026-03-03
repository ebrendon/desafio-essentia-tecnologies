import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard({} as any, {} as any, { getAllAndOverride: () => true } as any)).toBeDefined();
  });
});
