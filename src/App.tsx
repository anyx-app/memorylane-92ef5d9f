import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Albums from './pages/Albums';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        {/* Placeholder routes for navigation items to prevent 404s on demo clicks */}
        <Route path="/albums" element={<Albums />} />
        <Route path="/favorites" element={<div className="p-10 text-center text-slate-400">Favorites View Coming Soon</div>} />
        <Route path="/settings" element={<div className="p-10 text-center text-slate-400">Settings View Coming Soon</div>} />
        <Route path="*" element={<div className="p-10 text-center text-slate-400">Page not found</div>} />
      </Route>
    </Routes>
  );
}

export default App;

