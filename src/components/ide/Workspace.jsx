import { useMediaQuery } from 'react-responsive';
import { WorkspaceProvider } from './WorkspaceContext.jsx';
import SplitLayout from './SplitLayout.jsx';
import MobileReader from './MobileReader.jsx';
import Boot from './Boot.jsx';

const Inner = () => {
    const mobile = useMediaQuery({ maxWidth: 767 });
    return mobile ? <MobileReader /> : <SplitLayout />;
};

const Workspace = () => (
    <WorkspaceProvider>
        <Boot />
        <Inner />
    </WorkspaceProvider>
);

export default Workspace;
