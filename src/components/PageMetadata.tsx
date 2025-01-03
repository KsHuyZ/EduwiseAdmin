import { Helmet } from 'react-helmet-async';

interface PageMetadataProps {
  title?: string;
}

const PageMetadata: React.FC<PageMetadataProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title ? `${title} -` : ''} DreamLMS</title>
    </Helmet>
  );
};

export default PageMetadata;
