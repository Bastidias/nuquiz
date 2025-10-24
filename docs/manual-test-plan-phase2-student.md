# Manual Test Plan: Phase 2 - Student Experience

**Feature**: Content Pack Browsing & Subscriptions
**Date Created**: 2025-10-24
**Status**: Ready for Testing
**Prerequisites**: Dev server running, test database populated with sample content packs

---

## Test Environment Setup

### 1. Start Development Environment

```bash
# Ensure test database is running
docker-compose up -d

# Start development server
npm run dev
```

### 2. Create Test Data

You'll need at least one admin user to create content packs. Use the env admin:

- Email: (from .env `ADMIN_EMAIL`)
- Password: (from .env `ADMIN_PASSWORD`)

Or create test data via the database:

```sql
-- Create test admin
INSERT INTO users (email, password_hash, role)
VALUES ('admin@test.com', '$2a$12$...', 'admin');

-- Create test content packs
INSERT INTO content_packs (name, description, created_by, is_active)
VALUES
  ('Medical Terminology', 'Common medical terms and definitions', 1, true),
  ('Anatomy Basics', 'Fundamental anatomy concepts', 1, true),
  ('Cardiology', 'Heart and cardiovascular system', 1, true),
  ('Inactive Pack', 'This should not appear in browse', 1, false);
```

---

## Test Cases

### TC-01: User Registration Flow

**Objective**: Verify new users can register and auto-login

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/register` | Registration form displays | | |
| 2 | Enter email: `student@test.com` | Email field accepts input | | |
| 3 | Enter password: `weakpass` | Password strength warning shown | | |
| 4 | Enter password: `SecurePassword123!` | No warning / good strength | | |
| 5 | Click "Register" | Redirects to `/dashboard` | | |
| 6 | Verify user is logged in | Dashboard shows user email | | |

**Test Data**:
- Email: `student@test.com`
- Password: `SecurePassword123!`

---

### TC-02: Browse Content Packs (No Subscriptions)

**Objective**: Student can view all active content packs

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as student | Redirects to `/dashboard` | | |
| 2 | Click "Browse Content Packs" link | Navigates to `/content-packs` | | |
| 3 | Verify page loads | Shows grid of content packs | | |
| 4 | Count visible packs | Shows only active packs (3) | | |
| 5 | Verify inactive pack hidden | "Inactive Pack" not visible | | |
| 6 | Check pack cards | Each shows name & description | | |

**Expected**: 3 active packs visible, inactive pack hidden

---

### TC-03: View Content Pack Details

**Objective**: Student can view individual pack details

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | From `/content-packs` | Click "Medical Terminology" | | |
| 2 | Verify navigation | URL is `/content-packs/[id]` | | |
| 3 | Check pack name | Shows "Medical Terminology" | | |
| 4 | Check description | Shows full description text | | |
| 5 | Check metadata | Shows subscriber count | | |
| 6 | Check status badge | Shows "Subscribe" button | | |
| 7 | Verify subscription status | `user_has_access: false` | | |

**Expected**: Pack details visible with subscribe option

---

### TC-04: Subscribe to Content Pack

**Objective**: Student can subscribe to a content pack

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | On pack details page | Click "Subscribe" button | | |
| 2 | Verify button state | Changes to "Subscribing..." | | |
| 3 | Wait for API response | Success message appears | | |
| 4 | Check UI update | Button becomes "✓ Subscribed" badge | | |
| 5 | Verify badge is disabled | Cannot click badge | | |
| 6 | Refresh page | Badge still shows "✓ Subscribed" | | |
| 7 | Check subscriber count | Incremented by 1 | | |

**Expected**: Successful subscription with visual confirmation

**API Verification**:
```bash
# Check subscription was created
curl -X GET http://localhost:3000/api/users/me/subscriptions \
  -H "Cookie: next-auth.session-token=..." | jq
```

---

### TC-05: Duplicate Subscription Prevention

**Objective**: Cannot subscribe to same pack twice

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Already subscribed to pack | Shows "✓ Subscribed" badge | | |
| 2 | Open browser DevTools Network | Monitor API calls | | |
| 3 | Attempt to click badge | Badge is disabled (no click) | | |
| 4 | Via API: Try duplicate subscribe | Returns 409 status | | |

**API Test**:
```bash
# Should return 409 Conflict
curl -X POST http://localhost:3000/api/content-packs/1/subscribe \
  -H "Cookie: next-auth.session-token=..."
```

**Expected**: Error message "Already subscribed to this content pack"

---

### TC-06: View My Subscriptions

**Objective**: Student can see all their subscribed packs

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to API endpoint | `/api/users/me/subscriptions` | | |
| 2 | Verify response format | JSON with `data` array | | |
| 3 | Check pack count | Matches subscriptions made | | |
| 4 | Verify pack details | Shows name, description, etc. | | |
| 5 | Check for inactive packs | Only active packs returned | | |

**API Test**:
```bash
curl -X GET http://localhost:3000/api/users/me/subscriptions \
  -H "Cookie: next-auth.session-token=..." | jq
```

**Expected Response**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Medical Terminology",
      "description": "Common medical terms",
      "is_active": true,
      "created_at": "2025-10-24T...",
      "updated_at": "2025-10-24T..."
    }
  ],
  "count": 1
}
```

---

### TC-07: Subscribe to Multiple Packs

**Objective**: Student can subscribe to multiple different packs

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | From `/content-packs` | Click "Anatomy Basics" | | |
| 2 | Click "Subscribe" | Successfully subscribed | | |
| 3 | Click "← Back to Content Packs" | Returns to pack list | | |
| 4 | Click "Cardiology" | Opens pack details | | |
| 5 | Click "Subscribe" | Successfully subscribed | | |
| 6 | Check `/api/users/me/subscriptions` | Shows 3 packs total | | |

**Expected**: All 3 active packs now subscribed

---

### TC-08: Cannot Subscribe to Inactive Pack

**Objective**: System prevents subscription to inactive packs

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Get inactive pack ID from DB | e.g., ID = 4 | | |
| 2 | Try to access `/content-packs/4` | Page loads (pack exists) | | |
| 3 | Check subscribe button | Should be disabled | | |
| 4 | Via API: Try to subscribe | Returns 400 Bad Request | | |

**API Test**:
```bash
# Should return 400 - Content pack is not active
curl -X POST http://localhost:3000/api/content-packs/4/subscribe \
  -H "Cookie: next-auth.session-token=..."
```

**Expected**: Error message "Content pack is not active"

---

### TC-09: Authentication Required

**Objective**: Unauthenticated users cannot subscribe or view subscriptions

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Logout (clear cookies) | No session active | | |
| 2 | Navigate to `/content-packs` | Redirects to `/login` | | |
| 3 | Navigate to `/content-packs/1` | Redirects to `/login` | | |
| 4 | Via API: GET `/api/content-packs` | Returns 401 Unauthorized | | |
| 5 | Via API: POST subscribe | Returns 401 Unauthorized | | |
| 6 | Via API: GET subscriptions | Returns 401 Unauthorized | | |

**Expected**: All protected routes require authentication

---

### TC-10: Responsive Design Check

**Objective**: UI works on mobile and desktop

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Open DevTools (F12) | Set device to "iPhone SE" | | |
| 2 | Navigate to `/content-packs` | Pack grid shows 1 column | | |
| 3 | Check pack cards | Readable text, proper spacing | | |
| 4 | Click a pack | Details page readable | | |
| 5 | Check subscribe button | Full-width, tappable | | |
| 6 | Set device to "Desktop" | Pack grid shows multiple columns | | |
| 7 | Verify layout | Proper max-width, centered | | |

**Devices to Test**:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1200px+

---

### TC-11: Navigation Flow

**Objective**: User can navigate between pages smoothly

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | From `/dashboard` | Click "Browse Content Packs" | | |
| 2 | From pack list | Click a pack | | |
| 3 | From pack details | Click "← Back to Content Packs" | | |
| 4 | Verify navigation | Returns to pack list | | |
| 5 | Use browser back button | Works correctly | | |
| 6 | Check header navigation | "Dashboard" link works | | |

**Expected**: Smooth navigation, no broken links

---

### TC-12: Error Handling

**Objective**: System handles errors gracefully

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/content-packs/99999` | Shows "Content pack not found" | | |
| 2 | Stop dev server | Simulate network error | | |
| 3 | Try to subscribe | Shows error message | | |
| 4 | Restart server | Error clears on retry | | |
| 5 | Check for console errors | No unhandled errors | | |

**Expected**: User-friendly error messages, no crashes

---

## Performance Checks

### Load Time Verification

| Metric | Target | Actual | Pass/Fail | Notes |
|--------|--------|--------|-----------|-------|
| Pack list page load | < 1s | | | |
| Pack details page load | < 1s | | | |
| Subscribe API response | < 500ms | | | |
| Subscriptions API response | < 500ms | | | |

---

## Cross-Browser Testing

Test in at least two browsers:

| Browser | Version | TC-01 | TC-02 | TC-03 | TC-04 | TC-07 | Notes |
|---------|---------|-------|-------|-------|-------|-------|-------|
| Chrome | Latest | | | | | | |
| Firefox | Latest | | | | | | |
| Safari | Latest | | | | | | (Mac only) |
| Edge | Latest | | | | | | |

---

## Database Verification Queries

After completing tests, verify database state:

```sql
-- Check subscriptions were created
SELECT
  u.email,
  cp.name as pack_name,
  ups.subscribed_at,
  ups.expires_at
FROM user_pack_subscriptions ups
JOIN users u ON ups.user_id = u.id
JOIN content_packs cp ON ups.content_pack_id = cp.id
ORDER BY ups.subscribed_at DESC;

-- Verify no duplicate subscriptions
SELECT user_id, content_pack_id, COUNT(*)
FROM user_pack_subscriptions
GROUP BY user_id, content_pack_id
HAVING COUNT(*) > 1;  -- Should return 0 rows

-- Check subscriber counts
SELECT
  cp.name,
  COUNT(ups.id) as subscriber_count
FROM content_packs cp
LEFT JOIN user_pack_subscriptions ups ON cp.id = ups.content_pack_id
GROUP BY cp.id, cp.name;
```

---

## Test Summary

**Total Test Cases**: 12
**Critical**: 6 (TC-01, TC-02, TC-03, TC-04, TC-06, TC-09)
**High**: 4 (TC-05, TC-07, TC-08, TC-12)
**Medium**: 2 (TC-10, TC-11)

### Pass Criteria

- All critical tests must pass
- At least 90% of high priority tests must pass
- No P0 or P1 bugs found
- Performance targets met

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
**Next Review**: After Phase 3 (Admin Experience) completion
