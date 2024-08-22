import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:disabled::before {
    content: "";
    width: 1.6rem;
    height: 1.6rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid #fff;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-right: 0.8rem;
  }
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
