# Nuquiz MVP Implementation Roadmap

## 📋 MVP Scope (Launch in 4-6 weeks)

### Core Features
✅ **What's In:**
- User registration/login
- Subscribe to content packs
- Take quizzes with complex multi-component answers
- Track basic progress (mastery percentage)
- View quiz history and scores

❌ **What's Out:**
- Adaptive difficulty
- Spaced repetition
- Prerequisite recommendations
- Detailed confusion analysis
- Social features

### Database Tables (11 total)
1. `users` - User accounts
2. `content_packs` - Quiz content packages  
3. `user_pack_subscriptions` - Who has access to what
4. `knowledge` - The hierarchical knowledge tree
5. `quiz_sessions` - Track each quiz attempt
6. `questions` - Questions asked in each session
7. `answer_options` - Multiple choice options
8. `answer_option_components` - **YOUR KEY INNOVATION** - Complex answer tracking
9. `user_knowledge_progress` - Simple mastery tracking
10. `analytics_events` - Flexible event logging for future analysis
11. Two basic views for dashboards

## 🚀 Phase 1: MVP Development (Weeks 1-4)

### Week 1-2: Foundation
```sql
-- Start with these tables first
1. users
2. content_packs  
3. user_pack_subscriptions
4. knowledge

-- Build content loading tools
- CSV importer for knowledge hierarchy
- Admin interface for content packs
```

### Week 2-3: Quiz Engine
```sql
-- Core quiz functionality
5. quiz_sessions
6. questions
7. answer_options
8. answer_option_components

-- Focus on:
- Question generation from knowledge paths
- Complex answer composition (multiple facts/categories)
- Basic distractor selection (random from siblings)
```

### Week 3-4: Progress & Analytics
```sql
-- Tracking and reporting
9. user_knowledge_progress
10. analytics_events

-- Build:
- Simple mastery calculation (correct/total * 100)
- Basic progress dashboard
- Session history view
```

## 📊 Phase 2: Data Collection (Weeks 5-8)

### Launch MVP & Gather Data
- Deploy with 2-3 content packs
- Get 50-100 beta users
- Run for 30 days minimum
- Log EVERYTHING in `analytics_events`

### Key Metrics to Track
```javascript
// Every question answered
{
  "event_type": "question_answered",
  "event_data": {
    "correct": boolean,
    "time_seconds": number,
    "selected_components": [knowledge_ids],
    "correct_components": [knowledge_ids],
    "distractor_source": "category|attribute"
  }
}

// Session patterns
{
  "event_type": "session_completed",
  "event_data": {
    "duration_seconds": number,
    "score": number,
    "performance_by_category": {},
    "fatigue_pattern": "steady|declining|improving"
  }
}
```

## 🧠 Phase 3: Intelligence Layer (Weeks 9-12)

### Analyze Data & Build Smart Features

**Month 2: Basic Intelligence**
```sql
-- Add tables based on real patterns:
CREATE TABLE user_adaptive_state (
    -- Only if you have 1000+ question attempts
);

CREATE TABLE category_confusion_matrix (
    -- Only if you see clear confusion patterns
);
```

**Month 3: Advanced Features**
- Spaced repetition (need retention data first)
- Prerequisite discovery (need sequence data)
- Adaptive difficulty (need performance distribution)

## 📈 Success Metrics

### MVP Success = 
- ✅ Users can complete quizzes
- ✅ Complex answers tracked correctly  
- ✅ Basic progress visible
- ✅ System logs enough data for v2

### NOT Success Metrics for MVP:
- ❌ Perfect difficulty adjustment
- ❌ Optimal spaced repetition
- ❌ Advanced analytics

## 🔄 Migration Strategy

### From MVP to V2

```sql
-- Month 2: Analyze analytics_events and create specific tables
WITH confusion_analysis AS (
    SELECT 
        event_data->>'correct_knowledge_id' as correct_id,
        event_data->>'confused_with_id' as confused_id,
        COUNT(*) as frequency
    FROM analytics_events
    WHERE event_type = 'confusion_detected'
    GROUP BY 1, 2
    HAVING COUNT(*) > 10  -- Statistical significance
)
-- Use this to design category_confusion_matrix table

-- Month 3: Build adaptive features based on real data
WITH performance_patterns AS (
    SELECT 
        user_id,
        jsonb_array_elements(event_data->'knowledge_tested') as knowledge_id,
        AVG((event_data->>'correct')::boolean::int) as success_rate,
        COUNT(*) as attempts
    FROM analytics_events
    WHERE event_type = 'question_answered'
    GROUP BY 1, 2
    HAVING COUNT(*) > 5
)
-- Use this to build user_adaptive_state
```

## 🎯 Development Priorities

### Must Have (MVP)
1. **Knowledge hierarchy** works correctly
2. **Answer composition** tracking is bulletproof
3. **Basic progress** tracking works
4. **Event logging** captures everything

### Nice to Have (V2)
1. Adaptive difficulty
2. Spaced repetition
3. Confusion matrices
4. Prerequisite discovery

### Future (V3+)
1. AI-generated questions
2. Collaborative content creation
3. Competitive features
4. Mobile app

## 💡 Key Technical Decisions

### Database Choice
- **PostgreSQL** - Best for JSONB support in analytics_events
- **MySQL 8+** - Can work with JSON columns
- **SQLite** - Fine for proof of concept

### Event Data Storage
```sql
-- Flexible JSONB allows schema evolution
INSERT INTO analytics_events (event_type, event_data)
VALUES ('new_event_type_we_didnt_anticipate', '{...}'::jsonb);

-- Can always query later
SELECT * FROM analytics_events 
WHERE event_data->>'confusion' IS NOT NULL;
```

### Answer Component Tracking
```sql
-- The key innovation - keep this robust from day 1
INSERT INTO answer_option_components 
(answer_option_id, knowledge_id, component_type, source_path)
VALUES 
(1, 101, 'fact', 'cardiology|heart_failure|left_sided|symptoms'),
(1, 102, 'fact', 'cardiology|heart_failure|right_sided|symptoms');
-- This enables all future analytics
```

## 🚨 Common Pitfalls to Avoid

1. **Don't over-engineer the MVP** - You don't need 20 tables on day 1
2. **Don't skip event logging** - You'll need this data for v2
3. **Don't hardcode difficulty** - Log it, analyze it, then build it
4. **Don't assume user behavior** - Let data drive v2 features

## ✅ Definition of Done for MVP

- [ ] Users can register and login
- [ ] Users can subscribe to content packs
- [ ] Knowledge hierarchy loads correctly
- [ ] Questions generate with correct/distractor options
- [ ] Complex answers decompose into components
- [ ] Progress tracks at fact/attribute/category level
- [ ] Events log to analytics_events table
- [ ] Basic dashboard shows mastery
- [ ] 30+ days of real usage data collected

## 🎉 Then You're Ready for V2!

With 30 days of data, you'll know:
- Which categories users confuse
- How difficulty should progress
- What prerequisites exist
- When to review content

Build intelligence features based on **real patterns**, not assumptions!