import React, { ReactElement } from "react";

interface ErrorBoundaryPropsType {
    fallback: string;
    children: ReactElement;
}

class ErrorBoundary extends React.Component<ErrorBoundaryPropsType>{
    state = {hasError: false};

    static getDerivedSateFromError(error: Error): {hasError: boolean}{
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log('error:', error, 'errorInfo:', errorInfo);
    }

    render(){
        if(this.state.hasError){
            return this.props.fallback;
        }
        return this.props.children;
    }

}

export default ErrorBoundary;