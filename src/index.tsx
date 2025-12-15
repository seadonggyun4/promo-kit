import ReactDOM from 'react-dom/client';
import App from './app/App';

// CSS
import './asset/css/reset.css';
import './asset/css/theme.css';
import './asset/css/custom.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<App />);
