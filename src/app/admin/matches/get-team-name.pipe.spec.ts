import { GetTeamNamePipe } from './get-team-name.pipe';

describe('GetTeamNamePipe', () => {
  it('create an instance', () => {
    const pipe = new GetTeamNamePipe();
    expect(pipe).toBeTruthy();
  });
});
