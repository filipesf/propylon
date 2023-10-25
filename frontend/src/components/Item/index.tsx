/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useAppContext } from 'utils/context';
import { Chapter } from 'shared/types';
import { Arrow } from 'components/Icons';
import Button from 'components/Button';

interface ItemProps {
  chapter: Chapter;
  isExpanded?: boolean;
}

const itemStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  overflow: hidden;
  font-feature-settings: 'clig' off, 'liga' off;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.15px;
`;

const itemIconStyles = css`
  display: block;
  height: 16px;
  width: 16px;
  transform: rotate(0deg);
`;

const itemIconExpandedStyles = css`
  transform: rotate(90deg);
`;

const itemContentStyles = css`
  all: unset;
  width: 100%;
`;

const subItemStyles = css`
  padding-left: 16px;
`;

const Item = ({ chapter, isExpanded: isExpandedProp }: ItemProps) => {
  const { id, name, subChapters } = chapter;
  const hasSubchapters = subChapters.length > 0;

  const [isExpanded, setIsExpanded] = useState<boolean>(
    isExpandedProp || false,
  );
  const { activeItem, setActiveItem } = useAppContext();

  const itemId = `item-${id}`;
  const subItemId = `subitem-${id}`;

  const isActive = itemId === activeItem;

  const activateCurrentItem = () => {
    if (hasSubchapters) {
      setIsExpanded(!isExpanded);
    }

    setActiveItem(itemId);
  };

  const buttonProps = {
    id: itemId,
    'aria-expanded': isExpanded,
    'aria-controls': subItemId,
    onClick: activateCurrentItem,
  };

  const shouldExpandItem = (itemLevel: number) =>
    itemLevel === 1 || itemLevel === 2;

  return (
    <div css={itemStyles}>
      <h3 css={itemContentStyles}>
        <Button isActive={isActive} {...buttonProps}>
          <span css={[itemIconStyles, isExpanded && itemIconExpandedStyles]}>
            <Arrow />
          </span>

          {name}
        </Button>
      </h3>

      {hasSubchapters && isExpanded && (
        <div
          css={subItemStyles}
          id={subItemId}
          aria-labelledby={itemId}
          role="region">
          {subChapters.map((subChapter, i) => (
            <Item
              key={i}
              chapter={subChapter}
              isExpanded={shouldExpandItem(subChapter.level)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Item;
