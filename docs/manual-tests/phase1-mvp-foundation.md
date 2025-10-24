# Manual Test Plan: Phase 1 - MVP Foundation

**Feature**: Authentication, RBAC, and Core Infrastructure
**Date Created**: 2025-10-24
**Status**: Ready for Testing
**Prerequisites**: Dev server running, database populated with test data

---

## Test Environment Setup

### 1. Start Development Environment

```bash
# Ensure database is running
docker-compose up -d

# Seed database with test users
npm run db:seed

# Start development server
npm run dev
```

### 2. Test Users Available

After running `npm run db:seed`, these users are available:

| Email | Password | Role | Purpose |
|-------|----------|------|---------|
| admin@test.com | password123 | admin | Test admin features |
| student@test.com | password123 | student | Test student features |
| teacher@school.edu | password123 | admin | Secondary admin |

### 3. Environment Variables

Verify `.env` file contains:
- `NEXTAUTH_URL=http://localhost:3000`
- `NEXTAUTH_SECRET` (generated)
- `DATABASE_URL` (dev database)
- `TEST_DATABASE_URL` (test database)

---

## Test Cases

### TC-01: User Registration - Valid Input

**Objective**: Verify users can register with valid credentials

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/register` | Registration form displays | | |
| 2 | Enter email: `newuser@test.com` | Email field accepts input | | |
| 3 | Enter password: `weakpass` | Password strength warning shown | | |
| 4 | Change password to: `SecurePassword123!` | Strength indicator shows "Strong" | | |
| 5 | Click "Register" button | Shows loading state | | |
| 6 | Wait for response | Redirects to `/dashboard` | | |
| 7 | Verify logged in | Dashboard shows user email | | |
| 8 | Check URL | Should be at `/dashboard` | | |

**Database Verification**:
```sql
SELECT email, role, created_at, last_login_at
FROM users
WHERE email = 'newuser@test.com';

-- Should return: role = 'student', created_at = now, last_login_at = now
```

---

### TC-02: User Registration - Duplicate Email

**Objective**: Verify system prevents duplicate email registration

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/register` | Registration form displays | | |
| 2 | Enter email: `student@test.com` (existing) | Email field accepts input | | |
| 3 | Enter password: `SecurePassword123!` | Accepted | | |
| 4 | Click "Register" | Request sent | | |
| 5 | Check response | Error message displayed | | |
| 6 | Verify error text | Contains "already exists" or similar | | |
| 7 | User remains on page | Still at `/register` | | |

**Expected Error**: "Email already exists" or "User already registered"

---

### TC-03: User Registration - Password Validation

**Objective**: Verify password strength requirements

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/register` | Form displays | | |
| 2 | Enter password: `123` | Strength indicator shows "Weak" | | |
| 3 | Verify submit disabled | Button disabled or shows warning | | |
| 4 | Change password: `password` | Still shows weak (common password) | | |
| 5 | Change password: `MySecure123!` | Shows "Strong" | | |
| 6 | Verify submit enabled | Can now submit | | |

**Password Requirements**:
- Minimum 8 characters
- zxcvbn score >= 3 recommended

---

### TC-04: User Login - Valid Credentials

**Objective**: Verify users can login with correct credentials

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/login` | Login form displays | | |
| 2 | Enter email: `student@test.com` | Accepted | | |
| 3 | Enter password: `password123` | Accepted | | |
| 4 | Click "Login" | Shows loading state | | |
| 5 | Wait for response | Redirects to `/dashboard` | | |
| 6 | Verify session | User email shown in nav/header | | |
| 7 | Check role display | Shows "student" role indicator | | |

**Database Verification**:
```sql
SELECT last_login_at
FROM users
WHERE email = 'student@test.com';

-- Should show timestamp within last minute
```

---

### TC-05: User Login - Invalid Credentials

**Objective**: Verify login fails with incorrect password

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/login` | Login form displays | | |
| 2 | Enter email: `student@test.com` | Accepted | | |
| 3 | Enter password: `wrongpassword` | Accepted | | |
| 4 | Click "Login" | Request sent | | |
| 5 | Check response | Error message displayed | | |
| 6 | Verify error text | "Invalid credentials" or similar | | |
| 7 | User remains logged out | No session created | | |

**Auth Events Verification**:
```sql
SELECT event_type, user_id, ip_address, created_at
FROM auth_events
WHERE event_type = 'login_failed'
ORDER BY created_at DESC
LIMIT 5;

-- Should show failed login attempt
```

---

### TC-06: User Logout

**Objective**: Verify users can logout successfully

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as `student@test.com` | Successfully logged in | | |
| 2 | Navigate to `/dashboard` | Dashboard loads | | |
| 3 | Click "Logout" button | Confirmation or immediate logout | | |
| 4 | Wait for response | Redirects to `/` or `/login` | | |
| 5 | Verify session cleared | No user info in nav | | |
| 6 | Try to access `/dashboard` | Redirects to `/login` | | |
| 7 | Check localStorage/cookies | Session token removed | | |

**Auth Events Verification**:
```sql
SELECT event_type, user_id, created_at
FROM auth_events
WHERE event_type = 'logout'
ORDER BY created_at DESC
LIMIT 1;

-- Should show logout event
```

---

### TC-07: RBAC - Student Access Control

**Objective**: Verify students cannot access admin routes

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as `student@test.com` | Logged in as student | | |
| 2 | Navigate to `/admin/dashboard` | Access denied | | |
| 3 | Check redirect | Redirected to `/dashboard` or error page | | |
| 4 | Check error message | Shows "Insufficient permissions" | | |
| 5 | Try `/admin/content-packs/create` | Also denied | | |
| 6 | Verify student routes work | `/dashboard` accessible | | |
| 7 | Verify content packs work | `/content-packs` accessible | | |

**API Verification**:
```bash
# Try to access admin endpoint as student
curl -X GET http://localhost:3000/api/content-packs/mine \
  -H "Cookie: next-auth.session-token=..." \
  --cookie-jar cookies.txt

# Should return 403 Forbidden
```

---

### TC-08: RBAC - Admin Access

**Objective**: Verify admins can access admin features

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as `admin@test.com` | Logged in as admin | | |
| 2 | Navigate to `/admin/dashboard` | Admin dashboard loads | | |
| 3 | Verify admin menu | Shows "Create Content Pack" | | |
| 4 | Check nav elements | Shows "Admin Dashboard" link | | |
| 5 | Navigate to `/admin/content-packs/create` | Create form loads | | |
| 6 | Verify student routes accessible | Can access `/dashboard` too | | |
| 7 | Check role indicator | Shows "admin" badge | | |

---

### TC-09: RBAC - Superadmin Access

**Objective**: Verify superadmins have full system access

**Prerequisites**: Create superadmin user via SQL:
```sql
UPDATE users
SET role = 'superadmin'
WHERE email = 'admin@test.com';
```

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as superadmin | Logged in | | |
| 2 | Navigate to `/admin/users` | User management page loads | | |
| 3 | Verify all users listed | Shows student + admin users | | |
| 4 | Check available actions | Can change user roles | | |
| 5 | Navigate to `/admin/dashboard` | Also accessible | | |
| 6 | Verify role indicator | Shows "superadmin" | | |

---

### TC-10: Session Persistence

**Objective**: Verify sessions persist across page reloads

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as `student@test.com` | Logged in | | |
| 2 | Navigate to `/dashboard` | Dashboard loads | | |
| 3 | Refresh the page (F5) | Still logged in | | |
| 4 | Check session | User info still displayed | | |
| 5 | Close browser tab | - | | |
| 6 | Reopen `http://localhost:3000` | Check if still logged in | | |
| 7 | Verify session duration | Should persist 30 days | | |

**Technical Note**: Session persistence depends on NextAuth JWT configuration

---

### TC-11: Protected Route Middleware

**Objective**: Verify unauthenticated users are redirected

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Ensure logged out | Clear cookies/session | | |
| 2 | Navigate to `/dashboard` | Redirected to `/login` | | |
| 3 | Try `/content-packs` | Also redirected to `/login` | | |
| 4 | Try `/admin/dashboard` | Redirected to `/login` | | |
| 5 | Check URL after redirect | Contains `?callbackUrl=` param | | |
| 6 | Login successfully | Redirected back to original URL | | |

---

### TC-12: Public Routes Accessibility

**Objective**: Verify public pages are accessible without auth

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Ensure logged out | No session | | |
| 2 | Navigate to `/` | Landing page loads | | |
| 3 | Navigate to `/about` | About page loads | | |
| 4 | Navigate to `/register` | Registration form loads | | |
| 5 | Navigate to `/login` | Login form loads | | |
| 6 | Verify no redirects | Stayed on requested page | | |

---

### TC-13: Password Hashing

**Objective**: Verify passwords are hashed in database

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Register new user | Use password: `TestPass123!` | | |
| 2 | Query database | Check password_hash column | | |
| 3 | Verify hash format | Should be bcrypt hash | | |
| 4 | Verify hash starts with | `$2a$` or `$2b$` prefix | | |
| 5 | Verify hash length | Should be 60 characters | | |
| 6 | Verify NOT plain text | Hash != `TestPass123!` | | |

**Database Query**:
```sql
SELECT email, password_hash, LENGTH(password_hash) as hash_length
FROM users
WHERE email = 'newuser@test.com';

-- Hash should start with $2a$ or $2b$ and be 60 chars
```

---

### TC-14: Registration Auto-Login

**Objective**: Verify new users are automatically logged in

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/register` | Registration form displays | | |
| 2 | Fill in valid credentials | Email + strong password | | |
| 3 | Submit registration | Request sent | | |
| 4 | Check redirect | Goes to `/dashboard` (not `/login`) | | |
| 5 | Verify session exists | User email shown in nav | | |
| 6 | Check session token | JWT token in cookies | | |
| 7 | Navigate to protected route | No login prompt | | |

---

### TC-15: Email Validation

**Objective**: Verify email format is validated

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/register` | Form displays | | |
| 2 | Enter email: `notanemail` | Validation error shown | | |
| 3 | Verify submit disabled | Cannot submit | | |
| 4 | Enter email: `test@` | Still invalid | | |
| 5 | Enter email: `test@example.com` | Validation passes | | |
| 6 | Verify submit enabled | Can submit | | |

**Validation Requirements**:
- Must contain `@`
- Must have domain
- Standard email format via Zod

---

### TC-16: Role Assignment on Registration

**Objective**: Verify new users get 'student' role by default

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Register new user | Complete registration | | |
| 2 | Check database | Query user's role | | |
| 3 | Verify role = 'student' | Default role assigned | | |
| 4 | Login and check UI | Shows "student" indicator | | |
| 5 | Verify student access | Can access student routes | | |
| 6 | Verify no admin access | Cannot access admin routes | | |

**Database Query**:
```sql
SELECT email, role, created_at
FROM users
WHERE email = 'newuser@test.com';

-- role should be 'student'
```

---

### TC-17: Navigation - Logged In Student

**Objective**: Verify navigation shows correct links for students

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as student | Logged in | | |
| 2 | Check navigation bar | Contains these links: | | |
| 3 | Verify "Dashboard" link | Present | | |
| 4 | Verify "Content Packs" link | Present | | |
| 5 | Verify "Logout" button | Present | | |
| 6 | Verify NO "Admin Dashboard" | Not visible | | |
| 7 | Verify user email displayed | Shows logged-in user | | |
| 8 | Check role badge | Shows "Student" | | |

---

### TC-18: Navigation - Logged In Admin

**Objective**: Verify navigation shows correct links for admins

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as admin | Logged in | | |
| 2 | Check navigation bar | Contains admin links | | |
| 3 | Verify "Admin Dashboard" link | Present | | |
| 4 | Verify "Create Content Pack" link | Present (or in dashboard) | | |
| 5 | Verify student links also present | Has "Dashboard", "Content Packs" | | |
| 6 | Check role badge | Shows "Admin" | | |

---

### TC-19: Landing Page

**Objective**: Verify landing page displays correctly

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Ensure logged out | No session | | |
| 2 | Navigate to `/` | Landing page loads | | |
| 3 | Verify hero section | Shows value proposition | | |
| 4 | Check CTA buttons | Has "Sign Up" and "Login" | | |
| 5 | Click "Sign Up" | Navigates to `/register` | | |
| 6 | Go back, click "Login" | Navigates to `/login` | | |
| 7 | Check responsive design | Works on mobile size | | |
| 8 | Verify page loads < 2s | Performance check | | |

---

### TC-20: About Page

**Objective**: Verify about page content

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/about` | About page loads | | |
| 2 | Verify content explains Nuquiz | Description present | | |
| 3 | Check for feature explanation | Explains knowledge hierarchy | | |
| 4 | Check for example question | Shows sample question format | | |
| 5 | Verify CTA | Has "Sign Up" button/link | | |
| 6 | Check responsive design | Works on mobile | | |

---

## Error Handling Tests

### TC-21: Network Error Handling

**Objective**: Verify graceful handling of network errors

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Open DevTools Network tab | Ready to block requests | | |
| 2 | Navigate to `/register` | Form loads | | |
| 3 | Fill in registration form | Valid data entered | | |
| 4 | Set Network to "Offline" | DevTools offline mode | | |
| 5 | Submit form | Request fails | | |
| 6 | Check error message | Shows network error message | | |
| 7 | Re-enable network | Online again | | |
| 8 | Retry submission | Should succeed | | |

---

### TC-22: Invalid Session Handling

**Objective**: Verify handling of expired/invalid sessions

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login successfully | Session created | | |
| 2 | Manually delete session cookie | Use DevTools | | |
| 3 | Try to access `/dashboard` | Redirected to `/login` | | |
| 4 | Check error message | Shows "Please login" | | |
| 5 | Login again | New session created | | |

---

## Performance Tests

### TC-23: Page Load Performance

**Objective**: Verify acceptable page load times

| Page | Target Load Time | Actual | Pass/Fail | Notes |
|------|-----------------|--------|-----------|-------|
| `/` (Landing) | < 2s | | | |
| `/register` | < 1s | | | |
| `/login` | < 1s | | | |
| `/dashboard` | < 1.5s | | | |
| `/about` | < 2s | | | |

**Testing Tool**: Browser DevTools Network tab, Performance tab

---

## Cross-Browser Testing

Test critical flows in multiple browsers:

| Browser | TC-01 | TC-04 | TC-06 | TC-07 | TC-08 | Notes |
|---------|-------|-------|-------|-------|-------|-------|
| Chrome (Latest) | | | | | | |
| Firefox (Latest) | | | | | | |
| Safari (Latest) | | | | | | macOS only |
| Edge (Latest) | | | | | | |

---

## Accessibility Tests

### TC-24: Keyboard Navigation

**Objective**: Verify forms are keyboard accessible

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/register` | Form loads | | |
| 2 | Use Tab key | Focus moves through fields | | |
| 3 | Verify focus indicators | Visible focus state | | |
| 4 | Fill form using keyboard only | Can complete form | | |
| 5 | Press Enter to submit | Form submits | | |

---

## Database Verification Queries

After completing all tests, verify database state:

```sql
-- Check user creation
SELECT
  email,
  role,
  created_at,
  last_login_at,
  LENGTH(password_hash) as hash_length
FROM users
ORDER BY created_at DESC
LIMIT 10;

-- Check auth events logging
SELECT
  event_type,
  user_id,
  ip_address,
  user_agent,
  created_at
FROM auth_events
ORDER BY created_at DESC
LIMIT 20;

-- Verify role distribution
SELECT role, COUNT(*) as count
FROM users
GROUP BY role;

-- Check for duplicate emails (should be 0)
SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

---

## Security Verification

### TC-25: SQL Injection Prevention

**Objective**: Verify inputs are properly parameterized

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/login` | Login form loads | | |
| 2 | Enter email: `admin@test.com' OR '1'='1` | Input accepted | | |
| 3 | Enter any password | Input accepted | | |
| 4 | Submit form | Login fails | | |
| 5 | Verify error | "Invalid credentials" (not SQL error) | | |
| 6 | Check database | No user logged in | | |

---

### TC-26: XSS Prevention

**Objective**: Verify user inputs are sanitized

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/register` | Form loads | | |
| 2 | Enter email: `test@test.com<script>alert('xss')</script>` | Validation may fail | | |
| 3 | If accepted, submit form | No script execution | | |
| 4 | Check rendered output | Script tags escaped | | |
| 5 | Verify no alert box | No JavaScript executed | | |

---

## Test Summary

**Total Test Cases**: 26
**Critical**: 10 (TC-01, TC-02, TC-04, TC-05, TC-06, TC-07, TC-08, TC-13, TC-25, TC-26)
**High**: 10 (TC-03, TC-09, TC-10, TC-11, TC-14, TC-16, TC-17, TC-18, TC-22, TC-24)
**Medium**: 6 (TC-12, TC-15, TC-19, TC-20, TC-21, TC-23)

### Pass Criteria

- All critical tests must pass
- At least 90% of high priority tests must pass
- No P0 or P1 security bugs
- Performance targets met
- Works in Chrome, Firefox, and one other browser

### Test Sign-Off

| Role | Name | Date | Signature | Notes |
|------|------|------|-----------|-------|
| Developer | | | | |
| QA | | | | |
| Product Owner | | | | |

---

## Known Issues

_(Document any known issues or limitations here)_

| ID | Description | Severity | Workaround | Target Fix |
|----|-------------|----------|------------|------------|
| | | | | |

---

## Notes & Observations

_(Add any observations, edge cases discovered, or improvement suggestions here)_

---

**Last Updated**: 2025-10-24
**Next Review**: After Phase 2 (Student Experience) completion
