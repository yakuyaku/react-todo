import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Todo, FilterType, SortType } from '../types/todo';
import { useToastStore } from './useToastStore';

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  sortBy: SortType;
  searchQuery: string;
  
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  setSortBy: (sort: SortType) => void;
  setSearchQuery: (query: string) => void;
  clearCompleted: () => void;
  deleteAll: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      sortBy: 'date',
      searchQuery: '',

      addTodo: (todo) => {
        set((state) => ({
          todos: [
            {
              ...todo,
              id: `todo-${Date.now()}-${Math.random()}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            ...state.todos,
          ],
        }));
        
        // Toast 알림 추가
        useToastStore.getState().addToast({
          type: 'success',
          message: '✅ 할 일이 추가되었습니다!',
        });
      },

      updateTodo: (id, updates) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
              : todo
          ),
        }));
        
        useToastStore.getState().addToast({
          type: 'info',
          message: '📝 할 일이 수정되었습니다!',
        });
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
        
        useToastStore.getState().addToast({
          type: 'warning',
          message: '🗑️ 할 일이 삭제되었습니다!',
        });
      },

      toggleTodo: (id) => {
        const todo = get().todos.find(t => t.id === id);
        
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  completed: !todo.completed,
                  updatedAt: new Date().toISOString(),
                }
              : todo
          ),
        }));
        
        if (todo) {
          useToastStore.getState().addToast({
            type: 'success',
            message: todo.completed ? '↩️ 할 일이 미완료로 변경되었습니다!' : '✅ 할 일을 완료했습니다!',
          });
        }
      },

      setFilter: (filter) => set({ filter }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),

      clearCompleted: () => {
        const completedCount = get().todos.filter(t => t.completed).length;
        
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
        
        if (completedCount > 0) {
          useToastStore.getState().addToast({
            type: 'success',
            message: `🎉 ${completedCount}개의 완료된 할 일이 삭제되었습니다!`,
          });
        }
      },

      deleteAll: () => {
        const totalCount = get().todos.length;
        
        set({ todos: [] });
        
        if (totalCount > 0) {
          useToastStore.getState().addToast({
            type: 'warning',
            message: `⚠️ 모든 할 일(${totalCount}개)이 삭제되었습니다!`,
          });
        }
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);