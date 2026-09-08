import { render, screen, within } from '@testing-library/react';
import { App } from './App';
import { site } from '../content/site';
describe('App', () => {
  it('shows the identity, small-scope work and navigation', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: '做有用的软件' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'tft-trait-atlas' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'webArt' })).toBeInTheDocument();
    const navigation = screen.getByRole('navigation', { name: '主要导航' });
    expect(within(navigation).getByRole('link', { name: '作品' })).toHaveAttribute('href', '#work');
  });
  it('keeps all external links safe and avoids nested links', () => {
    const { container } = render(<App />);
    const externalLinks = screen.getAllByRole('link').filter(link => link.getAttribute('href')?.startsWith('https:'));
    for (const link of externalLinks) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    }
    for (const project of site.projects) expect(externalLinks.some(link => link.getAttribute('href') === project.sourceUrl)).toBe(true);
    expect(container.querySelector('a a')).toBeNull();
  });
});
