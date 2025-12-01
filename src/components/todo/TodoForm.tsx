import { useState } from 'react';
import { useTodoStore } from '../../stores/useTodoStore';
import type { Priority } from '../../types/todo';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function TodoForm() {
  const { addTodo } = useTodoStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTodo({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      priority,
      dueDate: dueDate || undefined,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    // 초기화
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setTags('');
  };

  return (
    <Card variant="bordered" padding="lg">
      <h2 className="text-2xl font-bold mb-6">✨ 새 할일 추가</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="제목 *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요..."
          fullWidth
          required
        />

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            설명
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="상세 설명 (선택사항)"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              우선순위
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="low">낮음</option>
              <option value="medium">보통</option>
              <option value="high">높음</option>
            </select>
          </div>

          <Input
            label="마감일"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            fullWidth
          />
        </div>

        <Input
          label="태그"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="태그1, 태그2, 태그3 (쉼표로 구분)"
          helperText="쉼표(,)로 구분하여 여러 태그를 입력할 수 있습니다"
          fullWidth
        />

        <Button type="submit" variant="primary" fullWidth>
          추가하기
        </Button>
      </form>
    </Card>
  );
}