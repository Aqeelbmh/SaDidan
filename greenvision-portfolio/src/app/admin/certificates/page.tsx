'use client';

import AdminLayout from '@/components/Admin/AdminLayout';
import DataManager from '@/components/Admin/DataManager';
import AuthWrapper from '@/components/Admin/AuthWrapper';

const CertificatesAdmin = () => {
  const fields = [
    {
      name: 'title',
      label: 'Certificate Title',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., AWS Certified Developer'
    },
    {
      name: 'issuer',
      label: 'Issuing Organization',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Amazon Web Services'
    },
    {
      name: 'date',
      label: 'Issue Date',
      type: 'text' as const,
      required: true,
      placeholder: 'YYYY-MM-DD'
    },
    {
      name: 'credentialId',
      label: 'Credential ID',
      type: 'text' as const,
      required: false,
      placeholder: 'e.g., AWS-123456'
    },
    {
      name: 'imageUrl',
      label: 'Certificate Image URL',
      type: 'url' as const,
      required: false,
      placeholder: 'https://example.com/certificate.png'
    },
    {
      name: 'link',
      label: 'Verification Link',
      type: 'url' as const,
      required: false,
      placeholder: 'https://aws.amazon.com/certification/'
    }
  ];

  return (
    <AuthWrapper>
      <AdminLayout title="Certificates Management" section="Certificates">
        <DataManager
          section="certificates"
          fields={fields}
          title="Professional Certificates"
        />
      </AdminLayout>
    </AuthWrapper>
  );
};

export default CertificatesAdmin; 