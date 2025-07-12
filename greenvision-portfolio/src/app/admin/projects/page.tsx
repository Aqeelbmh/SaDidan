'use client';

import AdminLayout from '@/components/Admin/AdminLayout';
import DataManager from '@/components/Admin/DataManager';
import AuthWrapper from '@/components/Admin/AuthWrapper';

const ProjectsAdmin = () => {
  const fields = [
    {
      name: 'title',
      label: 'Project Title',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Portfolio Website'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Describe your project and its features'
    },
    {
      name: 'technologies',
      label: 'Technologies Used',
      type: 'array' as const,
      required: true,
      placeholder: 'Next.js, React, TypeScript, Tailwind CSS'
    },
    {
      name: 'githubUrl',
      label: 'GitHub URL',
      type: 'url' as const,
      required: false,
      placeholder: 'https://github.com/username/project'
    },
    {
      name: 'liveUrl',
      label: 'Live Demo URL',
      type: 'url' as const,
      required: false,
      placeholder: 'https://project-demo.com'
    },
    {
      name: 'imageUrl',
      label: 'Project Image URL',
      type: 'url' as const,
      required: false,
      placeholder: 'https://example.com/project-screenshot.jpg'
    }
  ];

  return (
    <AuthWrapper>
      <AdminLayout title="Projects Management" section="Projects">
        <DataManager
          section="projects"
          fields={fields}
          title="Portfolio Projects"
        />
      </AdminLayout>
    </AuthWrapper>
  );
};

export default ProjectsAdmin; 