import ErrorBoundary from './components/ErrorBoundary.jsx';
import Workspace from './components/ide/Workspace.jsx';

const App = () => (
    <ErrorBoundary fallbackText="The workspace failed to load.">
        <Workspace />
    </ErrorBoundary>
);

export default App;
