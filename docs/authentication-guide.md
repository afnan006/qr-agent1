# SuperAdmin Authentication System Guide

## What Changed

We've implemented a comprehensive persistent authentication system for the SuperAdmin role with the following key components:

### 1. Token Storage & Management
- Consistent token storage under `superadmin_token` key
- Session type tracking (`persistent` vs `temporary`)
- Token expiry tracking for automatic refresh
- User data storage and retrieval

### 2. Authentication Flow
- Enhanced login with Remember Me functionality
- Automatic token validation on page loads
- Periodic token checks to ensure validity
- Proper error handling and session cleanup

### 3. Protected Routes
- Token validation before rendering protected content
- Loading states during authentication checks
- Proper redirection after successful login
- Last location memory for better UX

### 4. API Integration
- Authentication headers for all API calls
- Token validation endpoint integration
- Consistent error handling

## How It Works

The authentication system now follows this flow:

1. **Login Process**
   - User enters credentials and chooses Remember Me option
   - System validates credentials with the server
   - On success, stores token, user data, session type, and expiry time
   - Sets session length based on Remember Me choice (7 days vs 1 hour)

2. **Session Persistence**
   - Token and user data stored in localStorage
   - Session type tracked to determine behavior
   - Token expiry tracked to handle refreshes

3. **Protection Mechanism**
   - Every protected route checks token validity
   - Invalid or expired tokens trigger automatic logout
   - Periodic background validation ensures session integrity

4. **Automatic Cleanup**
   - Invalid sessions are automatically cleaned up
   - Expired tokens are removed
   - Users are redirected to login when needed

## Testing Guide

Follow these steps to thoroughly test the authentication system:

### Test 1: Regular Session (No Remember Me)

1. **Clear existing state**
   - Open browser dev tools (F12)
   - Go to Application tab → Storage → Local Storage
   - Clear all data for your domain

2. **Login without Remember Me**
   - Navigate to http://localhost:5173/superadmin/login
   - Enter valid credentials
   - Leave "Remember Me" unchecked
   - Click Login

3. **Verify storage**
   - Open dev tools → Application → Local Storage
   - You should see:
     - `superadmin_token` (your auth token)
     - `superadmin_user` (JSON with user details)
     - `superadmin_session_type` (should be "temporary")
     - `superadmin_token_expiry` (timestamp ~1 hour from now)

4. **Test navigation**
   - Navigate between pages (dashboard, organizations, etc.)
   - Each navigation should be smooth with no redirects to login

5. **Test browser close/reopen**
   - Close the browser completely
   - Reopen and go to http://localhost:5173/superadmin/dashboard
   - You should still be logged in

6. **Wait for expiry**
   - For testing, you can manually edit the expiry time in localStorage to a past timestamp
   - Refresh the page
   - You should be automatically logged out and redirected to login

### Test 2: Persistent Session (With Remember Me)

1. **Clear existing state again**
   - Repeat the process to clear localStorage

2. **Login with Remember Me**
   - Navigate to http://localhost:5173/superadmin/login
   - Enter valid credentials
   - Check "Remember Me"
   - Click Login

3. **Verify storage**
   - Check localStorage again
   - `superadmin_session_type` should be "persistent"
   - `superadmin_token_expiry` should be ~7 days from now

4. **Test long-term persistence**
   - Close browser
   - Reopen after some time
   - The session should still be active
   - You should be able to navigate directly to protected routes

## Troubleshooting

If you encounter any issues:

1. **Check localStorage values**
   - Ensure all keys are present and have valid values
   - Check that expiry timestamp is in the future

2. **Check console for errors**
   - Open browser dev tools → Console
   - Look for any authentication or API related errors

3. **Test token validation**
   - Try manually running `await superadminApi.validateToken()` in the console
   - This should return true if the token is valid

4. **Network requests**
   - Monitor network requests in dev tools
   - Ensure the Authorization header is being sent with requests
   - Check for 401 status codes which might indicate invalid tokens

