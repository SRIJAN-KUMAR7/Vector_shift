import { Toaster } from 'react-hot-toast';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
