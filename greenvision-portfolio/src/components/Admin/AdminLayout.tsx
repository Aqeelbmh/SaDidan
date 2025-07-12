'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { FiArrowLeft, FiHome, FiPlus, FiList, FiLogOut } from 'react-icons/fi';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  section: string;
}

const AdminLayout = ({ children, title, section }: AdminLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Remove the admin token cookie
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Timeline', href: '/admin/timeline', icon: FiList },
    { name: 'Publications', href: '/admin/publications', icon: FiList },
    { name: 'Gallery', href: '/admin/gallery', icon: FiList },
    { name: 'Awards', href: '/admin/awards', icon: FiList },
    { name: 'Projects', href: '/admin/projects', icon: FiList },
    { name: 'Language', href: '/admin/language', icon: FiList },
    { name: 'Certificates', href: '/admin/certificates', icon: FiList },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500">Manage your {section.toLowerCase()} content</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                View Portfolio
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <FiLogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout; 