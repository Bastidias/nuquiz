# Manual Test Plans - Nuquiz

**Last Updated**: 2025-10-24

This directory contains comprehensive manual test plans for all phases of Nuquiz development. These test plans are designed for QA engineers, developers, and product owners to verify functionality before releases.

---

## Quick Start

### Running Manual Tests

1. **Setup Environment**:
   ```bash
   docker-compose up -d        # Start databases
   npm run db:seed             # Load test data
   npm run dev                 # Start dev server
   ```

2. **Choose Test Plan**: Select the appropriate phase based on what you're testing
3. **Execute Tests**: Follow step-by-step instructions in each test case
4. **Record Results**: Mark Pass/Fail for each test
5. **Report Issues**: Document any bugs or observations in the "Known Issues" section

---

## Test Plans by Phase

### Phase 1: MVP Foundation
**File**: [`phase1-mvp-foundation.md`](./phase1-mvp-foundation.md)

**Covers**:
- User registration and authentication
- Login/logout functionality
- Role-based access control (RBAC)
- Student, admin, and superadmin roles
- Session management
- Password security
- Protected routes
- Landing and about pages

**Test Cases**: 26 (10 critical, 10 high priority, 6 medium)
**Estimated Time**: 3-4 hours

**When to Run**: After any changes to authentication, user management, or RBAC

---

### Phase 2: Student Experience
**File**: [`phase2-student-experience.md`](./phase2-student-experience.md)

**Covers**:
- Content pack browsing
- Content pack subscriptions
- Viewing subscription details
- Student dashboard
- Duplicate subscription prevention
- Active/inactive pack filtering

**Test Cases**: 12 (6 critical, 4 high priority, 2 medium)
**Estimated Time**: 2-3 hours

**When to Run**: After changes to content pack display, subscription logic, or student UI

---

### Phase 3: Admin Experience
**File**: [`phase3-admin-experience.md`](./phase3-admin-experience.md)

**Covers**:
- Content pack creation
- Content pack editing and deletion
- Admin dashboard
- Ownership and authorization checks
- Subscriber management
- Pack active/inactive status
- Admin navigation

**Test Cases**: 24 (8 critical, 10 high priority, 6 medium)
**Estimated Time**: 3-4 hours

**When to Run**: After changes to admin features, content management, or ownership logic

---

### Phase 4 & 5: Quiz Engine & Sessions
**File**: [`phase4-5-quiz-engine-sessions.md`](./phase4-5-quiz-engine-sessions.md)

**Covers**:
- Quiz generation (downward/upward questions)
- Distractor selection
- Answer option composition
- Quiz session creation
- Quiz taking UI
- Answer submission
- Score calculation
- Results display
- Progress tracking
- Analytics logging

**Test Cases**: 32 (12 critical, 14 high priority, 6 medium)
**Estimated Time**: 4-6 hours

**When to Run**: After changes to quiz generation, quiz UI, scoring logic, or progress tracking

---

## Test Execution Guidelines

### Before Testing

1. **Environment Verification**:
   ```bash
   # Check Docker containers are running
   docker ps

   # Verify database connections
   psql -U nuquiz_user -h localhost -p 5432 -d nuquiz_dev -c "SELECT 1;"

   # Confirm dev server is running
   curl http://localhost:3000
   ```

2. **Test Data Setup**:
   ```bash
   # Load fresh test data
   npm run db:seed

   # Verify test users exist
   psql -U nuquiz_user -h localhost -p 5432 -d nuquiz_dev \
     -c "SELECT email, role FROM users;"
   ```

3. **Browser Setup**:
   - Use incognito/private mode for fresh sessions
   - Clear cookies between test runs
   - Open DevTools for network/console monitoring

### During Testing

- **Record Everything**: Mark Pass/Fail for each step
- **Take Screenshots**: Capture any errors or unexpected behavior
- **Note Performance**: Record load times if tests specify targets
- **Document Issues**: Write detailed bug descriptions with reproduction steps
- **Verify Database**: Run verification queries after key operations

### After Testing

1. **Complete Sign-Off**: Fill in the test sign-off table
2. **Report Blockers**: Immediately escalate P0/P1 issues
3. **Update Known Issues**: Document any new bugs discovered
4. **Provide Feedback**: Suggest improvements to test plans

---

## Test Users (After `npm run db:seed`)

| Email | Password | Role | Purpose |
|-------|----------|------|---------|
| admin@test.com | password123 | admin | Primary admin user for testing |
| teacher@school.edu | password123 | admin | Secondary admin (ownership tests) |
| student@test.com | password123 | student | Primary student user for testing |

**Note**: Additional users can be created during testing as needed.

---

## Common Database Queries

### Check User Accounts
```sql
SELECT id, email, role, created_at, last_login_at
FROM users
ORDER BY created_at DESC;
```

### Check Content Packs
```sql
SELECT id, name, is_active, created_by,
       (SELECT COUNT(*) FROM user_pack_subscriptions
        WHERE content_pack_id = cp.id) as subscriber_count
FROM content_packs cp
ORDER BY created_at DESC;
```

### Check Quiz Sessions
```sql
SELECT qs.id, u.email, cp.name as pack_name,
       qs.total_questions, qs.score, qs.completed_at
FROM quiz_sessions qs
JOIN users u ON qs.user_id = u.id
JOIN content_packs cp ON qs.content_pack_id = cp.id
ORDER BY qs.started_at DESC
LIMIT 20;
```

### Check User Progress
```sql
SELECT u.email, k.label as fact,
       ukp.times_tested, ukp.times_correct,
       ROUND(ukp.times_correct::numeric / ukp.times_tested * 100, 2) as mastery_pct
FROM user_knowledge_progress ukp
JOIN users u ON ukp.user_id = u.id
JOIN knowledge k ON ukp.knowledge_id = k.id
ORDER BY u.email, mastery_pct DESC;
```

---

## Test Prioritization

### Pre-Release Critical Tests

Run these before ANY release:

1. **Phase 1**: TC-01 (Registration), TC-04 (Login), TC-06 (Logout), TC-07 (RBAC)
2. **Phase 2**: TC-01 (Registration), TC-04 (Subscribe), TC-05 (Duplicate Prevention)
3. **Phase 3**: TC-03 (Create Pack), TC-11 (Delete Pack), TC-12 (Ownership)
4. **Phase 4-5**: TC-01 (Generate), TC-08 (Create Session), TC-14 (Submit), TC-15 (Score)

**Estimated Time**: 1-1.5 hours

### Full Regression Suite

Run before major releases or after significant refactoring:

- All test cases across all phases
- Cross-browser testing
- Performance verification
- Security testing

**Estimated Time**: 10-14 hours (can be parallelized across multiple testers)

---

## Automation Opportunities

While these are manual test plans, the following tests are good candidates for automation:

### High Value Automation
- **Phase 1**: Registration, login, RBAC checks (TC-01, TC-04, TC-07)
- **Phase 2**: Subscribe flow (TC-04, TC-05)
- **Phase 3**: CRUD operations (TC-03, TC-11, TC-12)
- **Phase 4-5**: Quiz generation, submission, scoring (TC-01, TC-08, TC-14, TC-15)

### Medium Value Automation
- Navigation flows
- Form validation
- Error message verification
- Database state verification

### Low Value Automation (Keep Manual)
- Visual/UI checks
- Accessibility testing
- Cross-browser compatibility
- Exploratory testing

---

## Reporting Issues

When filing bugs found during manual testing:

### Bug Report Template

```markdown
**Test Plan**: Phase X - [Name]
**Test Case**: TC-XX - [Test Case Name]
**Severity**: P0 / P1 / P2 / P3

**Description**: Clear description of the issue

**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Result**: What should happen

**Actual Result**: What actually happened

**Environment**:
- Browser: [Chrome 120.x]
- OS: [macOS 14.x]
- Commit: [git commit hash]

**Screenshots**: [Attach screenshots]

**Additional Context**: Any relevant logs or database state
```

### Severity Levels

- **P0 (Blocker)**: Complete feature failure, data loss, security breach
- **P1 (Critical)**: Major feature broken, no workaround, affects all users
- **P2 (High)**: Feature partially broken, workaround exists, affects many users
- **P3 (Medium)**: Minor issue, cosmetic, affects few users

---

## Test Plan Maintenance

### When to Update Test Plans

- **New Feature Added**: Create new test cases
- **Bug Fixed**: Add regression test
- **UI Changed**: Update UI verification steps
- **API Modified**: Update API test examples
- **Database Schema Changed**: Update verification queries

### How to Update

1. Make changes directly to the relevant `.md` file
2. Update the "Last Updated" date
3. Increment version if major changes
4. Update this README if new phases are added
5. Notify QA team of changes

---

## Test Metrics

Track these metrics across test runs:

| Metric | Target | How to Track |
|--------|--------|--------------|
| Test Execution Rate | 100% of critical tests | Count passed/total critical |
| Pass Rate | ≥ 90% overall | Count passed/total executed |
| Defect Detection Rate | High | Bugs found / tests run |
| Test Execution Time | Within estimates | Actual vs estimated time |
| Blocker Rate | < 5% | P0-P1 bugs / total tests |

---

## Cross-Browser Testing

Minimum browser coverage:

| Browser | Minimum Version | Priority |
|---------|----------------|----------|
| Chrome | Latest | High |
| Firefox | Latest | High |
| Safari | Latest (macOS only) | Medium |
| Edge | Latest | Medium |

**Mobile Testing**: Not in scope for manual tests (future consideration)

---

## Performance Benchmarks

Expected performance targets from test plans:

| Operation | Target | Phase |
|-----------|--------|-------|
| Page Load | < 1-2s | All |
| Login | < 1s | Phase 1 |
| Subscribe | < 500ms | Phase 2 |
| Create Pack | < 500ms | Phase 3 |
| Generate Quiz (10q) | < 2s | Phase 4-5 |
| Generate Quiz (50q) | < 5s | Phase 4-5 |
| Submit Quiz | < 1s | Phase 4-5 |
| Load Results | < 1s | Phase 4-5 |

---

## Support & Questions

**Questions about test plans?**
- Check inline comments in test files
- Review test prerequisites
- Consult `docs/00-START-HERE.md` for project context

**Found issues with test plans?**
- File issue in GitHub
- Tag with `documentation` label
- Suggest improvements in PR

---

## Changelog

### 2025-10-24
- Initial creation of all manual test plans
- Phase 1: MVP Foundation (26 tests)
- Phase 2: Student Experience (12 tests)
- Phase 3: Admin Experience (24 tests)
- Phase 4-5: Quiz Engine & Sessions (32 tests)
- Total: 94 manual test cases

---

## Quick Reference

```bash
# Start testing environment
docker-compose up -d && npm run db:seed && npm run dev

# Reset database
docker-compose down -v && docker-compose up -d && npm run db:seed

# Check logs
docker-compose logs -f postgres

# Access database
psql -U nuquiz_user -h localhost -p 5432 -d nuquiz_dev

# Run automated tests (complement manual testing)
npm test
npm run test:api
npm run test:int
```

---

**Happy Testing!** 🧪
