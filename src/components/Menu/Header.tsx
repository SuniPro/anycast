/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from "@emotion/react";
import { LogoIcon, LogoText } from "../Logo/LogoIcon";
import styled from "@emotion/styled";
import { SearchIcon } from "../styled/icons";
import { useWindowContext } from "../../Context/WindowContext";
import { FuncIconItem } from "../styled/Button/Button";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { useSearchContext } from "../../Context/SearchContext";
import { debounce } from "lodash";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorAlert } from "../Alert/Alerts";
import { Modal } from "@mui/material";
import { useProportionHook } from "../../hooks/useWindowHooks";
import { ScreenInfo } from "../Auditorium/ScreenArea";
import { useQuery } from "@tanstack/react-query";
import { getAllLeague } from "../../api/streaming";
import { HorizontalDivider } from "../layouts/Layouts";
import { useCursor } from "../../Context/CursorContext";

export function Header(props: {
  darkState: {
    darkMode: boolean;
    setDarkMode: Dispatch<SetStateAction<boolean>>;
  };
}) {
  const { darkMode, setDarkMode } = props.darkState;
  const theme = useTheme();

  const { windowWidth } = useWindowContext();
  const { setIsPointer } = useCursor();
  const [scheduleListOpen, setScheduleListOpen] = useState(false);
  const navigate = useNavigate();

  const isDeskTop = windowWidth > theme.windowSize.tablet;

  return (
    <HeaderWrapper theme={theme}>
      <LogoContainer
        width={40 * 1.3}
        height={40}
        onClick={() => navigate("/")}
        theme={theme}
        onMouseEnter={() => setIsPointer(true)}
        onMouseLeave={() => setIsPointer(false)}
      >
        {isDeskTop ? <LogoText /> : <LogoIcon width={40 * 1.3} height={40} />}
      </LogoContainer>
      <SearchBar width={windowWidth / 2} height={35} />
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
            func={() => setScheduleListOpen((prev) => !prev)}
            icon={<EventNoteIcon />}
            isActive={scheduleListOpen}
            label={<></>}
          />
        </li>
        <li>
          <FuncIconItem
            func={() => setDarkMode((prev) => !prev)}
            isActive={false}
            icon={
              darkMode ? (
                <NightlightRoundIcon sx={{ color: "yellow" }} />
              ) : (
                <Brightness5Icon color="warning" />
              )
            }
            label={<></>}
          />
        </li>
      </div>
      <ScheduleListModal
        open={scheduleListOpen}
        close={() => setScheduleListOpen(false)}
      />
    </HeaderWrapper>
  );
}

export function ScheduleListModal(props: { open: boolean; close: () => void }) {
  const { open, close } = props;
  const theme = useTheme();

  const { windowWidth } = useWindowContext();
  const { size } = useProportionHook(
    windowWidth,
    1000,
    theme.windowSize.tablet,
  );

  const { data: leagueList } = useQuery({
    queryKey: ["getAllLeague"],
    queryFn: () => getAllLeague(),
    refetchInterval: 10000,
  });
  if (!leagueList) return;

  const sortedLeagueList = leagueList.sort((a, b) => {
    const aDate = new Date(a.leagueDate).getTime();
    const bDate = new Date(b.leagueDate).getTime();
    return bDate - aDate;
  });

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <ModalContainer width={size} theme={theme}>
          {sortedLeagueList.map((leagueInfo) => (
            <>
              <ScreenInfo leagueInfo={leagueInfo} dateSize={16} />
              <HorizontalDivider theme={theme} />
            </>
          ))}
        </ModalContainer>
      </>
    </Modal>
  );
}

export const LogoContainer = styled.div<{
  theme: Theme;
  width: number;
  height: number;
}>(
  ({ theme, width, height }) => css`
    width: ${width}px;
    height: ${height}px;
    gap: 4px;
    align-items: center;
    ${theme.flexLayout.row}
  `,
);

export const HeaderWrapper = styled.header<{ theme: Theme }>(
  ({ theme }) => css`
    // 항상 하위요소들의 최상위에 존재하기 위해 z-index를 추가합니다.
    height: 70px;
    z-index: 1;
    top: 0;
    position: fixed;
    width: 100%;
    box-sizing: border-box;

    background-color: ${theme.mode.bodyBackground};
    padding: 10px 2rem;

    ${theme.flexLayout.row}
    flex-wrap: nowrap;
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
  `,
);

export const debounceHandler = debounce(
  (value: string, callback: (_value: string) => void) => {
    callback(value);
  },
  300, // 딜레이 시간(ms)
);

export function SearchBar(props: { width: number; height: number }) {
  const { width, height } = props;
  const theme = useTheme();
  const locate = useLocation();
  const { searchValue, setSearchValue } = useSearchContext();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debounceHandler(e.target.value, setSearchValue);
    },
    [setSearchValue],
  );

  const inAuditorium = locate.pathname.includes("auditorium");

  return (
    <SearchContainer width={width} height={height} theme={theme}>
      <SearchArea
        onChange={handleChange}
        onClick={() => {
          if (inAuditorium) {
            ErrorAlert("검색 기능은 현재 메인화면에서만 동작합니다.");
          }
        }}
        readOnly={inAuditorium}
        type="text"
        placeholder="Search"
        isActive={searchValue.length !== 0}
        theme={theme}
      />
      <SearchButton>
        <StyledSearchIcon
          isActive={searchValue.length !== 0}
          width={30}
          height={30}
          theme={theme}
        />
      </SearchButton>
    </SearchContainer>
  );
}

const StyledSearchIcon = styled(SearchIcon)<{
  theme: Theme;
  isActive: boolean;
}>(
  ({ theme, isActive }) => css`
    path {
      fill: ${isActive
        ? theme.mode.hoverEffect
        : theme.mode.inputBorder} !important;
    }
  `,
);

const SearchContainer = styled.div<{
  width: number;
  height: number;
  theme: Theme;
}>(
  ({ width, height, theme }) => css`
        width: ${width}px;
        height: ${height}px;
        display: flex;
        flex-direction: row;

        align-items: center;
        justify-content: center;
        gap: 5px;

        &:hover {
            input {
                border: 2px solid
                ${theme.mode.hoverEffect};
            }

            svg > path {
                fill: ${theme.mode.hoverEffect};
            }

            path {
                fill: ${theme.mode.hoverEffect};
            }
        }

        &:active {
            input {
                border: 2px solid
                ${theme.mode.hoverEffect};
            }

            svg {
                fill: ${theme.mode.hoverEffect};
            }

            path {
                fill: ${theme.mode.hoverEffect};
            }
        }

        &:focus {
            input {
                border: 2px solid
                ${theme.mode.hoverEffect};
            }

            svg {
                fill: ${theme.mode.hoverEffect};
            }

            path {
                fill: ${theme.mode.hoverEffect};
            }
    `,
);

const SearchArea = styled.input<{ isActive: boolean; theme: Theme }>(
  ({ isActive, theme }) => css`
    width: 100%;
    height: 100%;
    padding: 2px 18px;
    border-radius: 18px;
    font-size: 14px;
    background-color: ${theme.mode.cardBackground};
    font-family: ${theme.mode.font.search};
    color: ${theme.mode.textPrimary};
    border: 2px solid
      ${isActive ? theme.mode.hoverEffect : theme.mode.inputBorder};

    &:focus-visible {
      outline: none;
    }
  `,
);

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

export const ModalContainer = styled.div<{ width: number; theme: Theme }>(
  ({ width, theme }) => css`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${width}px;
    border: 3px solid ${theme.mode.buttonHoverBackground};
    border-radius: ${theme.borderRadius.softBox};
    box-shadow: 24px;
    color: ${theme.mode.textPrimary};
    background-color: ${theme.mode.cardBackground};
    height: 60%;
    overflow-x: visible;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 20px;

    display: flex;
    flex-direction: column;
    gap: 30px;
  `,
);
