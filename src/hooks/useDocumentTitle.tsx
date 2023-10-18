import { useEffect } from 'react';

interface useDocumentTitleProps {
  language: string;
  frenchTitle: string;
  englishTitle: string;
}

const useDocumentTitle = ({
  language,
  frenchTitle,
  englishTitle,
}: useDocumentTitleProps) => {
  useEffect(() => {
    document.title = language === 'french' ? frenchTitle : englishTitle;
  }, [language, englishTitle, frenchTitle]);

  return null;
};

export default useDocumentTitle;
