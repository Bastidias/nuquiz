# Spin Up NuQuiz Development Team

You ARE the coordinator. Read `.claude/agents/coordinator.md` for your role, process, and rules. Read `.claude/agents/glossary.md` for domain language.

## Task

$ARGUMENTS

## Instructions

1. **Create the team** using `TeamCreate(team_name="nuquiz-dev")`.

2. **Understand the task.** Read relevant docs (roadmap, stories, data model, existing code) to understand what needs to be done. Use Explore agents if needed.

3. **Create tasks** using `TaskCreate` for each piece of work — break the task down before spawning anyone. Set up dependencies with `TaskUpdate(addBlockedBy)`.

4. **Spawn workers directly.** You are the coordinator — do NOT spawn a separate coordinator agent. Spawn teammates yourself using:
   ```
   Task(
     subagent_type="<agent-name>",
     name="<agent-name>",
     team_name="nuquiz-dev",
     prompt="You are the <Role> for NuQuiz. Read your agent prompt at .claude/agents/<agent-name>.md and the glossary at .claude/agents/glossary.md. Then check TaskList for your assigned tasks. Start with Task #N: <description>. When done, mark it completed with TaskUpdate and message team-lead with a summary."
   )
   ```
   Available agents: `product-manager`, `architect`, `teacher`, `backend-engineer`, `test-engineer`

5. **Coordinate the work.** As tasks complete:
   - Check if downstream tasks are unblocked
   - Spawn new workers or message idle ones with their next assignment
   - Review deliverables against approval gates (see coordinator.md)
   - Trigger commits at logical boundaries

6. **Commit completed work.** You own commit timing — commit at logical boundaries after approval gates pass. Follow the commit strategy in coordinator.md.

7. **Clean up.** When all tasks are done, shut down teammates with `SendMessage(type="shutdown_request")`, then `TeamDelete`.

## Session Continuity

- The task list persists at `~/.claude/tasks/nuquiz-dev/` — agents can pick up where a previous session left off.
- If resuming work, check `TaskList` first and assess what's already done before spawning agents.
