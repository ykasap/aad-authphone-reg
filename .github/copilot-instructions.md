# Copilot Instructions for AAD-AuthPhone-Reg

## Project Overview

This is a web application for registering user phone numbers for Multi-Factor Authentication in Azure Active Directory externally. It consists of:

- **Frontend**: React + TypeScript application (in `app/` directory)
- **Backend API**: Ruby + Sinatra REST API (in `api/` directory)
- **Gem**: Access token proxy gem (in `access_token_proxy/` directory)

The app allows users to add phone numbers for MFA without MFA, using Microsoft Graph API.

## Project Structure

```
.
├── app/                    # React TypeScript frontend
│   ├── src/               # TypeScript source files
│   ├── public/            # Static files and locales
│   ├── package.json       # Node.js dependencies
│   └── tsconfig.json      # TypeScript configuration
├── api/                   # Ruby Sinatra backend
│   ├── app.rb            # Main Sinatra application
│   ├── auth_phone_methods.rb  # Graph API integration
│   ├── Gemfile           # Ruby dependencies
│   └── .rubocop.yml      # RuboCop configuration
└── access_token_proxy/    # Access token management gem
    ├── lib/              # Gem source code
    └── spec/             # RSpec tests
```

## Technologies & Dependencies

### Frontend (app/)
- React 17.x with TypeScript
- Material-UI (MUI) v5
- i18next for internationalization
- react-hook-form for form handling
- Created with Create React App

### Backend (api/)
- Ruby >= 2.7
- Sinatra web framework
- msgraph-client for Microsoft Graph API
- Optional: PostgreSQL or MySQL for token caching

## Build and Test Commands

### Frontend
```bash
cd app/
yarn install         # Install dependencies
yarn start           # Start development server
yarn build           # Build for production
yarn test            # Run tests
```

### Backend
```bash
cd api/
bundle install       # Install Ruby gems
bundle exec rackup   # Start server (requires environment variables)
bundle exec rake     # Run tasks
```

### Access Token Proxy Gem
```bash
cd access_token_proxy/
bundle install       # Install dependencies
bundle exec rspec    # Run tests
```

## Code Style and Conventions

### Ruby Code
- Follow RuboCop rules defined in `.rubocop.yml`
- Target Ruby version: 2.6+
- Line length: Max 80 characters
- Method length: Max 40 lines
- Always use `frozen_string_literal: true` at the top of files
- Use snake_case for variables and methods
- Use 2 spaces for indentation

### TypeScript/React Code
- Follow ESLint configuration from react-scripts
- Use TypeScript strict mode
- Target ES6 (ES2015)
- Use functional components with hooks
- Use camelCase for variables and functions
- Use PascalCase for React components
- Use 2 spaces for indentation

### General Guidelines
- Write descriptive commit messages
- Keep methods and functions focused and small
- Add comments only when necessary to explain complex logic
- Follow existing patterns in the codebase

## Environment Variables

### Backend (api/)
Required environment variables:
- `MSGRAPH_TENANT`: Azure AD tenant ID
- `MSGRAPH_CLIENT_ID`: Application client ID
- `MSGRAPH_CLIENT_ASSERTION`: JWT assertion string (for certificate auth)
- `MSGRAPH_CLIENT_SECRET`: Client secret (alternative to assertion)

Optional:
- `ACCESS_TOKEN_DB_URL`: Database URL for token caching (postgres:// or mysql2://)

### Frontend (app/)
Optional environment variables (set in `.env.local`):
- `REACT_APP_API_BASE_URL`: Base URL of REST API endpoints
- `REACT_APP_DEFAULT_LANG`: Default language
- `REACT_APP_UPN_PATTERN`: Regex for validating UPN input
- `REACT_APP_NUMBER_PATTERN`: Regex for validating phone number input

## Important Requirements

### Security
- **CRITICAL**: This app MUST be protected with user authentication by means other than Azure AD
- Never commit secrets or credentials to source code
- The API requires REMOTE_USER environment variable for authorization
- UPN verification compares against REMOTE_USER by default

### API Integration
- Uses Microsoft Graph API with `UserAuthenticationMethod.ReadWrite.All` permission
- Requires either certificate assertion or client secret for authentication
- Token caching is optional but recommended for performance

### Configuration
- Backend can be customized via `app_config.rb` file
- Frontend messages and translations are in `public/locales/` JSON files
- Support for multiple languages via i18next

## Testing

### Frontend Tests
- Located in `app/src/` with `.test.tsx` extension
- Use React Testing Library
- Run with `yarn test`

### Backend Tests
- RSpec tests for access_token_proxy gem in `access_token_proxy/spec/`
- Run with `bundle exec rspec`

## Deployment Notes

1. Frontend: Build with `yarn build` and deploy `app/build/` directory
2. Backend: Deploy `api/` directory and configure web server to route `/api` to port 9292
3. Configure external authentication (e.g., nginx basic auth)
4. Set required environment variables
5. Start backend with `bundle exec rackup`

## Common Tasks

### Adding a New Feature
1. For frontend: Add components in `app/src/`, update tests
2. For backend: Add routes in `app.rb`, update `auth_phone_methods.rb` for Graph API calls
3. Update documentation if needed
4. Test thoroughly before committing

### Updating Dependencies
- Frontend: Use `yarn add` or `yarn upgrade`
- Backend: Update `Gemfile` and run `bundle update`
- Check for security vulnerabilities before updating

### Internationalization
- Add new language in `public/locales/langs.json`
- Create corresponding `<lang-code>.json` file in `public/locales/`
- Define translated strings following existing structure

## When Making Changes

1. **Understand the context**: This app bridges user authentication and Azure AD MFA registration
2. **Maintain security**: Always consider authentication and authorization implications
3. **Test integrations**: Changes may affect Graph API calls or authentication flow
4. **Update documentation**: Keep README files in sync with code changes
5. **Follow existing patterns**: Maintain consistency with current codebase structure
6. **Run linters**: Use RuboCop for Ruby and ESLint for TypeScript
7. **Test both components**: Changes to API may require frontend updates and vice versa
