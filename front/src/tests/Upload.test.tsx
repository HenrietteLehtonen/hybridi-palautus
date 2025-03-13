import {fireEvent, render, screen} from '@testing-library/react';
import Upload from '../views/Upload';

test('test upload btn', () => {
  render(<Upload />);

  // mitä tehdään, mitä haetaan (klikataan)
  fireEvent.click(screen.getByRole('button'));
  // mitä odotetaan
  expect(screen.getByText('Uploading...')).toBeDefined();
});
