import { render } from '@testing-library/react';

import ReactLib from './reactLib';

describe('ReactLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactLib />);
    expect(baseElement).toBeTruthy();
  });
});
