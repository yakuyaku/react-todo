import { useTodoFilters } from '../../hooks/useTodoFilters';
import { TodoItem } from './TodoItem';
import { Card } from '../common/Card';

export function TodoList() {
  const filteredTodos = useTodoFilters();

  if (filteredTodos.length === 0) {
    return (
      <Card variant="bordered" padding="lg">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-400 text-lg">할 일이 없습니다</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}