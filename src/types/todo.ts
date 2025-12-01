// src/types/todo.ts

export type Priority = 'low' | 'medium' | 'high';
export type FilterType = 'all' | 'active' | 'completed';  // ✅ 추가!
export type SortType = 'date' | 'priority' | 'alphabetical';  // ✅ 추가!

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  highPriority: number;
  overdue: number;
}