/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useId } from '@react-aria/utils';
import { Document } from 'shared/types';
import { useAppContext } from 'utils/context';
import buildChaptersTree from 'utils/buildChaptersTree';
import Item from 'components/Item';

interface ContentTreeProps {
  content: Document[];
}

const baseStyles = css`
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  max-width: 232px;
  border: 1px solid var(--surface-300, #e0e0e0);
`;

const ContentTree = ({ content }: ContentTreeProps) => {
  const treeId = useId();
  const chaptersTree = buildChaptersTree(content);

  const { setActiveItem } = useAppContext();
  const firstChapter = chaptersTree[0].id;

  useEffect(() => {
    setActiveItem(`item-${firstChapter}`);
  }, [firstChapter, setActiveItem]);

  const shouldExpandItem = (currentItem: string) =>
    `item-${currentItem}` === `item-${firstChapter}`;

  return (
    <div css={baseStyles} id={`tree-${treeId}`}>
      {chaptersTree.map((chapter, i) => (
        <Item
          key={i}
          chapter={chapter}
          isExpanded={shouldExpandItem(chapter.id)}
        />
      ))}
    </div>
  );
};

export default ContentTree;
