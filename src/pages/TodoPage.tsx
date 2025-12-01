import { TodoForm } from '../components/todo/TodoForm';
import { TodoFilters } from '../components/todo/TodoFilters';
import { TodoStats } from '../components/todo/TodoStats';
import { TodoList } from '../components/todo/TodoList';

export function TodoPage() {
  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        ✅ 실전 Todo 앱
      </h1>

      {/* 통계 */}
      <div className="mb-6">
        <TodoStats />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 왼쪽: 폼 + 필터 */}
        <div className="lg:col-span-1 space-y-6">
          <TodoForm />
          <TodoFilters />
        </div>

        {/* 오른쪽: Todo 리스트 */}
        <div className="lg:col-span-2">
          <TodoList />
        </div>
      </div>
    </div>
  );
}