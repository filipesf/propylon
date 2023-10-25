import { Document, Chapter } from 'shared/types';

const buildChaptersTree = (flatData: Document[]): Chapter[] => {
  const chapterMap = new Map<string, Chapter>();

  flatData.forEach((item) => {
    chapterMap.set(item.id, {
      id: item.id,
      name: item.name,
      level: item.level,
      content: item.content || '',
      parent_id: item.parent_id || '',
      subChapters: [],
    });
  });

  flatData.forEach((item) => {
    if (item.parent_id) {
      const parentChapter = chapterMap.get(item.parent_id);
      const currentChapter = chapterMap.get(item.id);

      if (parentChapter && currentChapter) {
        parentChapter.subChapters.push(currentChapter);
      }
    }
  });

  const rootChapters: Chapter[] = [];
  flatData.forEach((item) => {
    if (!item.parent_id) {
      const rootChapter = chapterMap.get(item.id);
      if (rootChapter) {
        rootChapters.push(rootChapter);
      }
    }
  });

  return rootChapters;
};

export default buildChaptersTree;
