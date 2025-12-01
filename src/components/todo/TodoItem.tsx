import { memo, useState } from 'react';
import { useTodoStore } from '../../stores/useTodoStore';
import type { Todo, Priority } from '../../types/todo';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = memo(({ todo }: TodoItemProps) => {
  const { updateTodo, deleteTodo, toggleTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    updateTodo(todo.id, {
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <Card
      variant="bordered"
      padding="md"
      className={`transition-all ${
        todo.completed ? 'bg-gray-50 opacity-75' : ''
      } ${isOverdue ? 'border-red-500' : ''}`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-bold"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="설명 (선택사항)"
          />
          <div className="flex gap-2">
            <Button variant="success" size="sm" onClick={handleSave}>
              저장
            </Button>
            <Button variant="secondary" size="sm" onClick={handleCancel}>
              취소
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3 mb-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mt-1 w-5 h-5 cursor-pointer"
            />

            <div className="flex-1">
              <h3
                className={`text-lg font-bold ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`text-sm mt-1 ${
                    todo.completed ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {todo.description}
                </p>
              )}

              {/* 태그 */}
              {todo.tags.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {todo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 메타 정보 */}
              <div className="flex gap-3 mt-3 text-xs text-gray-500">
                <span className={`px-2 py-1 rounded-full border-2 ${getPriorityColor(todo.priority)}`}>
                  {todo.priority === 'high' ? '높음' : todo.priority === 'medium' ? '보통' : '낮음'}
                </span>
                {todo.dueDate && (
                  <span className={isOverdue ? 'text-red-600 font-bold' : ''}>
                    📅 {new Date(todo.dueDate).toLocaleDateString('ko-KR')}
                    {isOverdue && ' (기한 초과)'}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
                수정
              </Button>
              <Button variant="danger" size="sm" onClick={() => deleteTodo(todo.id)}>
                삭제
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
});

TodoItem.displayName = 'TodoItem';