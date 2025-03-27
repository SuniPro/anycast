/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import { Logo } from "../logo/Logo";
import styled from "@emotion/styled";
import { MessageCircleIcon, SearchIcon } from "../styled/icons";
import { useWindowContext } from "../../Context/WindowContext";
import { FuncIconItem } from "../styled/Button/Button";
import { useCallback, useState } from "react";
import { useSearchContext } from "../../Context/SearchContext";
import { debounce } from "lodash";
import EventNoteIcon from "@mui/icons-material/EventNote";

export function Header() {
  const { windowWidth } = useWindowContext();
  const [active, setActive] = useState(false);

  return (
    <HeaderWrapper>
      <LogoContainer width={35 * 1.3} height={50}>
        <Logo width={35 * 1.3} height={35} />
      </LogoContainer>
      <SearchBar width={windowWidth / 3} height={35} />
      <div
        css={css`
          display: flex;
          flex-direction: row;
          gap: 6px;

          li {
            list-style: none;
            padding: 0;
            margin: 0;
          }
        `}
      >
        <li>
          <FuncIconItem
            func={() => setActive((prev) => !prev)}
            icon={<EventNoteIcon />}
            isActive={active}
            label={<></>}
          />
        </li>
        <li>
          <FuncIconItem
            func={() => setActive((prev) => !prev)}
            icon={<MessageCircleIcon />}
            isActive={active}
            label={<></>}
          />
        </li>
      </div>
    </HeaderWrapper>
  );
}

export const HeaderRightFuncUnorderedList = styled.ul<{
  size: { width: number; height: number };
}>(
  ({ size }) => css`
    font-family: ${theme.defaultTheme.font.header.menuItem};
    ${theme.flexLayout.row}
    justify-content: space-evenly;

    svg {
      width: ${size.width}px;
      height: ${size.height}px;
    }

    button {
      height: 100%;
    }
  `,
);

export const LogoContainer = styled.div<{ width: number; height: number }>(
  ({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `,
);

export const HeaderWrapper = styled.header`
  // 항상 하위요소들의 최상위에 존재하기 위해 z-index를 추가합니다.
  height: 70px;
  z-index: 1;
  top: 0;
  position: fixed;
  width: 100%;
  box-sizing: border-box;

  background-color: ${theme.defaultTheme.cardBackground};
  padding: 10px 2rem;

  ${theme.flexLayout.row}
  justify-content: space-between;
  align-items: center;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    gap: 10px;

    li {
      padding: 0;
    }
  }

  @media ${theme.deviceSize.phone} {
    top: 0;
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    ${theme.flexLayout.column}
    ${theme.flexLayout.center}
        ul {
      margin-top: 10px;
    }
  }
`;

export const debounceHandler = debounce(
  (value: string, callback: (value: string) => void) => {
    callback(value);
  },
  300, // 딜레이 시간(ms)
);

export function SearchBar(props: { width: number; height: number }) {
  const { width, height } = props;
  const { setSearchValue } = useSearchContext();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debounceHandler(e.target.value, setSearchValue);
  }, []);

  return (
    <SearchContainer width={width} height={height}>
      <SearchArea onChange={handleChange} type="text" placeholder="Search" />
      <SearchButton>
        <SearchIcon width={30} height={30} />
      </SearchButton>
    </SearchContainer>
  );
}

const SearchContainer = styled.div<{ width: number; height: number }>(
  ({ width, height }) => css`
        width: ${width}px;
        height: ${height}px;
        display: flex;
        flex-direction: row;

        align-items: center;
        justify-content: center;
        gap: 5px;

        &:hover {
            input {
                border: 0.3mm solid ${theme.defaultTheme.hoverEffect};
            }

            svg {
                fill: ${theme.defaultTheme.hoverEffect};
            }

            path {
                fill: ${theme.defaultTheme.hoverEffect};
            }
        }

        &:active {
            input {
                border: 0.3mm solid ${theme.defaultTheme.hoverEffect};
            }

            svg {
                fill: ${theme.defaultTheme.hoverEffect};
            }

            path {
                fill: ${theme.defaultTheme.hoverEffect};
            }
        }

        &:focus {
            input {
                border: 0.3mm solid ${theme.defaultTheme.hoverEffect};
            }

            svg {
                fill: ${theme.defaultTheme.hoverEffect};
            }

            path {
                fill: ${theme.defaultTheme.hoverEffect};
            }
    `,
);

const SearchArea = styled.input`
  width: 100%;
  height: 100%;
  padding: 2px 10px;
  border-radius: 18px;
  border: 0.3mm solid ${theme.defaultTheme.textSecondary};
`;

const SearchButton = styled.div`
  border-radius: 50%;
  width: 35px;
  height: 35px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
`;
