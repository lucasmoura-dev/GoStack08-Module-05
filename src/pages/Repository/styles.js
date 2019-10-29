import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
    width: 100%;
  }

  a {
    color: #7159c1;
    font-size: 20px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueHeader = styled.div`
  display: flex;
  padding-top: 10px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  margin-bottom: 10px;
  justify-content: left;
`;

export const IssueFooter = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

export const PageCount = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #666;
  line-height: 1.4;
  text-align: center;
`;

export const PaginationButton = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.disabled,
}))`
  background: transparent;
  border: solid 1px #7159c1;
  padding: 10px 15px;
  color: #7159c1;
  background: #fff;
  border-radius: 4px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
    border: 0;
  }

  &:not([disabled]):hover {
    background: #7159c1;
    color: #fff;
  }

  & + & {
    margin-left: 5px;
  }
`;

export const IssueState = styled.select`
  background: #fff;
  border-radius: 4px;
  font-size: 16px;
  border: 1px solid #7159c1;
  padding: 10px 15px;
  flex: 0;
  color: #7159c1;
`;

export const IssueList = styled.ul`
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;
