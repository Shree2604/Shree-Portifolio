// src/pages/Contact.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact'; // Adjust path if necessary
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast'; // Adjust path if necessary

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
    init: vi.fn(), // Mock init as well since it's called in useEffect
  },
}));

// Mock useToast
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock constants (if they cause issues, though usually not needed for string constants)
vi.mock('@/config/constants', () => ({
  EMAILJS_SERVICE_ID: 'test_service_id',
  EMAILJS_TEMPLATE_ID: 'test_template_id',
  EMAILJS_PUBLIC_KEY: 'test_public_key',
  RESUME_URL: 'http://example.com/resume.pdf',
}));


describe('Contact Form', () => {
  const mockToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Re-assign mock for useToast before each test if needed, or ensure the mock above is sufficient
    (useToast as any).mockReturnValue({ toast: mockToast }); 
    // Ensure emailjs.send is a Vitest mock function
    (emailjs.send as import('vitest').Mock).mockResolvedValue({ status: 200, text: 'OK' });
  });

  test('renders contact form correctly', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  test('allows user to type into form fields', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const nameInput = screen.getByPlaceholderText(/Your Name/i);
    const emailInput = screen.getByPlaceholderText(/Your Email/i);
    const subjectInput = screen.getByPlaceholderText(/Subject/i);
    const messageTextarea = screen.getByPlaceholderText(/Your Message/i);

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
    render(<Contact />);
    
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    await user.click(submitButton);

    expect(mockToast).toHaveBeenCalledWith({
      title: "Missing information",
      description: "Please fill out all fields in the form.",
      variant: "destructive",
    });
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  test('submits the form successfully with valid data', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/Your Name/i);
    const emailInput = screen.getByPlaceholderText(/Your Email/i);
    const subjectInput = screen.getByPlaceholderText(/Subject/i);
    const messageTextarea = screen.getByPlaceholderText(/Your Message/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

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
      expect(mockToast).toHaveBeenCalledWith({
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
    
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/Your Name/i);
    const emailInput = screen.getByPlaceholderText(/Your Email/i);
    const subjectInput = screen.getByPlaceholderText(/Subject/i);
    const messageTextarea = screen.getByPlaceholderText(/Your Message/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });

    await user.type(nameInput, 'Error Test');
    await user.type(emailInput, 'error@example.com');
    await user.type(subjectInput, 'Error Subject');
    await user.type(messageTextarea, 'This message should fail.');
    
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Uh oh! Something went wrong.",
        description: "There was an error sending your message. Please try again or contact me directly.",
        variant: "destructive",
      });
    });
  });
});
