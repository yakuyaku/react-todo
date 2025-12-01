import { useTodoStore } from '../../stores/useTodoStore';
import { Button } from '../common/Button';

export function TodoExport() {
  const { todos } = useTodoStore();

  const exportToJSON = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="secondary" size="sm" onClick={exportToJSON}>
      📥 JSON으로 내보내기
    </Button>
  );
}