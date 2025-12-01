import { useMemo } from 'react';
import { useTodoStore } from '../stores/useTodoStore';
import type { Todo } from '../types/todo';

export function useTodoFilters() {
  const { todos, filter, sortBy, searchQuery } = useTodoStore();

  const filteredAndSortedTodos = useMemo(() => {
    let result = [...todos];

    // 필터링
    if (filter === 'active') {
      result = result.filter((todo) => !todo.completed);
    } else if (filter === 'completed') {
      result = result.filter((todo) => todo.completed);
    }

    // 검색
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          todo.description?.toLowerCase().includes(query) ||
          todo.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 정렬
    result.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];

        case 'alphabetical':
          return a.title.localeCompare(b.title);

        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [todos, filter, sortBy, searchQuery]);

  return filteredAndSortedTodos;
}