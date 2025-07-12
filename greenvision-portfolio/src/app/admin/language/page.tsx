'use client';

import AdminLayout from '@/components/Admin/AdminLayout';
import DataManager from '@/components/Admin/DataManager';
import AuthWrapper from '@/components/Admin/AuthWrapper';

const LanguageAdmin = () => {
  const fields = [
    {
      name: 'name',
      label: 'Language/Skill Name',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., JavaScript, Python, React'
    },
    {
      name: 'proficiency',
      label: 'Proficiency Level (0-100)',
      type: 'number' as const,
      required: true,
      placeholder: '90'
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      required: true,
      options: ['Programming', 'Framework', 'Language', 'Tool', 'Database', 'Other']
    }
  ];

  return (
    <AuthWrapper>
      <AdminLayout title="Language Skills Management" section="Language Skills">
        <DataManager
          section="language"
          fields={fields}
          title="Language & Technical Skills"
        />
      </AdminLayout>
    </AuthWrapper>
  );
};

export default LanguageAdmin; 