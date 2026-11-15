import React from 'react';
import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import LLMToolsButton from '@site/src/components/LLMToolsButton';

// Set `hide_breadcrumbs: true` in a page's front matter to drop the
// breadcrumbs and the Copy Page button (used on the landing page).
export default function DocBreadcrumbsWrapper(props) {
  const { frontMatter } = useDoc();
  if (frontMatter.hide_breadcrumbs) {
    return null;
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
      <OriginalDocBreadcrumbs {...props} />
      <LLMToolsButton />
    </div>
  );
}
