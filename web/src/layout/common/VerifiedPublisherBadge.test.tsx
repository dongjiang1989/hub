import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import VerifiedPublisherBadge from './VerifiedPublisherBadge';

describe('VerifiedPublisherBadge', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates snapshot', () => {
    const { asFragment } = render(<VerifiedPublisherBadge verifiedPublisher />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders label', async () => {
    render(<VerifiedPublisherBadge verifiedPublisher />);
    expect(screen.getByText('Verified Publisher')).toBeInTheDocument();

    const badge = screen.getByTestId('elementWithTooltip');
    expect(badge).toBeInTheDocument();
    await userEvent.hover(badge);

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    expect(screen.getByText('The publisher owns the repository')).toBeInTheDocument();
  });

  it('does not render label', () => {
    const { container } = render(<VerifiedPublisherBadge verifiedPublisher={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});
