# User Stories - MVP Foundation

**Focus**: Marketing, Sign Up, and Content Pack Management

These foundational user stories validate our auth system, RBAC implementation, and content pack DAL before building the quiz engine.

---

## 🎯 Epic 1: Public Marketing & Landing Pages

### Story 1.1: Landing Page
**As a** visitor
**I want to** see what Nuquiz offers
**So that** I can decide if I want to sign up

**Acceptance Criteria:**
- [ ] Landing page shows product overview
- [ ] Clear value proposition visible
- [ ] "Sign Up" and "Login" buttons prominent
- [ ] Responsive design (mobile + desktop)
- [ ] Page loads in < 2 seconds

**Technical Notes:**
- Route: `/` (public, no auth)
- Page: `src/pages/index.tsx`
- No backend calls needed

---

### Story 1.2: About/Features Page
**As a** visitor
**I want to** learn about Nuquiz features
**So that** I understand how the quiz system works

**Acceptance Criteria:**
- [ ] Explains hierarchical knowledge structure
- [ ] Shows example question format
- [ ] Describes content pack system
- [ ] Clear call-to-action to sign up

**Technical Notes:**
- Route: `/about` or `/features` (public, no auth)
- Page: `src/pages/about.tsx`
- Static content

---

## 🔐 Epic 2: User Registration & Authentication

### Story 2.1: User Registration
**As a** visitor
**I want to** create an account
**So that** I can access quiz content

**Acceptance Criteria:**
- [ ] Registration form accepts email, username (optional), password
- [ ] Password must meet strength requirements (zxcvbn feedback shown)
- [ ] Email must be unique (show error if duplicate)
- [ ] Username must be unique (show error if duplicate)
- [ ] User is automatically logged in after registration
- [ ] User gets "student" role by default
- [ ] Redirected to dashboard after successful registration

**API Endpoint:**
```
POST /api/users/register
Body: { email, username?, password }
Response: { user: { id, email, username, role }, message }
```

**Technical Notes:**
- Route: `/register` (public, no auth)
- Page: `src/pages/register.tsx`
- API: `src/pages/api/users/register.ts`
- Validation: Zod schema (email, password strength)
- Uses: `users.create()`, `hashPassword()`, `signIn()`
- Tests: Registration flow, duplicate detection, validation

---

### Story 2.2: User Login
**As a** registered user
**I want to** log in with email and password
**So that** I can access my account

**Acceptance Criteria:**
- [ ] Login form accepts email and password
- [ ] Successful login redirects to dashboard
- [ ] Failed login shows clear error message
- [ ] Failed login logged to `auth_events` table
- [ ] Last login timestamp updated on success
- [ ] "Remember me" keeps session for 30 days

**API Endpoint:**
```
POST /api/auth/signin (NextAuth handles this)
Body: { email, password }
Response: Redirects or returns session
```

**Technical Notes:**
- Route: `/login` (public, no auth)
- Page: `src/pages/login.tsx`
- Uses: NextAuth `signIn()` with credentials provider
- Auth handler: `src/auth.ts` (already implemented)
- Tests: Successful login, failed login, audit logging

---

### Story 2.3: User Logout
**As a** logged-in user
**I want to** log out
**So that** I can secure my account on shared devices

**Acceptance Criteria:**
- [ ] Logout button visible in navigation
- [ ] Clicking logout clears session
- [ ] User redirected to landing page
- [ ] Logout event logged to `auth_events`

**Technical Notes:**
- Uses: NextAuth `signOut()`
- Can be triggered from any page
- Tests: Session cleared, event logged

---

## 👤 Epic 3: User Dashboard (Student)

### Story 3.1: View My Profile
**As a** logged-in user
**I want to** see my profile information
**So that** I can verify my account details

**Acceptance Criteria:**
- [ ] Dashboard shows email, username, role
- [ ] Shows account creation date
- [ ] Shows last login timestamp
- [ ] Edit profile button (future enhancement)

**API Endpoint:**
```
GET /api/users/me
Response: { user: { id, email, username, role, created_at, last_login_at } }
```

**Technical Notes:**
- Route: `/dashboard` (requires auth)
- Page: `src/pages/dashboard.tsx`
- API: `src/pages/api/users/me.ts`
- Middleware: `withAuth()`
- Uses: `users.findById(session.user.id)`

---

### Story 3.2: Browse Available Content Packs
**As a** student
**I want to** see all available content packs
**So that** I can choose which ones to subscribe to

**Acceptance Criteria:**
- [ ] List shows all active content packs
- [ ] Each pack shows: name, description, creator
- [ ] Packs I'm subscribed to are marked/highlighted
- [ ] Packs I don't have access to show "Subscribe" button
- [ ] Inactive packs are not shown

**API Endpoint:**
```
GET /api/content-packs
Response: {
  data: [
    { id, name, description, is_active, created_by, subscribed: boolean }
  ]
}
```

**Technical Notes:**
- Route: `/content-packs` (requires auth)
- Page: `src/pages/content-packs/index.tsx`
- API: `src/pages/api/content-packs/index.ts`
- Middleware: `withAuth()`
- Uses: `contentPacks.findActive()`, `contentPacks.getUserPacks()`

---

### Story 3.3: View Content Pack Details
**As a** student
**I want to** see details about a content pack
**So that** I can decide if I want to subscribe

**Acceptance Criteria:**
- [ ] Shows pack name and description
- [ ] Shows creator information
- [ ] Shows my subscription status
- [ ] Shows "Subscribe" button if not subscribed
- [ ] Shows knowledge hierarchy preview (topic count, category count)

**API Endpoint:**
```
GET /api/content-packs/:id
Response: {
  data: {
    id, name, description, created_by, subscribed: boolean,
    stats: { topics: 5, categories: 20, facts: 100 }
  }
}
```

**Technical Notes:**
- Route: `/content-packs/[id]` (requires auth)
- Page: `src/pages/content-packs/[id].tsx`
- API: `src/pages/api/content-packs/[id]/index.ts`
- Middleware: `withAuth()`
- Uses: `contentPacks.findById()`, `contentPacks.hasAccess()`

---

### Story 3.4: Subscribe to Content Pack
**As a** student
**I want to** subscribe to a content pack
**So that** I can access its quiz content

**Acceptance Criteria:**
- [ ] Clicking "Subscribe" creates subscription
- [ ] Subscription has no expiration (lifetime access for MVP)
- [ ] Success message shown after subscription
- [ ] Pack details page updates to show "Subscribed"
- [ ] Cannot subscribe twice to same pack

**API Endpoint:**
```
POST /api/content-packs/:id/subscribe
Response: {
  data: { subscription_id, expires_at: null },
  message: "Successfully subscribed"
}
```

**Technical Notes:**
- API: `src/pages/api/content-packs/[id]/subscribe.ts`
- Middleware: `withAuth()`
- Validation: Check pack exists, check not already subscribed
- Uses: `contentPacks.subscribe(userId, packId)`
- Tests: Successful subscription, duplicate prevention

---

### Story 3.5: View My Subscriptions
**As a** student
**I want to** see all content packs I'm subscribed to
**So that** I can access them easily

**Acceptance Criteria:**
- [ ] Dashboard shows list of my subscribed packs
- [ ] Each pack shows name and subscription date
- [ ] Clicking pack navigates to pack details
- [ ] Empty state if no subscriptions

**API Endpoint:**
```
GET /api/users/me/subscriptions
Response: {
  data: [
    { pack_id, pack_name, subscribed_at, expires_at }
  ]
}
```

**Technical Notes:**
- Included in dashboard page
- API: `src/pages/api/users/me/subscriptions.ts`
- Middleware: `withAuth()`
- Uses: `contentPacks.getUserPacks(session.user.id)`

---

## 👨‍💼 Epic 4: Content Pack Management (Admin)

### Story 4.1: Admin Dashboard
**As an** admin
**I want to** see an admin-specific dashboard
**So that** I can manage content packs

**Acceptance Criteria:**
- [ ] Dashboard shows different UI for admin role
- [ ] Shows "Create Content Pack" button
- [ ] Lists all my created content packs
- [ ] Shows subscriber count for each pack
- [ ] Links to create/edit/delete operations

**Technical Notes:**
- Route: `/admin/dashboard` (requires admin role)
- Page: `src/pages/admin/dashboard.tsx`
- Check role in component: `session.user.role === 'admin'`
- Can also use same `/dashboard` with role-based rendering

---

### Story 4.2: Create Content Pack
**As an** admin
**I want to** create a new content pack
**So that** students can subscribe to it

**Acceptance Criteria:**
- [ ] Form accepts name (required) and description (optional)
- [ ] Can set pack as active or inactive
- [ ] Creator is automatically set to current admin
- [ ] Success message shown after creation
- [ ] Redirected to pack management page

**API Endpoint:**
```
POST /api/content-packs/create
Body: { name, description?, is_active: true }
Response: {
  data: { id, name, description, is_active, created_by },
  message: "Content pack created"
}
```

**Technical Notes:**
- Route: `/admin/content-packs/create` (requires admin)
- Page: `src/pages/admin/content-packs/create.tsx`
- API: `src/pages/api/content-packs/create.ts`
- Middleware: `withAdmin()`
- Validation: Zod schema (name required, 3-100 chars)
- Uses: `contentPacks.create()`
- Tests: Create active pack, create inactive pack, validation

---

### Story 4.3: View My Content Packs
**As an** admin
**I want to** see all content packs I've created
**So that** I can manage them

**Acceptance Criteria:**
- [ ] Lists all packs created by me
- [ ] Shows name, description, active status
- [ ] Shows subscriber count for each pack
- [ ] Links to edit and delete
- [ ] Can filter by active/inactive

**API Endpoint:**
```
GET /api/content-packs/mine
Response: {
  data: [
    {
      id, name, description, is_active, created_at,
      subscriber_count: 15
    }
  ]
}
```

**Technical Notes:**
- Route: `/admin/content-packs` (requires admin)
- Page: `src/pages/admin/content-packs/index.tsx`
- API: `src/pages/api/content-packs/mine.ts`
- Middleware: `withAdmin()`
- Uses: `contentPacks.findByCreator()`, `contentPacks.countSubscriptions()`

---

### Story 4.4: Edit Content Pack
**As an** admin
**I want to** edit a content pack I created
**So that** I can update its details

**Acceptance Criteria:**
- [ ] Form pre-populated with current values
- [ ] Can update name, description, is_active status
- [ ] Cannot edit packs created by other admins (ownership check)
- [ ] Success message shown after update
- [ ] Changes reflected immediately

**API Endpoint:**
```
PUT /api/content-packs/:id/update
Body: { name?, description?, is_active? }
Response: {
  data: { id, name, description, is_active },
  message: "Content pack updated"
}
```

**Technical Notes:**
- Route: `/admin/content-packs/[id]/edit` (requires admin)
- Page: `src/pages/admin/content-packs/[id]/edit.tsx`
- API: `src/pages/api/content-packs/[id]/update.ts`
- Middleware: `withAdmin()`
- Authorization: Check `created_by === session.user.id` OR superadmin
- Uses: `contentPacks.findById()`, `contentPacks.update()`
- Tests: Update own pack, reject update others' packs, superadmin can edit all

---

### Story 4.5: Delete Content Pack
**As an** admin
**I want to** delete a content pack I created
**So that** it's no longer available

**Acceptance Criteria:**
- [ ] Confirmation prompt before deletion
- [ ] Cannot delete packs created by other admins (ownership check)
- [ ] Deleting pack removes all subscriptions (CASCADE)
- [ ] Success message shown after deletion
- [ ] Redirected to pack list

**API Endpoint:**
```
DELETE /api/content-packs/:id
Response: {
  message: "Content pack deleted successfully"
}
```

**Technical Notes:**
- API: `src/pages/api/content-packs/[id]/index.ts` (DELETE method)
- Middleware: `withAdmin()`
- Authorization: Check `created_by === session.user.id` OR superadmin
- Uses: `contentPacks.findById()`, `contentPacks.remove()`
- Tests: Delete own pack, CASCADE subscriptions, reject delete others' packs

---

### Story 4.6: View Pack Subscribers
**As an** admin
**I want to** see who has subscribed to my content pack
**So that** I can understand pack usage

**Acceptance Criteria:**
- [ ] Lists all users subscribed to this pack
- [ ] Shows username, email, subscription date
- [ ] Shows total subscriber count
- [ ] Can only view subscribers for packs I created

**API Endpoint:**
```
GET /api/content-packs/:id/subscribers
Response: {
  data: [
    { user_id, username, email, subscribed_at }
  ],
  total: 25
}
```

**Technical Notes:**
- Route: `/admin/content-packs/[id]/subscribers` (requires admin)
- Page: `src/pages/admin/content-packs/[id]/subscribers.tsx`
- API: `src/pages/api/content-packs/[id]/subscribers.ts`
- Middleware: `withAdmin()`
- Authorization: Check ownership
- Uses: `contentPacks.getPackSubscribers()`

---

## 👑 Epic 5: User Management (Superadmin Only)

### Story 5.1: View All Users
**As a** superadmin
**I want to** see all users in the system
**So that** I can manage them

**Acceptance Criteria:**
- [ ] Lists all users with email, username, role
- [ ] Shows registration date and last login
- [ ] Can filter by role
- [ ] Pagination (20 per page)

**API Endpoint:**
```
GET /api/admin/users
Query: { role?, page?, limit? }
Response: {
  data: [{ id, email, username, role, created_at, last_login_at }],
  pagination: { total, page, limit }
}
```

**Technical Notes:**
- Route: `/admin/users` (requires superadmin)
- Page: `src/pages/admin/users/index.tsx`
- API: `src/pages/api/admin/users/index.ts`
- Middleware: `withSuperAdmin()`
- Uses: Custom query with pagination

---

### Story 5.2: Change User Role
**As a** superadmin
**I want to** change a user's role
**So that** I can grant admin privileges

**Acceptance Criteria:**
- [ ] Can change role to student, admin, or superadmin
- [ ] Confirmation required for role change
- [ ] Role change logged to `auth_events`
- [ ] User's next session reflects new role
- [ ] Cannot change own role (safety check)

**API Endpoint:**
```
PUT /api/admin/users/:id/role
Body: { role: 'student' | 'admin' | 'superadmin' }
Response: {
  data: { id, email, role },
  message: "User role updated"
}
```

**Technical Notes:**
- API: `src/pages/api/admin/users/[id]/role.ts`
- Middleware: `withSuperAdmin()`
- Validation: Cannot change own role
- Uses: `users.updateRole()`, `logAuthEvent()`
- Tests: Change role, prevent self-change, audit logging

---

## 🎨 Epic 6: UI/UX Foundation

### Story 6.1: Navigation Bar
**As a** user
**I want to** navigate between pages easily
**So that** I can access different features

**Acceptance Criteria:**
- [ ] Shows "Home", "About" for all users
- [ ] Shows "Dashboard", "Content Packs", "Logout" for logged-in users
- [ ] Shows "Admin Dashboard" for admins
- [ ] Shows "User Management" for superadmins
- [ ] Shows user email and role indicator
- [ ] Responsive mobile menu

**Technical Notes:**
- Component: `src/components/Navigation.tsx`
- Uses session to determine what to show
- Active route highlighted

---

### Story 6.2: Protected Route Handling
**As a** user
**I want to** be redirected appropriately
**So that** I can't access pages without permission

**Acceptance Criteria:**
- [ ] Unauthenticated users redirected to `/login`
- [ ] Students accessing admin pages redirected to `/dashboard`
- [ ] Clear error message shown for insufficient permissions

**Technical Notes:**
- Use Next.js middleware or client-side checks
- Can use `requireAuth()` and `requireRole()` from `src/auth.ts`
- Show toast/alert for permission denied

---

## 📊 Technical Implementation Order

### Phase 1: Public Pages & Auth (Week 1)
1. Landing page (`/`)
2. About page (`/about`)
3. Register page + API (`/register`, `POST /api/users/register`)
4. Login page (uses NextAuth)
5. Logout functionality

**Tests:**
- Registration flow (duplicate email/username, validation)
- Login flow (success, failure, audit logging)
- Session management

---

### Phase 2: Student Experience (Week 2)
1. Dashboard (`/dashboard`)
2. View profile (`GET /api/users/me`)
3. Browse content packs (`GET /api/content-packs`)
4. View pack details (`GET /api/content-packs/:id`)
5. Subscribe to pack (`POST /api/content-packs/:id/subscribe`)
6. View my subscriptions

**Tests:**
- Content pack browsing
- Subscription flow (success, duplicate prevention)
- Access control (subscription required)

---

### Phase 3: Admin Experience (Week 3)
1. Admin dashboard
2. Create content pack (`POST /api/content-packs/create`)
3. View my packs (`GET /api/content-packs/mine`)
4. Edit pack (`PUT /api/content-packs/:id/update`)
5. Delete pack (`DELETE /api/content-packs/:id`)
6. View subscribers (`GET /api/content-packs/:id/subscribers`)

**Tests:**
- Pack CRUD operations
- Ownership checks (can't edit others' packs)
- CASCADE delete (subscriptions removed)

---

### Phase 4: Superadmin Features (Week 4)
1. User management page
2. List all users (`GET /api/admin/users`)
3. Change user role (`PUT /api/admin/users/:id/role`)

**Tests:**
- Role changes
- Audit logging
- Self-change prevention

---

## ✅ Success Criteria

**Foundation is complete when:**
- [ ] Users can register and login
- [ ] Students can browse and subscribe to content packs
- [ ] Admins can create and manage content packs
- [ ] Superadmins can manage user roles
- [ ] All API routes protected with appropriate RBAC
- [ ] All inputs validated with Zod
- [ ] All errors handled with AppError
- [ ] 90%+ test coverage on API routes
- [ ] UI is responsive and accessible

---

## 🚀 After Foundation

Once this foundation is solid, we can build:
1. Knowledge hierarchy management (admin creates topics/categories/facts)
2. Quiz generation engine
3. Quiz taking experience
4. Progress tracking
5. Analytics dashboard

**But first, nail the basics!** 🎯
