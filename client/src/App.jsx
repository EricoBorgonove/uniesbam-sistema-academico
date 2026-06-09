import { useCallback, useEffect, useMemo, useState } from 'react';
import { api, clearSession, getUser, setSession } from './api/frontendApi.js';
import AppLayout from './components/layout/AppLayout.jsx';
import { entityConfigs } from './config/entityConfigs.js';
import { navigationItems, titleFor } from './config/navigation.js';
import Dashboard from './pages/Dashboard.jsx';
import EntityPage from './pages/EntityPage.jsx';
import GradesPage from './pages/GradesPage.jsx';
import Login from './pages/Login.jsx';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [page, setPage] = useState('dashboard');
  const [lookups, setLookups] = useState({ students: [], teachers: [], classes: [], enrollments: [] });

  const visibleNav = useMemo(
    () => navigationItems.filter((item) => !item.adminOnly || user?.role === 'ADMIN'),
    [user]
  );

  const loadLookups = useCallback(async function loadLookups() {
    if (!user) return;
    const [students, teachers, classes, enrollments] = await Promise.all([
      api('/students'),
      api('/teachers'),
      api('/classes'),
      api('/enrollments')
    ]);
    setLookups({ students, teachers, classes, enrollments });
  }, [user]);

  useEffect(() => {
    loadLookups().catch(() => {});
  }, [loadLookups]);

  async function handleLogin(credentials) {
    const session = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    setSession(session);
    setUser(session.user);
  }

  function logout() {
    clearSession();
    setUser(null);
    setPage('dashboard');
  }

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <AppLayout
      navItems={visibleNav}
      page={page}
      title={titleFor(page)}
      user={user}
      onNavigate={setPage}
      onLogout={logout}
    >
      {page === 'dashboard' && <Dashboard />}
      {page === 'students' && (
        <EntityPage config={entityConfigs.students} endpoint="/students" onChanged={loadLookups} />
      )}
      {page === 'teachers' && (
        <EntityPage config={entityConfigs.teachers} endpoint="/teachers" lookups={lookups} onChanged={loadLookups} />
      )}
      {page === 'classes' && (
        <EntityPage config={entityConfigs.classes} endpoint="/classes" lookups={lookups} onChanged={loadLookups} />
      )}
      {page === 'enrollments' && (
        <EntityPage
          config={entityConfigs.enrollments}
          endpoint="/enrollments"
          lookups={lookups}
          onChanged={loadLookups}
        />
      )}
      {page === 'grades' && <GradesPage lookups={lookups} onChanged={loadLookups} />}
      {page === 'users' && user.role === 'ADMIN' && (
        <EntityPage config={entityConfigs.users} endpoint="/users" onChanged={loadLookups} />
      )}
    </AppLayout>
  );
}
