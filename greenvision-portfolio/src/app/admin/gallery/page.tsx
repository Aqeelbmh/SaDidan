'use client';

import AdminLayout from '@/components/Admin/AdminLayout';
import DataManager from '@/components/Admin/DataManager';
import AuthWrapper from '@/components/Admin/AuthWrapper';

const GalleryAdmin = () => {
  const fields = [
    {
      name: 'title',
      label: 'Image Title',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Project Screenshot'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Describe the image or project'
    },
    {
      name: 'imageUrl',
      label: 'Image URL',
      type: 'url' as const,
      required: true,
      placeholder: 'https://example.com/image.jpg'
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      required: true,
      options: ['projects', 'awards', 'certificates', 'other']
    }
  ];

  return (
    <AuthWrapper>
      <AdminLayout title="Gallery Management" section="Gallery">
        <DataManager
          section="gallery"
          fields={fields}
          title="Portfolio Gallery"
        />
      </AdminLayout>
    </AuthWrapper>
  );
};

export default GalleryAdmin; 