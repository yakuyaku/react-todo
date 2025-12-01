import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TodoPage } from './pages/TodoPage';
import { ToastContainer } from './components/common/Toast/ToastContainer';
import { PerformanceMonitor } from './components/common/PerformanceMonitor';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<TodoPage />} />
        </Routes>
        
        {/* Toast 알림 */}
        <ToastContainer />
        
        {/* 성능 모니터 (개발 모드에서만) */}
        <PerformanceMonitor />
      </div>
    </BrowserRouter>
  );
}

export default App;