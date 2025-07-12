'use client';

import AdminLayout from '@/components/Admin/AdminLayout';
import DataManager from '@/components/Admin/DataManager';
import AuthWrapper from '@/components/Admin/AuthWrapper';

const PublicationsAdmin = () => {
  const fields = [
    {
      name: 'title',
      label: 'Paper Title',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Advanced Machine Learning Techniques'
    },
    {
      name: 'authors',
      label: 'Authors',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Your Name, Co-author Name'
    },
    {
      name: 'journal',
      label: 'Journal/Conference',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., IEEE Transactions on AI'
    },
    {
      name: 'year',
      label: 'Year',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., 2023'
    },
    {
      name: 'doi',
      label: 'DOI',
      type: 'text' as const,
      required: false,
      placeholder: 'e.g., 10.1000/example'
    },
    {
      name: 'link',
      label: 'Link',
      type: 'url' as const,
      required: false,
      placeholder: 'https://example.com/paper'
    }
  ];

  return (
    <AuthWrapper>
      <AdminLayout title="Publications Management" section="Publications">
        <DataManager
          section="publications"
          fields={fields}
          title="Research Publications"
        />
      </AdminLayout>
    </AuthWrapper>
  );
};

export default PublicationsAdmin; 