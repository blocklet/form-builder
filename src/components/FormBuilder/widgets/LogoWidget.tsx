import React from 'react';
import useSearchParam from 'react-use/lib/useSearchParam';

export const LogoWidget: React.FC = () => {
  // @ts-ignore
  const title = useSearchParam('title') || window.blocklet?.appName || 'Form Builder';
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
      <h3>{title}</h3>
    </div>
  );
};
