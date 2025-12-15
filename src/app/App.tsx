import { EditorPage } from '@/pages';

import 'seo-toast';
import 'seo-toast/styles';

function App() {
    return (
        <div className="App">
            <EditorPage />
            <seo-toast position="top-right" />
        </div>
    );
}

export default App;
