'use client';

import AdminLayout from '@/components/Admin/AdminLayout';
import DataManager from '@/components/Admin/DataManager';
import AuthWrapper from '@/components/Admin/AuthWrapper';

const TimelineAdmin = () => {
  const fields = [
    {
      name: 'year',
      label: 'Year',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., 2023'
    },
    {
      name: 'title',
      label: 'Position/Title',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Software Engineer'
    },
    {
      name: 'company',
      label: 'Company/Organization',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Tech Company Inc.'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Describe your role and achievements'
    },
    {
      name: 'icon',
      label: 'Icon (Emoji)',
      type: 'text' as const,
      required: false,
      placeholder: 'e.g., 💼 🎓 🏆'
    }
  ];

  return (
    <AuthWrapper>
      <AdminLayout title="Timeline Management" section="Timeline">
        <DataManager
          section="timeline"
          fields={fields}
          title="Career Timeline"
        />
      </AdminLayout>
    </AuthWrapper>
  );
};

export default TimelineAdmin; 