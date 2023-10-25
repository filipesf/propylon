/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AriaButtonOptions, useButton } from '@react-aria/button';
import { PressEvents, usePress } from '@react-aria/interactions';
import { PropsWithChildren, useRef } from 'react';

interface ButtonProps extends PropsWithChildren<AriaButtonOptions<'button'>> {
  isActive?: boolean;
  onClick?: () => void;
}

const baseStyles = css`
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 5px;
  width: 100%;
  padding: 5px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.87);
`;

const activeStyles = css`
  background-color: lightgray;
`;

const Button: React.FC<ButtonProps> = ({
  children,
  isActive,
  onClick,
  ...restProps
}) => {
  const ref = useRef<Element>(null);

  const { buttonProps } = useButton({ ...restProps, onPress: onClick }, ref);
  const { pressProps } = usePress({
    onPress: onClick as PressEvents['onPress'],
  });

  const buttonStyles = [baseStyles, isActive && activeStyles];

  return (
    <button css={buttonStyles} {...restProps} {...buttonProps} {...pressProps}>
      {children}
    </button>
  );
};

export default Button;
