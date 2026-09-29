import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { UserDocument } from '../../features/Documents/types';
import { fetchDocuments } from '../../features/Documents/api';
import DocumentAuthenticityView from '../../features/Documents/DocumentAuthenticityView';

const DocumentAuthenticity = () => {
  const { documentId } = useParams();
  const { addNotification } = useApp();
  const [documents, setDocuments] = useState<UserDocument[]>([]);

  useEffect(() => {
    fetchDocuments().then(setDocuments);
  }, []);

  if (documents.length === 0) return null;

  const doc = documents.find((d) => d.id === documentId) ?? documents[1] ?? documents[0];

  return (
    <DocumentAuthenticityView
      doc={doc}
      onSubmitReview={() => {
        addNotification({
          type: 'info',
          title: 'Manual Review Docket Lodged',
          message: `Document ${doc.name} queued for human officer scrutiny at District Revenue Verification Cell.`,
        });
      }}
    />
  );
};

export default DocumentAuthenticity;
