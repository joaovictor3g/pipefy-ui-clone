import styled, { css } from 'styled-components';

interface LabelProps {
  color: string;
}

interface ContainerProps {
  isDragging: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  background: #FFF;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 236, 245, 0.4);;
  font-weight: 500;
  cursor: grab;

  header {
    position: absolute;
    top: -22px;
    left: 20px;
  }

  p {
    line-height: 20px;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    margin-top: 2px;
  }

  ${props => props.isDragging && css`
    border: 2px dashed rgba(0, 0, 0, 0.2);
    padding-top: 31px;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    cursor: grabbing;

    p, img, header {
      opacity: 0;
    }
  `}
`;

export const Label = styled.label<LabelProps>`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
  background: ${props => props.color};
`;