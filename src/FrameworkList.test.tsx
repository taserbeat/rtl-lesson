import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';

import FrameworkList, { Framwwork } from './FrameworkList';

afterEach(() => {
  cleanup();
});

describe('Rendering the list with props', () => {
  it('Should render No data! when no data proped', () => {
    render(<FrameworkList />);
    expect(screen.getByText('No data!')).toBeInTheDocument();
  });

  it('Should render list item correctly', () => {
    const frameworkDummys: Framwwork[] = [
      { id: 0, item: 'React dummy' },
      { id: 1, item: 'Angular dummy' },
      { id: 2, item: 'Vue dummy' },
    ];

    render(<FrameworkList frameworks={frameworkDummys} />);
    const frameworkItems = screen
      .getAllByRole('listitem')
      .map((element) => element.textContent);

    const dummyItems = frameworkDummys.map(
      (frameworkDummy) => frameworkDummy.item
    );

    expect(frameworkItems).toEqual(dummyItems);
    expect(screen.queryByText('No data!')).toBeNull();
  });
});
