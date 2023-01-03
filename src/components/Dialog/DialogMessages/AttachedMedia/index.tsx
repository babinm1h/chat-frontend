import React, { FC } from 'react';
import styled from 'styled-components';
import { IAttachment } from '../../../../types/entities';

const StImages = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  margin: 4px 0;
`;

const StImage = styled.div`
  border-radius: 8px;
  position: relative;
  background-color: #fff;
  max-width: 250px;
  max-height: 200px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const StVideo = styled.div`
  border-radius: 8px;
  position: relative;
  background-color: #fff;
  max-width: 350px;
  height: 200px;
  overflow: hidden;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface IProps {
  videos: IAttachment[];
  images: IAttachment[];
}

const AttachedMedia: FC<IProps> = ({ images, videos }) => {
  return (
    <>
      {(images.length > 0 || videos.length > 0) && (
        <StImages>
          {images.map((img) => (
            <StImage key={img.id} onContextMenu={(e) => e.stopPropagation()}>
              <img src={img.path} alt={'attached'} />
            </StImage>
          ))}
          {videos.length > 0 &&
            videos.map((v) => (
              <StVideo key={v.id}>
                <video src={v.path} controls={true} preload="metadata" />
              </StVideo>
            ))}
        </StImages>
      )}
    </>
  );
};

export default AttachedMedia;
