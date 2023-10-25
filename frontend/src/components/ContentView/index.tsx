/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Document } from 'shared/types';
import { useAppContext } from 'utils/context';
import { activeStyles } from 'shared/styles';

interface ContentViewProps {
  content: Document[];
}

const containerStyles = css`
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  border: 1px solid var(--surface-300, #e0e0e0);
`;

const titleStyles = css`
  margin: 0;
  font-size: 23.04px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
`;

const chapterStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 8px;
  width: 100%;
`;

const contentStyles = css`
  margin: 0;
  align-self: stretch;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
`;

const ContentView = ({ content }: ContentViewProps) => {
  const { activeItem, setActiveItem } = useAppContext();
  const isItemActive = (currentItem: string) =>
    activeItem === `item-${currentItem}`;

  return (
    <div css={containerStyles}>
      {content.map((doc, i) => (
        <section
          css={[chapterStyles, isItemActive(doc.id) && activeStyles]}
          onClick={() => setActiveItem(`item-${doc.id}`)}
          id={`chapter-${doc.id}`}
          key={i}>
          <h1 css={titleStyles}>{doc.name}</h1>
          <p css={contentStyles}>{doc.content}</p>
        </section>
      ))}
    </div>
  );
};

export default ContentView;
