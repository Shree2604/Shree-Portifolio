// src/pages/Contact.test.tsx
import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '@/components/ui/toast';
import userEvent from '@testing-library/user-event';
import Contact from './Contact'; // Adjust path if necessary
import emailjs from '@emailjs/browser';
// We don't need to import useToast directly if we're mocking the module entirely

// Define the mock toast function at the top level, so it's a single instance
const mockToastImplementation = vi.fn();

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn(), // Default mock, will be configured in beforeEach or per test
  },
}));

// Mock useToast to use the single mockToastImplementation
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToastImplementation,
  }),
}));

// Mock constants
vi.mock('@/config/constants', () => ({
  EMAILJS_SERVICE_ID: 'test_service_id',
  EMAILJS_TEMPLATE_ID: 'test_template_id',
  EMAILJS_PUBLIC_KEY: 'test_public_key',
  RESUME_URL: 'http://example.com/resume.pdf',
}));

// Helper function to render the component with necessary providers
const renderContactForm = () => {
  return render(
    <MemoryRouter>
      <ToastProvider>
        <Contact />
      </ToastProvider>
    </MemoryRouter>
  );
};

// Helper to get form elements scoped within the form
const getFormElements = () => {
  const form = screen.getByTestId('contact-form');
  return {
    form,
    nameInput: within(form).getByPlaceholderText(/Your Name/i),
    emailInput: within(form).getByPlaceholderText(/Your Email/i),
    subjectInput: within(form).getByPlaceholderText(/Subject/i),
    messageTextarea: within(form).getByRole('textbox', { name: /Message/i }),
    submitButton: within(form).getByRole('button', { name: /Send Message/i }),
  };
};

describe('Contact Form', () => {
  beforeEach(() => {
    // Reset all mocks: clears call history, instances, and results.
    vi.clearAllMocks();

    // Re-establish the default mock for emailjs.send AFTER clearing.
    // This ensures that any test-specific .mockRejectedValueOnce() or other
    // single-use mock implementations are gone, and we have a fresh default.
    vi.mocked(emailjs.send).mockResolvedValue({ status: 200, text: 'OK' });
  });

  test('renders contact form correctly', () => {
    renderContactForm();
    const { nameInput, emailInput, subjectInput, messageTextarea, submitButton } = getFormElements();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(subjectInput).toBeInTheDocument();
    expect(messageTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('allows user to type into form fields', async () => {
    const user = userEvent.setup();
    renderContactForm();
    const { nameInput, emailInput, subjectInput, messageTextarea } = getFormElements();
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john.doe@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageTextarea, 'This is a test message.');
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john.doe@example.com');
    expect(subjectInput).toHaveValue('Test Subject');
    expect(messageTextarea).toHaveValue('This is a test message.');
  });

  test('shows validation error if fields are missing', async () => {
    const user = userEvent.setup();
    renderContactForm();
    const { submitButton } = getFormElements();
    await user.click(submitButton);
    await waitFor(() => {
      // Diagnostic log
      console.log('mockToastImplementation calls:', JSON.stringify(mockToastImplementation.mock.calls, null, 2));
      expect(mockToastImplementation).toHaveBeenCalledWith({
        title: "Missing information",
        description: "Please fill out all fields in the form.",
        variant: "destructive",
      });
    });
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  test('submits the form successfully with valid data', async () => {
    const user = userEvent.setup();
    renderContactForm();
    const { nameInput, emailInput, subjectInput, messageTextarea, submitButton } = getFormElements();

    await user.type(nameInput, 'Jane Doe');
    await user.type(emailInput, 'jane.doe@example.com');
    await user.type(subjectInput, 'Valid Subject');
    await user.type(messageTextarea, 'This is a valid test message.');
    
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledWith(
        'test_service_id', // Mocked service ID
        'test_template_id', // Mocked template ID
        {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          subject: 'Valid Subject',
          message: 'This is a valid test message.',
        }
      );
    });
    
    await waitFor(() => {
      expect(mockToastImplementation).toHaveBeenCalledWith({ // Changed to mockToastImplementation
        title: "Message Sent!",
        description: "Your message has been sent successfully. I'll get back to you soon!",
        variant: "default",
      });
    });

    // Check if form is reset
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(subjectInput).toHaveValue('');
    expect(messageTextarea).toHaveValue('');
  });

  test('shows error toast if emailjs.send fails', async () => {
    const user = userEvent.setup();
    // Mock emailjs.send to reject for this specific test
    (emailjs.send as import('vitest').Mock).mockRejectedValueOnce(new Error('EmailJS failed'));
    
    renderContactForm();
    const { nameInput, emailInput, subjectInput, messageTextarea, submitButton } = getFormElements();

    await user.type(nameInput, 'Error Test');
    await user.type(emailInput, 'error@example.com');
    await user.type(subjectInput, 'Error Subject');
    await user.type(messageTextarea, 'This message should fail.');
    
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockToastImplementation).toHaveBeenCalledWith({ // Changed to mockToastImplementation
        title: "Uh oh! Something went wrong.",
        description: "There was an error sending your message. Please try again or contact me directly.",
        variant: "destructive",
      });
    });
  });
});
