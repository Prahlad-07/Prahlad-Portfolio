import { useMediaQuery } from 'react-responsive';
import { WorkspaceProvider } from './WorkspaceContext.jsx';
import SplitLayout from './SplitLayout.jsx';
import MobileReader from './MobileReader.jsx';

const Inner = () => {
    const mobile = useMediaQuery({ maxWidth: 767 });
    return mobile ? <MobileReader /> : <SplitLayout />;
};

const Workspace = () => (
    <WorkspaceProvider>
        <Inner />
    </WorkspaceProvider>
);

export default Workspace;
