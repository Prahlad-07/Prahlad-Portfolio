import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error?.message || 'Unknown runtime error' };
    }

    componentDidCatch(error, info) {
        console.error('App crashed:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full rounded-lg border border-black-300 bg-black-200 text-white px-5 py-6 text-center">
                    <p>{this.props.fallbackText || 'This section failed to load.'}</p>
                    <p className="text-white-500 text-sm mt-2">{this.state.errorMessage}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
