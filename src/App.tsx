import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Albums from './pages/Albums';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        {/* Placeholder routes for navigation items to prevent 404s on demo clicks */}
        <Route path="/albums" element={<Albums />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<div className="p-10 text-center text-slate-400">Page not found</div>} />
      </Route>
    </Routes>
  );
}

export default App;

