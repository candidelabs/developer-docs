import React from 'react';
import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import LLMToolsButton from '@site/src/components/LLMToolsButton';

export default function DocBreadcrumbsWrapper(props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
      <OriginalDocBreadcrumbs {...props} />
      <LLMToolsButton />
    </div>
  );
}
