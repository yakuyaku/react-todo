import { useTodoStore } from '../../stores/useTodoStore';
import type { FilterType, SortType } from '../../types/todo';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function TodoFilters() {
  const { filter, sortBy, searchQuery, setFilter, setSortBy, setSearchQuery, clearCompleted } =
    useTodoStore();

  return (
    <Card variant="bordered" padding="md">
      <div className="space-y-4">
        {/* 검색 */}
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 검색..."
          fullWidth
        />

        {/* 필터 */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">필터</p>
          <div className="flex gap-2">
            {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? '전체' : f === 'active' ? '진행중' : '완료'}
              </Button>
            ))}
          </div>
        </div>

        {/* 정렬 */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">정렬</p>
          <div className="flex gap-2">
            {(['date', 'priority', 'alphabetical'] as SortType[]).map((s) => (
              <Button
                key={s}
                variant={sortBy === s ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setSortBy(s)}
              >
                {s === 'date' ? '날짜순' : s === 'priority' ? '우선순위' : '가나다순'}
              </Button>
            ))}
          </div>
        </div>

        {/* 완료된 항목 삭제 */}
        <Button variant="danger" size="sm" fullWidth onClick={clearCompleted}>
          완료된 항목 삭제
        </Button>
      </div>
    </Card>
  );
}