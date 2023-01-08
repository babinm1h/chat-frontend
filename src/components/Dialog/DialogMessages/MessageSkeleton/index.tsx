import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

interface IProps {
  background: string;
  idx: number;
}

const MessageSkeleton: FC<IProps> = ({ background, idx }) => {
  const height = idx % 2 ? 50 : 80;

  return (
    <ContentLoader
      speed={2}
      width={150}
      height={height}
      viewBox={`0 0 150 ${height}`}
      foregroundColor="#ccc"
      backgroundColor={background}
      style={{ borderRadius: '8px', boxShadow: `0 1px 2px rgba(0, 0, 0, 0.25)` }}
    >
      <rect x="0" y="0" rx="4" ry="4" width="300" height="250" />
    </ContentLoader>
  );
};

export default MessageSkeleton;
