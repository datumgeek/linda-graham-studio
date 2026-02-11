import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
