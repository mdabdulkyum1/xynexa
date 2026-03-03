Migration to NextAuth.js Complete
I have successfully migrated the authentication system from Clerk to NextAuth.js (v5). This involved replacing all Clerk components and hooks, configuring NextAuth with the NestJS backend, and cleaning up legacy code.

Changes Made
1. Configuration & Setup
Installed next-auth@beta: Replaced @clerk/nextjs.
Created 
src/auth.js
: Configured Credentials provider to authenticate against the NestJS backend (/auth/login).
Created 
src/app/api/auth/[...nextauth]/route.js
: API route handler for auth requests.
Updated 
src/middleware.js
: Protected routes using NextAuth's 
auth
 middleware.
Updated 
.env
: Added AUTH_SECRET and NEXT_PUBLIC_BACKEND_URL.
2. Component Refactoring
SessionProviderWrapper
: Created to wrap the app with 
SessionProvider
 in 
src/app/layout.js
.
useUserDataFromClerk
: Refactored to use useSession from next-auth/react while maintaining the interface for minimal disruption.
UserMenu
: Created a new dropdown component using Radix UI to replace Clerk's UserButton.
XynexaNavbar
: Integrated 
UserMenu
 and useSession for authentication state.
Sign In / Sign Up Pages: Recreated using React Hook Form and Zod, integrated with NextAuth signIn.
Refactored Components: Updated 
ChatSidebar
, Dashboard, 
Tasks
, 
TeamCreateModal
, 
UpdateButton
, 
Attachment
, 
Comment
, 
SocketAuthManager
, and more to use useSession and remove Clerk dependencies.
useAxiosSecure
: Refactored to use signOut and next/navigation instead of react-router-dom.
3. Cleanup
Deleted Legacy Auth Pages: Removed src/app/sign-in and src/app/sign-up (Clerk versions).
Removed Clerk Libraries: Uninstalled @clerk/nextjs and @clerk/shared.
Removed Helper Files: Deleted 
saveUserToDB.js
 and 
loginUserToDB.js
 as this logic is handled by the backend.
Verification Checklist
1. Environment Setup
Ensure your 
.env
 file has the following:

env
AUTH_SECRET="your-generated-secret" # Run `npx auth secret` to generate
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000/api/v1" # Or your backend URL
2. Manual Testing Steps
Registration
Navigate to /sign-up.
Fill in the registration form.
Submit.
Verify you are redirected to the dashboard or logged in automatically.
Check if the user is created in the database.
Login
Navigate to /sign-in.
Enter valid credentials.
Submit.
Verify redirection to the dashboard.
Check if the user avatar and name appear in the Navbar.
Middleware Protection
Try to access /dashboard while logged out.
Verify you are redirected to /sign-in.
Log in, then try to access /sign-in.
Verify you are redirected to / or /dashboard.
Logout
Click the user avatar in the navbar.
Select "Logout".
Verify you are redirected to the home page or login page.
Feature Testing
Chat: Verify socket connection works (uses session email).
Tasks: Verify you can create tasks, add attachments, and comments (uses session user ID).
Teams: Verify you can create and update teams.
Next Steps
Run the NestJS backend (npm run start:dev in xynexa-nest).
Run the Next.js frontend (npm run dev in xynexa).
Perform the manual testing steps above.