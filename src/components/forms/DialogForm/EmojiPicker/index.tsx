import React, { FC } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import styled from 'styled-components';
import { EmojiIcon } from '../../../../assets/icons';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';

const EmojiBtn = styled.button`
  position: relative;
  em-emoji-picker {
    position: absolute;
    bottom: 0;
    z-index: 11;
  }
  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

interface IProps {
  handleEmoji: (emoji: string) => void;
}

const EmojiPicker: FC<IProps> = ({ handleEmoji }) => {
  const { isVisible, onToggleVisible, ref } = useOutsideClick(false);

  return (
    <EmojiBtn ref={ref}>
      <span onClick={onToggleVisible} role="button">
        <EmojiIcon size={22} />
      </span>
      {isVisible ? (
        <Picker
          className="emoji-picker"
          data={data}
          onEmojiSelect={(e: any) => handleEmoji(e.native)}
          theme={`dark`}
          emojiSize={18}
          emojiButtonSize={30}
          previewPosition={'none'}
        />
      ) : null}
    </EmojiBtn>
  );
};

export default EmojiPicker;
