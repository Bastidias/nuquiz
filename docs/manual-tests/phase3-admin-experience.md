# Manual Test Plan: Phase 3 - Admin Experience

**Feature**: Content Pack Management (Admin Features)
**Date Created**: 2025-10-24
**Status**: Ready for Testing
**Prerequisites**: Dev server running, database seeded, admin user logged in

---

## Test Environment Setup

### 1. Start Development Environment

```bash
# Ensure database is running
docker-compose up -d

# Seed database with test users and sample content
npm run db:seed

# Start development server
npm run dev
```

### 2. Test Users

| Email | Password | Role | Purpose |
|-------|----------|------|---------|
| admin@test.com | password123 | admin | Primary admin tester |
| teacher@school.edu | password123 | admin | Secondary admin (for ownership tests) |
| student@test.com | password123 | student | Verify student can't access admin features |

### 3. Prerequisites

- At least 2 admin users in database
- At least 1 student user in database
- Clean state or known sample content packs

---

## Test Cases

### TC-01: Admin Dashboard Access

**Objective**: Verify admins can access admin dashboard

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as `admin@test.com` | Successfully logged in | | |
| 2 | Navigate to `/admin/dashboard` | Admin dashboard loads | | |
| 3 | Verify page title | Shows "Admin Dashboard" | | |
| 4 | Check navigation | Has "Admin Dashboard" link | | |
| 5 | Verify role indicator | Shows "Admin" badge | | |
| 6 | Check for admin actions | Shows "Create Content Pack" button | | |

---

### TC-02: Student Cannot Access Admin Dashboard

**Objective**: Verify students are blocked from admin routes

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as `student@test.com` | Logged in as student | | |
| 2 | Navigate to `/admin/dashboard` | Access denied | | |
| 3 | Check redirect | Redirected to `/dashboard` or error page | | |
| 4 | Verify error message | Shows "Insufficient permissions" | | |
| 5 | Try `/admin/content-packs` | Also denied | | |
| 6 | Try `/admin/content-packs/create` | Also denied | | |

---

### TC-03: Create Content Pack - Valid Data

**Objective**: Verify admins can create new content packs

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as admin | Logged in | | |
| 2 | Navigate to `/admin/content-packs/create` | Create form loads | | |
| 3 | Enter name: `Medical Terminology 101` | Accepted | | |
| 4 | Enter description: `Basic medical terms` | Accepted | | |
| 5 | Verify "Create" button enabled | Can submit | | |
| 6 | Click "Create" button | Shows loading state | | |
| 7 | Wait for response | Success message shown | | |
| 8 | Check redirect | Redirected to `/admin/content-packs` | | |
| 9 | Verify new pack visible | Pack appears in list | | |

**Database Verification**:
```sql
SELECT id, name, description, created_by, is_active
FROM content_packs
WHERE name = 'Medical Terminology 101';

-- Should show: created_by = admin user ID, is_active = true
```

---

### TC-04: Create Content Pack - Validation

**Objective**: Verify input validation on content pack creation

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to create form | Form loads | | |
| 2 | Leave name empty | Field shows error | | |
| 3 | Enter name: `AB` (too short) | Validation error shown | | |
| 4 | Verify submit disabled | Cannot submit | | |
| 5 | Enter valid name: `Valid Pack Name` | Validation passes | | |
| 6 | Leave description empty | Should be allowed (optional) | | |
| 7 | Verify submit enabled | Can submit | | |

**Validation Rules**:
- Name: Required, 3-100 characters
- Description: Optional, max 500 characters

---

### TC-05: View My Content Packs

**Objective**: Verify admins can see their created packs

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as `admin@test.com` | Logged in | | |
| 2 | Navigate to `/admin/content-packs` | Page loads | | |
| 3 | Verify page title | Shows "My Content Packs" | | |
| 4 | Check pack list | Shows packs created by this admin | | |
| 5 | Verify pack cards | Each shows name, description | | |
| 6 | Check status indicators | Shows "Active" or "Inactive" | | |
| 7 | Verify "Create New Pack" button | Present | | |

**API Verification**:
```bash
curl -X GET http://localhost:3000/api/content-packs/mine \
  -H "Cookie: next-auth.session-token=..." | jq

# Should return array of packs created by logged-in admin
```

---

### TC-06: View Empty Pack List

**Objective**: Verify empty state for new admins

**Prerequisites**: Login as admin who hasn't created any packs

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to `/admin/content-packs` | Page loads | | |
| 2 | Check for empty state | Shows "No content packs yet" message | | |
| 3 | Verify CTA | Shows "Create Your First Pack" button | | |
| 4 | Click the button | Navigates to create form | | |

---

### TC-07: View Content Pack Details (Admin)

**Objective**: Verify admins can view details of their packs

**Prerequisites**: Admin has created at least one pack

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | From `/admin/content-packs` | Click a pack card | | |
| 2 | Verify navigation | Goes to `/content-packs/[id]` | | |
| 3 | Check pack name | Displays correctly | | |
| 4 | Check description | Displays correctly | | |
| 5 | Verify creator shown | Shows admin's email/name | | |
| 6 | Check active status | Shows status badge | | |

---

### TC-08: Admin Cannot See Other Admins' Packs in "Mine"

**Objective**: Verify ownership filtering

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as `admin@test.com` | Logged in | | |
| 2 | Create a pack: `Admin1 Pack` | Successfully created | | |
| 3 | Logout | Logged out | | |
| 4 | Login as `teacher@school.edu` | Logged in as different admin | | |
| 5 | Navigate to `/admin/content-packs` | Page loads | | |
| 6 | Check pack list | Does NOT show `Admin1 Pack` | | |
| 7 | Create own pack: `Teacher Pack` | Successfully created | | |
| 8 | Verify only own packs | Only sees `Teacher Pack` | | |

**Database Verification**:
```sql
-- Check ownership
SELECT name, created_by, u.email as creator_email
FROM content_packs cp
JOIN users u ON cp.created_by = u.id
WHERE cp.name IN ('Admin1 Pack', 'Teacher Pack');

-- Should show different created_by values
```

---

### TC-09: Browse All Packs (Admin View)

**Objective**: Verify admins can browse all active packs (student view)

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as admin | Logged in | | |
| 2 | Navigate to `/content-packs` | Browse page loads | | |
| 3 | Verify shows ALL active packs | Includes packs by other admins | | |
| 4 | Check pack count | More than just own packs | | |
| 5 | Verify inactive packs hidden | Only active packs shown | | |

---

### TC-10: Admin Can Subscribe to Other Packs

**Objective**: Verify admins can subscribe like students

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as `admin@test.com` | Logged in | | |
| 2 | Navigate to `/content-packs` | Browse page loads | | |
| 3 | Find pack created by another admin | Pack visible | | |
| 4 | Click the pack | Details page loads | | |
| 5 | Verify "Subscribe" button | Present | | |
| 6 | Click "Subscribe" | Successfully subscribed | | |
| 7 | Verify UI update | Shows "Subscribed" badge | | |

---

### TC-11: Delete Content Pack

**Objective**: Verify admins can delete their own packs

**Prerequisites**: Admin has created a test pack

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as admin | Logged in | | |
| 2 | Create test pack: `Pack To Delete` | Created successfully | | |
| 3 | Navigate to pack details | Details page loads | | |
| 4 | Find "Delete" button | Present | | |
| 5 | Click "Delete" | Confirmation dialog appears | | |
| 6 | Confirm deletion | Request sent | | |
| 7 | Verify success message | "Pack deleted" shown | | |
| 8 | Check redirect | Returns to `/admin/content-packs` | | |
| 9 | Verify pack removed | Not in list anymore | | |

**Database Verification**:
```sql
SELECT * FROM content_packs WHERE name = 'Pack To Delete';
-- Should return 0 rows

SELECT * FROM user_pack_subscriptions WHERE content_pack_id = [deleted_id];
-- Should return 0 rows (CASCADE delete)
```

---

### TC-12: Cannot Delete Other Admin's Pack

**Objective**: Verify ownership check on deletion

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as `admin@test.com` | Logged in | | |
| 2 | Create pack: `Admin1 Protected` | Created | | |
| 3 | Note the pack ID | e.g., ID = 5 | | |
| 4 | Logout and login as `teacher@school.edu` | Different admin | | |
| 5 | Try to DELETE via API | Use pack ID from step 3 | | |
| 6 | Check response | Returns 403 Forbidden | | |
| 7 | Verify error message | "Not authorized" or similar | | |

**API Test**:
```bash
# As teacher@school.edu trying to delete admin@test.com's pack
curl -X DELETE http://localhost:3000/api/content-packs/5 \
  -H "Cookie: next-auth.session-token=..."

# Should return: 403 Forbidden
```

---

### TC-13: Edit Content Pack - Own Pack

**Objective**: Verify admins can edit their own packs

**Prerequisites**: Admin has created a pack

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as admin | Logged in | | |
| 2 | Navigate to pack details | Details page loads | | |
| 3 | Find "Edit" button | Present | | |
| 4 | Click "Edit" | Navigates to edit form | | |
| 5 | Verify form pre-populated | Current values shown | | |
| 6 | Change name: `Updated Pack Name` | Accepted | | |
| 7 | Change description | Accepted | | |
| 8 | Click "Save" | Request sent | | |
| 9 | Verify success message | "Pack updated" shown | | |
| 10 | Check details page | Shows updated values | | |

**Note**: This test assumes edit functionality exists. If not implemented, mark as "Not Applicable"

---

### TC-14: Toggle Pack Active Status

**Objective**: Verify admins can activate/deactivate packs

**Prerequisites**: Admin has created a pack

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as admin | Logged in | | |
| 2 | Create pack: `Status Test Pack` | Created (active by default) | | |
| 3 | Verify pack visible in browse | Shows in `/content-packs` | | |
| 4 | Edit or toggle to inactive | Status changed to inactive | | |
| 5 | Logout and login as student | Student session | | |
| 6 | Navigate to `/content-packs` | Browse page loads | | |
| 7 | Verify pack NOT visible | Inactive pack hidden | | |
| 8 | Try direct URL `/content-packs/[id]` | Page loads but shows "inactive" | | |
| 9 | Verify cannot subscribe | Subscribe button disabled | | |

**Database Verification**:
```sql
SELECT name, is_active
FROM content_packs
WHERE name = 'Status Test Pack';

-- is_active should be false
```

---

### TC-15: View Pack Subscriber Count

**Objective**: Verify admins can see how many users subscribed

**Prerequisites**: At least 1 student subscribed to admin's pack

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as student | Student session | | |
| 2 | Subscribe to admin's pack | Successfully subscribed | | |
| 3 | Logout and login as admin | Admin session | | |
| 4 | Navigate to pack details | Details page loads | | |
| 5 | Check subscriber count | Shows "1 subscriber" | | |
| 6 | Add more subscribers | Multiple students subscribe | | |
| 7 | Refresh pack details | Count increases | | |

**Database Query**:
```sql
SELECT
  cp.name,
  COUNT(ups.id) as subscriber_count
FROM content_packs cp
LEFT JOIN user_pack_subscriptions ups ON cp.id = ups.content_pack_id
WHERE cp.id = [pack_id]
GROUP BY cp.id, cp.name;
```

---

### TC-16: Create Pack with Long Description

**Objective**: Verify description field validation

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to create form | Form loads | | |
| 2 | Enter valid name | Accepted | | |
| 3 | Enter description > 500 chars | Validation error shown | | |
| 4 | Check character counter | Shows "X/500 characters" | | |
| 5 | Reduce to 500 chars | Validation passes | | |
| 6 | Submit form | Successfully created | | |

---

### TC-17: Multiple Admins Create Same Name

**Objective**: Verify pack names can be duplicated (no unique constraint)

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as `admin@test.com` | Logged in | | |
| 2 | Create pack: `Common Name` | Successfully created | | |
| 3 | Logout and login as `teacher@school.edu` | Different admin | | |
| 4 | Create pack: `Common Name` (same name) | Should succeed | | |
| 5 | Navigate to browse `/content-packs` | Page loads | | |
| 6 | Verify both packs visible | Two packs with same name | | |
| 7 | Check creator info | Shows different creators | | |

**Note**: Pack names are NOT globally unique, only creator + name matters

---

### TC-18: Admin Navigation Elements

**Objective**: Verify admin-specific navigation

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as admin | Logged in | | |
| 2 | Check main navigation | Contains admin links | | |
| 3 | Verify "Admin Dashboard" link | Present | | |
| 4 | Verify "My Content Packs" link | Present (or under dropdown) | | |
| 5 | Verify "Create Pack" link | Present (or in dashboard) | | |
| 6 | Check role badge | Shows "Admin" | | |
| 7 | Verify student links also present | Can access "Dashboard", "Browse" | | |

---

### TC-19: Performance - Load My Packs

**Objective**: Verify acceptable load time for pack list

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as admin with 10+ packs | Logged in | | |
| 2 | Navigate to `/admin/content-packs` | Page loads | | |
| 3 | Measure load time | Opens DevTools Network tab | | |
| 4 | Verify API response time | < 500ms | | |
| 5 | Verify page render time | < 1 second total | | |

**Target**: Page loads in < 1 second with 10 packs

---

### TC-20: Error Handling - API Failure

**Objective**: Verify graceful handling of API errors

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Open DevTools Network tab | Ready to block | | |
| 2 | Navigate to create form | Form loads | | |
| 3 | Fill in valid data | Ready to submit | | |
| 4 | Block API request (offline mode) | Simulated failure | | |
| 5 | Submit form | Request fails | | |
| 6 | Check error message | Shows "Network error" or similar | | |
| 7 | Re-enable network | Online again | | |
| 8 | Retry submission | Should succeed | | |

---

## Integration Tests

### TC-21: End-to-End Admin Workflow

**Objective**: Complete admin workflow from creation to deletion

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as admin | Logged in | | |
| 2 | Navigate to create form | Form loads | | |
| 3 | Create pack: `E2E Test Pack` | Created successfully | | |
| 4 | Navigate to browse packs | Pack visible | | |
| 5 | Login as student | Student session | | |
| 6 | Subscribe to `E2E Test Pack` | Subscribed | | |
| 7 | Logout and login as admin | Admin session | | |
| 8 | Check subscriber count | Shows 1 subscriber | | |
| 9 | Edit pack description | Updated | | |
| 10 | Delete pack | Successfully deleted | | |
| 11 | Verify cascade deletion | Subscription also deleted | | |

**Database Verification**:
```sql
-- After deletion, verify cleanup
SELECT * FROM content_packs WHERE name = 'E2E Test Pack';
-- Should return 0 rows

SELECT * FROM user_pack_subscriptions ups
JOIN content_packs cp ON ups.content_pack_id = cp.id
WHERE cp.name = 'E2E Test Pack';
-- Should return 0 rows
```

---

## Cross-Browser Testing

Test admin features in multiple browsers:

| Browser | TC-03 | TC-05 | TC-11 | TC-13 | TC-21 | Notes |
|---------|-------|-------|-------|-------|-------|-------|
| Chrome | | | | | | |
| Firefox | | | | | | |
| Safari | | | | | | macOS only |
| Edge | | | | | | |

---

## Accessibility Tests

### TC-22: Keyboard Navigation - Create Form

**Objective**: Verify forms are keyboard accessible

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to create form | Form loads | | |
| 2 | Use Tab to navigate fields | Focus moves correctly | | |
| 3 | Verify focus indicators | Visible focus states | | |
| 4 | Fill form using keyboard only | Can complete | | |
| 5 | Press Enter to submit | Form submits | | |

---

## Database Verification Queries

After completing all tests:

```sql
-- Check content pack creation
SELECT
  cp.id,
  cp.name,
  cp.description,
  cp.is_active,
  u.email as creator_email,
  cp.created_at
FROM content_packs cp
JOIN users u ON cp.created_by = u.id
ORDER BY cp.created_at DESC;

-- Verify ownership distribution
SELECT
  u.email,
  u.role,
  COUNT(cp.id) as pack_count
FROM users u
LEFT JOIN content_packs cp ON u.id = cp.created_by
WHERE u.role IN ('admin', 'superadmin')
GROUP BY u.id, u.email, u.role;

-- Check subscription counts per pack
SELECT
  cp.name,
  cp.is_active,
  u.email as creator,
  COUNT(ups.id) as subscriber_count
FROM content_packs cp
JOIN users u ON cp.created_by = u.id
LEFT JOIN user_pack_subscriptions ups ON cp.id = ups.content_pack_id
GROUP BY cp.id, cp.name, cp.is_active, u.email
ORDER BY subscriber_count DESC;

-- Verify CASCADE delete worked
SELECT
  ups.id,
  ups.content_pack_id,
  cp.name
FROM user_pack_subscriptions ups
LEFT JOIN content_packs cp ON ups.content_pack_id = cp.id
WHERE cp.id IS NULL;
-- Should return 0 rows (no orphaned subscriptions)
```

---

## Security Tests

### TC-23: SQL Injection Prevention

**Objective**: Verify inputs are parameterized

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Navigate to create form | Form loads | | |
| 2 | Enter name: `Test'; DROP TABLE content_packs; --` | Input accepted | | |
| 3 | Submit form | Request sent | | |
| 4 | Check response | No SQL error | | |
| 5 | Verify database | content_packs table exists | | |
| 6 | Check created pack | Name stored as literal string | | |

---

### TC-24: Authorization Bypass Attempt

**Objective**: Verify API endpoints check permissions

| Step | Action | Expected Result | Pass/Fail | Notes |
|------|--------|----------------|-----------|-------|
| 1 | Login as student | Student session | | |
| 2 | Get session token | From browser cookies | | |
| 3 | Try POST to `/api/content-packs/create` | Use student token | | |
| 4 | Check response | Returns 403 Forbidden | | |
| 5 | Verify no pack created | Database unchanged | | |

```bash
# Manual API test
curl -X POST http://localhost:3000/api/content-packs/create \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=<student_token>" \
  -d '{"name":"Hack Attempt","description":"Should fail"}'

# Expected: 403 Forbidden
```

---

## Test Summary

**Total Test Cases**: 24
**Critical**: 8 (TC-01, TC-02, TC-03, TC-05, TC-11, TC-12, TC-23, TC-24)
**High**: 10 (TC-04, TC-06, TC-08, TC-09, TC-13, TC-14, TC-15, TC-17, TC-20, TC-21)
**Medium**: 6 (TC-07, TC-10, TC-16, TC-18, TC-19, TC-22)

### Pass Criteria

- All critical tests must pass
- At least 90% of high priority tests must pass
- No P0 or P1 security bugs
- Ownership checks working correctly
- CASCADE deletes functioning properly
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
**Next Review**: After Phase 4 (Quiz Engine) completion
