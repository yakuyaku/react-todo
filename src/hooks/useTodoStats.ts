import { useMemo } from 'react';
import { useTodoStore } from '../stores/useTodoStore';
import type { TodoStats } from '../types/todo';

export function useTodoStats(): TodoStats {
  const { todos } = useTodoStore();

  return useMemo(() => {
    const now = new Date();

    return {
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      active: todos.filter((t) => !t.completed).length,
      highPriority: todos.filter((t) => t.priority === 'high' && !t.completed).length,
      overdue: todos.filter((t) => {
        if (!t.dueDate || t.completed) return false;
        return new Date(t.dueDate) < now;
      }).length,
    };
  }, [todos]);
}