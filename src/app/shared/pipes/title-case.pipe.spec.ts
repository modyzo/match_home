import { CapitalCasePipe } from './capital-case.pipe';

describe('TitleCasePipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalCasePipe();
    expect(pipe).toBeTruthy();
  });
});
