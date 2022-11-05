import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { App, WrappedApp } from './App';

describe('App', () => {
  it('renders hello world!', () => {
    render(<WrappedApp appConfigData={{
      appId: '',
      name: '',
      server: {
        anonUrl: '',
        isCloud: false,
        webIntegrationId: '',
        name: '',
        isAnonAccess: false,
        serverUrl: ''
      },
      sheets: []
    }} sheetsList={[]} />);

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Hello World');
  });

  it('renders not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <App defaultSheet={''} appName={''} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Not Found');
  });
});
