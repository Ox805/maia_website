import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import emailjs from '@emailjs/browser';
import AccessRequestModal from './AccessRequestModal';

jest.mock('@emailjs/browser', () => ({
  __esModule: true,
  default: { send: jest.fn() },
}));

const sendMock = (emailjs as unknown as { send: jest.Mock }).send;

describe('AccessRequestModal', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  test('does not render when isOpen is false', () => {
    render(<AccessRequestModal productName="AlphaAI" isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders with product name in heading when isOpen is true', () => {
    render(<AccessRequestModal productName="AlphaAI" isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /AlphaAI/i })).toBeInTheDocument();
  });

  test('submits filled form via emailjs.send with the expected payload', async () => {
    sendMock.mockResolvedValueOnce({ status: 200, text: 'OK' });
    const onClose = jest.fn();
    render(<AccessRequestModal productName="AlphaPoker" isOpen={true} onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Sam Sample' } });
    fireEvent.change(screen.getByLabelText(/company/i), { target: { value: 'Acme Co' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'sam@example.com' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Austin' } });
    fireEvent.change(screen.getByLabelText(/reason/i), { target: { value: 'Want to try it.' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(sendMock).toHaveBeenCalledTimes(1));
    const [serviceId, templateId, payload] = sendMock.mock.calls[0];
    expect(serviceId).toBe('service_swi6amx');
    expect(typeof templateId).toBe('string');
    expect(payload).toEqual(expect.objectContaining({
      product_name: 'AlphaPoker',
      from_name: 'Sam Sample',
      company: 'Acme Co',
      from_email: 'sam@example.com',
      city: 'Austin',
      reason: 'Want to try it.',
    }));
  });

  test('calls onClose when the backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<AccessRequestModal productName="AlphaAI" isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('access-modal-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
