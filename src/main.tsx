import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'rsuite/dist/rsuite.min.css';

createRoot(document.getElementById("root")!).render(<App />);
