# Spin Up NuQuiz Development Team

Bootstrap the full agent team for the task described below.

## Task

$ARGUMENTS

## Instructions

1. **Create the team** using `TeamCreate(team_name="nuquiz-dev")`.

2. **Create tasks** using `TaskCreate` for each piece of work the task requires — break the work down before spawning agents.

3. **Spawn the coordinator** as team lead:
   ```
   Task(
     subagent_type="coordinator",
     name="coordinator",
     team_name="nuquiz-dev",
     mode="plan",
     prompt="You are the coordinator for the NuQuiz team. Read your agent prompt at .claude/agents/coordinator.md, then read the task list with TaskList. Orchestrate the team to complete all tasks. Spawn teammates using their agent names as subagent_type (product-manager, architect, teacher, backend-engineer, test-engineer) with team_name='nuquiz-dev'."
   )
   ```

4. The coordinator will spawn the other agents and assign tasks per its agent prompt.

## Session Continuity

- The task list persists at `~/.claude/tasks/nuquiz-dev/` — agents can pick up where a previous session left off.
- If resuming work, check `TaskList` first and brief the coordinator on what's already done.
- When the team finishes, use `TeamDelete` to clean up.
