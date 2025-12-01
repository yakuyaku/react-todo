import { useTodoStats } from '../../hooks/useTodoStats';
import { Card } from '../common/Card';

export function TodoStats() {
  const stats = useTodoStats();

  const statItems = [
    { label: '전체', value: stats.total, color: 'bg-blue-50 text-blue-800 border-blue-300' },
    { label: '진행중', value: stats.active, color: 'bg-green-50 text-green-800 border-green-300' },
    { label: '완료', value: stats.completed, color: 'bg-gray-50 text-gray-800 border-gray-300' },
    { label: '높은 우선순위', value: stats.highPriority, color: 'bg-red-50 text-red-800 border-red-300' },
    { label: '기한 초과', value: stats.overdue, color: 'bg-orange-50 text-orange-800 border-orange-300' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {statItems.map((item) => (
        <Card key={item.label} variant="default" padding="sm" className={`border-2 ${item.color}`}>
          <p className="text-xs mb-1">{item.label}</p>
          <p className="text-3xl font-bold">{item.value}</p>
        </Card>
      ))}
    </div>
  );
}