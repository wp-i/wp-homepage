import { render, screen, within } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renders the concise WP statement and project hierarchy', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: '做有用的软件' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'GitHub Deep Search' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('三个项目')).not.toBeInTheDocument();
    expect(
      screen.queryByText(/认真理解问题，把复杂路径变成/),
    ).not.toBeInTheDocument();
  });

  it('exposes the confirmed GitHub destinations as safe external links', () => {
    render(<App />);

    const destinations = [
      'https://github.com/wp-i',
      'https://github.com/wp-i/nodestitch',
      'https://github.com/wp-i/swordshield-notes',
      'https://github.com/wp-i/comment-vision-claw',
      'https://github.com/wp-i/github-deep-search',
    ];

    destinations.forEach((destination) => {
      const links = screen
        .getAllByRole('link')
        .filter((link) => link.getAttribute('href') === destination);

      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noreferrer');
      });
    });
  });

  it('provides a skip link and restrained in-page navigation', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: '跳到主要内容' })).toHaveAttribute(
      'href',
      '#main-content',
    );
    const navigation = screen.getByRole('navigation', { name: '主要导航' });
    expect(navigation).toBeInTheDocument();
    expect(within(navigation).getByRole('link', { name: '项目' })).toHaveAttribute(
      'href',
      '#work',
    );
    expect(within(navigation).queryByRole('link', { name: /关于|原则/ })).toBeNull();
  });
});
