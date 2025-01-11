import React from 'react';
import DiffMatchPatch from 'diff-match-patch';

const TextDiffHighlighter = ({ text1, text2 }: { text1: string; text2: string }) => {
  const dmp = new DiffMatchPatch();
  const diffs = dmp.diff_main(text1, text2);

  // 정렬을 최적화
  dmp.diff_cleanupSemantic(diffs);

  // 다른 점을 강조하는 마크업 생성
  const renderDiff = () => {
    return diffs.map(([type, text], index) => {
      switch (type) {
        case DiffMatchPatch.DIFF_INSERT:
          return (
            <span key={index} style={{ backgroundColor: 'lightgreen' }}>
              {text}
            </span>
          );
        case DiffMatchPatch.DIFF_DELETE:
          return (
            <span key={index} style={{ backgroundColor: 'lightcoral', textDecoration: 'line-through' }}>
              {text}
            </span>
          );
        case DiffMatchPatch.DIFF_EQUAL:
          return <span key={index}>{text}</span>;
        default:
          return null;
      }
    });
  };

  return (
    <div>
      <div className="whitespace-pre-line leading-8">{renderDiff()}</div>
    </div>
  );
};

export default TextDiffHighlighter;
