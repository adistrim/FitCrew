"use client";
import useAuth from './hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Home() {
  useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}