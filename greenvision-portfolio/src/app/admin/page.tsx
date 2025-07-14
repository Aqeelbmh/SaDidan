'use client';

import { FiUser, FiPlus } from 'react-icons/fi';
import AuthWrapper from '@/components/Admin/AuthWrapper';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import DataManager from '@/components/Admin/DataManager';

const sectionOrder = [
  'Timeline',
  'Publications',
  'Gallery',
  'Awards',
  'Projects',
  'Language Skills',
  'Certificates',
];

const sectionLabels: Record<string, string> = {
  'Timeline': 'Experience',
  'Publications': 'Publications',
  'Gallery': 'Gallery',
  'Awards': 'Awards',
  'Projects': 'Projects',
  'Language Skills': 'Languages',
  'Certificates': 'Certificates',
};

// Section fields for each tab
const sectionFields: Record<string, {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'url' | 'array' | 'select';
  required?: boolean;
  options?: string[];
  placeholder?: string;
}[]> = {
  Timeline: [
    { name: 'year', label: 'Year', type: 'text', required: true, placeholder: 'e.g., 2023' },
    { name: 'title', label: 'Position/Title', type: 'text', required: true, placeholder: 'e.g., Software Engineer' },
    { name: 'company', label: 'Company/Organization', type: 'text', required: true, placeholder: 'e.g., Tech Company Inc.' },
    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe your role and achievements' },
    { name: 'icon', label: 'Icon (Emoji)', type: 'text', required: false, placeholder: 'e.g., 💼 🎓 🏆' },
  ],
  Publications: [
    { name: 'title', label: 'Paper Title', type: 'text', required: true, placeholder: 'e.g., Advanced Machine Learning Techniques' },
    { name: 'authors', label: 'Authors', type: 'text', required: true, placeholder: 'e.g., Your Name, Co-author Name' },
    { name: 'journal', label: 'Journal/Conference', type: 'text', required: true, placeholder: 'e.g., IEEE Transactions on AI' },
    { name: 'year', label: 'Year', type: 'text', required: true, placeholder: 'e.g., 2023' },
    { name: 'doi', label: 'DOI', type: 'text', required: false, placeholder: 'e.g., 10.1000/example' },
    { name: 'link', label: 'Link', type: 'url', required: false, placeholder: 'https://example.com/paper' },
  ],
  Gallery: [
    { name: 'title', label: 'Image Title', type: 'text', required: true, placeholder: 'e.g., Project Screenshot' },
    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe the image or project' },
    { name: 'imageUrl', label: 'Image URL', type: 'url', required: true, placeholder: 'https://example.com/image.jpg' },
    { name: 'category', label: 'Category', type: 'select', required: true, options: ['projects', 'awards', 'certificates', 'other'] },
  ],
  Awards: [
    { name: 'title', label: 'Award Title', type: 'text', required: true, placeholder: 'e.g., Best Developer Award' },
    { name: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'e.g., Tech Conference 2023' },
    { name: 'year', label: 'Year', type: 'text', required: true, placeholder: 'e.g., 2023' },
    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe the award and recognition' },
  ],
  Projects: [
    { name: 'title', label: 'Project Title', type: 'text', required: true, placeholder: 'e.g., Portfolio Website' },
    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe your project and its features' },
    { name: 'technologies', label: 'Technologies Used', type: 'array', required: true, placeholder: 'Next.js, React, TypeScript, Tailwind CSS' },
    { name: 'githubUrl', label: 'GitHub URL', type: 'url', required: false, placeholder: 'https://github.com/username/project' },
    { name: 'liveUrl', label: 'Live Demo URL', type: 'url', required: false, placeholder: 'https://project-demo.com' },
    { name: 'imageUrl', label: 'Project Image URL', type: 'url', required: false, placeholder: 'https://example.com/project-screenshot.jpg' },
  ],
  'Language Skills': [
    { name: 'name', label: 'Language/Skill Name', type: 'text', required: true, placeholder: 'e.g., JavaScript, Python, React' },
    { name: 'proficiency', label: 'Proficiency Level (0-100)', type: 'number', required: true, placeholder: '90' },
    { name: 'category', label: 'Category', type: 'select', required: true, options: ['Programming', 'Framework', 'Language', 'Tool', 'Database', 'Other'] },
  ],
  Certificates: [
    { name: 'title', label: 'Certificate Title', type: 'text', required: true, placeholder: 'e.g., AWS Certified Developer' },
    { name: 'issuer', label: 'Issuing Organization', type: 'text', required: true, placeholder: 'e.g., Amazon Web Services' },
    { name: 'date', label: 'Issue Date', type: 'text', required: true, placeholder: 'YYYY-MM-DD' },
    { name: 'credentialId', label: 'Credential ID', type: 'text', required: false, placeholder: 'e.g., AWS-123456' },
    { name: 'imageUrl', label: 'Certificate Image URL', type: 'url', required: false, placeholder: 'https://example.com/certificate.png' },
    { name: 'link', label: 'Verification Link', type: 'url', required: false, placeholder: 'https://aws.amazon.com/certification/' },
  ],
};

// Color map for section badges
const sectionColors: Record<string, string> = {
  Certificates: 'bg-blue-100 text-blue-600',
  Timeline: 'bg-teal-100 text-teal-600',
  Publications: 'bg-indigo-100 text-indigo-600',
  Awards: 'bg-yellow-100 text-yellow-600',
  'Language Skills': 'bg-pink-100 text-pink-600',
  Projects: 'bg-green-100 text-green-600',
  Gallery: 'bg-purple-100 text-purple-600',
};

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(sectionOrder[0]);
  const [stats, setStats] = useState<Record<string, number>>({
    Timeline: 0,
    Publications: 0,
    Gallery: 0,
    Awards: 0,
    Projects: 0,
    'Language Skills': 0,
    Certificates: 0,
  });

  // Function to refresh stats from localStorage
  const refreshStats = () => {
    const newStats = { ...stats };
    sectionOrder.forEach(section => {
      const stored = localStorage.getItem(`portfolio_${section.toLowerCase().replace(/ /g, '')}`);
      newStats[section] = stored ? JSON.parse(stored).length : 0;
    });
    setStats(newStats);
  };

  const [search, setSearch] = useState('');

  // Simulate fetching stats from localStorage or API
  useEffect(() => {
    refreshStats();
  }, [activeTab, refreshStats]);

  const handleLogout = () => {
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        {/* Header Card */}
        <header className="w-full flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 rounded-2xl shadow-lg px-8 py-6 mt-8 mb-6 mx-auto max-w-6xl">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-1">Portfolio Admin Panel</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Manage your certifications, experience, and publications</p>
          </div>
          <div className="flex items-center gap-6 mt-6 md:mt-0 flex-wrap">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-blue-500 bg-blue-100 px-4 py-1 rounded-full">{stats['Certificates']}</span>
              <span className="text-xs text-gray-400 mt-1">Certificates</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-teal-500 bg-teal-100 px-4 py-1 rounded-full">{stats['Timeline']}</span>
              <span className="text-xs text-gray-400 mt-1">Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-indigo-500 bg-indigo-100 px-4 py-1 rounded-full">{stats['Publications']}</span>
              <span className="text-xs text-gray-400 mt-1">Publications</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-yellow-600 bg-yellow-100 px-4 py-1 rounded-full">{stats['Awards']}</span>
              <span className="text-xs text-gray-400 mt-1">Awards</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-pink-500 bg-pink-100 px-4 py-1 rounded-full">{stats['Language Skills']}</span>
              <span className="text-xs text-gray-400 mt-1">Languages</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-green-600 bg-green-100 px-4 py-1 rounded-full">{stats['Projects']}</span>
              <span className="text-xs text-gray-400 mt-1">Projects</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-purple-600 bg-purple-100 px-4 py-1 rounded-full">{stats['Gallery']}</span>
              <span className="text-xs text-gray-400 mt-1">Gallery</span>
            </div>
            <button onClick={handleLogout} className="ml-6 px-5 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition-colors">Logout</button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shadow-lg ml-2">
              <FiUser className="w-6 h-6 text-white" />
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="w-full max-w-6xl mx-auto">
          <nav className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-2xl px-4 pt-4">
            {sectionOrder.map(section => (
              <button
                key={section}
                className={`px-4 py-2 text-base font-semibold rounded-t-lg focus:outline-none transition-colors ${activeTab === section ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setActiveTab(section)}
              >
                {sectionLabels[section]}
              </button>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 bg-white dark:bg-gray-800 rounded-b-2xl shadow mb-6">
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
                <option>All Categories</option>
              </select>
            </div>
            <div className="flex gap-2 w-full md:w-auto justify-end">
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors flex items-center gap-2"><FiPlus /> Add {sectionLabels[activeTab]}</button>
              <button className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition-colors">Export</button>
              <button className="px-4 py-2 rounded-lg bg-yellow-400 text-white font-semibold shadow hover:bg-yellow-500 transition-colors">Import</button>
              <button className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition-colors">Reset</button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="w-full pb-12">
            {/* Section stat badge */}
            <div className="mb-4 flex items-center gap-2">
              <span className={`px-4 py-1 rounded-full font-semibold text-sm ${sectionColors[activeTab] || 'bg-gray-100 text-gray-600'}`}>{stats[activeTab]} {sectionLabels[activeTab]}</span>
            </div>
            <DataManager
              section={activeTab.toLowerCase().replace(/ /g, '')}
              fields={sectionFields[activeTab]}
              title={sectionLabels[activeTab]}
              refreshStats={refreshStats}
            />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default AdminDashboard; 