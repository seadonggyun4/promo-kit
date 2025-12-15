import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditorPage, HomePage } from '@/pages';

import '@/shared/config/i18n';
import 'seo-toast';
import 'seo-toast/styles';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor" element={<EditorPage />} />
                </Routes>
                <seo-toast position="top-right" />
            </div>
        </BrowserRouter>
    );
}

export default App;
