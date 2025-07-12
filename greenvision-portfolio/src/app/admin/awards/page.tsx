'use client';

import AdminLayout from '@/components/Admin/AdminLayout';
import DataManager from '@/components/Admin/DataManager';
import AuthWrapper from '@/components/Admin/AuthWrapper';

const AwardsAdmin = () => {
  const fields = [
    {
      name: 'title',
      label: 'Award Title',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Best Developer Award'
    },
    {
      name: 'organization',
      label: 'Organization',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Tech Conference 2023'
    },
    {
      name: 'year',
      label: 'Year',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., 2023'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Describe the award and recognition'
    }
  ];

  return (
    <AuthWrapper>
      <AdminLayout title="Awards Management" section="Awards">
        <DataManager
          section="awards"
          fields={fields}
          title="Awards & Recognition"
        />
      </AdminLayout>
    </AuthWrapper>
  );
};

export default AwardsAdmin; 