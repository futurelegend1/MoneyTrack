# Changelog

All notable changes to the MoneyTrack project will be documented in this file.

## Version 1.8.1

### Fixed

- Fixed issue where current saved amount could exceed the target total amount by adding validation checks

## Version 1.8.0

### Added

- Implemented password reset functionality using Firebase Authentication

## Version 1.7.1

### Fixed

- Fixed date input issue (off-by-one day bug)

## Version 1.7.0

### Added

- Implemented transaction form for users to input and store transaction data in Firestore with proper structure
- Implemented saving goal and debt forms for structured data storage
- Enabled real-time updates for:
  - Transactions
  - Saving goals
  - Debt categories
- Added "More" button for each transaction to display full details (especially long descriptions) without entering edit mode
- Added increment and decrement functionality for saving goals to easily adjust the current saved amount

## Version 1.6.0

### Added

- Completed the main user page UI and enabled successful navigation after user sign-in
- Implemented email verification for newly registered users for improved security

### Improved

- Sidebar can now be toggled (shown/hidden)
- Main panel dynamically expands or shrinks based on sidebar visibility
- Refined main user page UI:
  - Removed top user navigation bar
  - Enhanced and reorganized the user side panel

 ### Added

- Introduced initial empty states for Dashboard, Budget, and Reports categories
- Added guidance message:
"You haven't added any transactions yet. Start by adding your first goal to track your progress."
- Added navigation buttons to direct users to the Transactions page when no data exists
- Added Saving and Debt categories to the user side panel

## Version 1.5.0

### Added

- Completed the main user page UI and enabled successful navigation after user sign-in
- Implemented email verification for newly registered users for improved security

## Version 1.4.0

### Added

- Implemented full signup and login functionality using email and password
- Integrated Google login for authentication
- Ensured user information is properly stored in Firestore when signing up or signing in with Google
- Connected login/signup forms to Firebase authentication and database

## Version 1.3.0

### Added

- Integrated Firebase authentication for user signup, login, and logout
- Set up Firestore database for storing user and app data
- Configured project structure to support authentication and database operations
- Prepared groundwork for connecting login/signup forms to Firebase

## Version 1.2.0

### Added

- Completed the login page user interface
- Added functional buttons to switch between Login and Signup forms
- Styled the login/signup forms using Tailwind CSS for a consistent look

## Version 1.1.1

### Fixed / Improved

- Adjusted Tailwind CSS styling for better responsiveness
- Added md and lg breakpoints to ensure the homepage UI displays correctly on smaller screens

## Version 1.1.0

### Added

- Completed the user interface for the homepage
- Implemented layout and styling using Tailwind CSS
- Added navigation elements to switch between Home and Login
- Made the homepage button functional (clicking it performs the intended action)

## Version 1.0.0 - Initial Release

### Added

- Initial project setup using Vite and React
- Tailwind CSS integration for styling
- Basic project structure and configuration
- Deployment of the application using Netlify

