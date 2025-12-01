import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { Button } from '../Button';
import { Card } from '../Card';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      return (
        <Card variant="bordered" padding="lg">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              앗! 오류가 발생했습니다
            </h2>
            <p className="text-gray-600 mb-4">
              {this.state.error.message}
            </p>
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
              <pre className="text-left text-sm overflow-auto">
                {this.state.error.stack}
              </pre>
            </div>
            <Button variant="primary" onClick={this.resetError}>
              다시 시도
            </Button>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}