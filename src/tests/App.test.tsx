import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from '../../src/App.tsx';

// --- FIREBASE MOCK ---
// This prevents the test from crashing because it can't find your Firebase config/API keys.
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
  getApp: vi.fn(),
}));

vi.mock('firebase/auth', () => {
  // Create a reusable mock user object that has the methods your code calls
  const mockUser = {
    uid: 'test-user-123',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.png',
    emailVerified: true,
    reload: vi.fn(() => Promise.resolve()),
  };

  return {
    getAuth: vi.fn(() => ({
      currentUser: mockUser,
      signOut: vi.fn(() => Promise.resolve()),
    })),
    // All these methods return a "UserCredential" object which contains our mockUser
    signInWithEmailAndPassword: vi.fn(() => 
      Promise.resolve({ user: mockUser })
    ),

    createUserWithEmailAndPassword: vi.fn(() => 
      Promise.resolve({ user: mockUser })
    ),

    signInWithPopup: vi.fn(() => 
      Promise.resolve({ user: mockUser })
    ),

    updateProfile: vi.fn(() => Promise.resolve()),

    sendEmailVerification: vi.fn(() => Promise.resolve()),
    
    GoogleAuthProvider: class {
      static credential = vi.fn();
    },
    googleProvider: {}, 
  };
});

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
}));

describe('MoneyTrack Navigation', () => {
  it('renders the Home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const brandElements = screen.getAllByText(/MoneyTrack/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it('renders the Login page when navigating to /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByText(/MoneyTrack/i)).toBeInTheDocument();
  });
});

/*
vi: This is the main object from Vitest that provides all the testing utilities. It’s like a toolbox for writing tests.
vi.mock('module-name', factory): Tells Vitest: "When the code asks for this module, don't give them the real one. Give them this fake object I created instead."
vi.fn(): This creates a Mock Function. It’s an empty shell that does nothing but record that it was called. This is why your tests don't actually try to talk to Google's servers.
screen: Your "eyes." It provides methods to find things on the page (like buttons or text).
describe: A way to group related tests together. It’s like saying, "All these tests are about the navigation of the app."
it: This defines an individual test case. It’s like saying, "This test checks if the Home page renders correctly."
expect: This is how you make assertions in your tests. You say, "I expect this thing to be true." If it’s not true, the test will fail and tell you what went wrong.
MemoryRouter: This is a special type of Router from React Router that keeps the history of your "navigation" in memory. It’s perfect for testing because it doesn’t mess with the actual browser URL,
it's essential because App.tsx contains <Routes>, which crash if they aren't inside a Router.
Promise.resolve(...): Since signInWithPopup is an asynchronous function (it returns a Promise), we mock it to return a "resolved" promise immediately so your test doesn't hang forever.

To test your application locally: npm run test Every time you press Ctrl + S to save a file, Vitest instantly re-runs only the tests affected by that change. It’s incredibly fast for "Test-Driven Development."
command your GitHub Action will use: npm run test:run uns all your tests exactly once and then exits back to the command prompt.
Visual Mode showing test results: npm run test:ui It opens a local website (usually at localhost:51204) shows you a folder tree of all your tests. You can click on individual tests to see their code, execution time, and exactly where they failed. It even has a "Module Graph" that shows how your files connect.
run specific test files: npm run test:run src/tests/App.test.tsx
*/