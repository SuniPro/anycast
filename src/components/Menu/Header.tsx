/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import theme from "../../styles/theme";
import { Logo } from "../Logo/Logo";
import styled from "@emotion/styled";
import { SearchIcon } from "../styled/icons";
import { useWindowContext } from "../../Context/WindowContext";
import { FuncIconItem } from "../styled/Button/Button";
import { ChangeEvent, useCallback, useState } from "react";
import { useSearchContext } from "../../Context/SearchContext";
import { debounce } from "lodash";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorAlert } from "../Alert/Alerts";
import { Modal } from "@mui/material";
import { useProportionHook } from "../../hooks/useWindowHooks";
import { ScreenInfo } from "../Auditorium/ScreenArea";
import { useQuery } from "@tanstack/react-query";
import { getAllLeague } from "../../api/streaming";
import { HorizontalDivider } from "../layouts/Layouts";

export function Header() {
  const { windowWidth } = useWindowContext();
  const [scheduleListOpen, setScheduleListOpen] = useState(false);
  const navigate = useNavigate();

  const isDeskTop = windowWidth > theme.windowSize.tablet;

  return (
    <HeaderWrapper>
      <LogoContainer width={40 * 1.3} height={40} onClick={() => navigate("/")}>
        {isDeskTop ? (
          <span
            css={css`
              white-space: nowrap;
              color: ${theme.colors.honeyHaze};
              font-family: ${theme.fontStyle.poppins};
              font-weight: 700;
              font-size: 28px;
              transform: translateY(0%);
              letter-spacing: -0.07em;
            `}
          >
            anycast
          </span>
        ) : (
          <Logo width={40 * 1.3} height={40} />
        )}
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
        <ModalContainer width={size}>
          {sortedLeagueList.map((leagueInfo) => (
            <>
              <ScreenInfo leagueInfo={leagueInfo} dateSize={16} />
              <HorizontalDivider />
            </>
          ))}
        </ModalContainer>
      </>
    </Modal>
  );
}

export const LogoContainer = styled.div<{ width: number; height: number }>(
  ({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
    gap: 4px;
    align-items: center;
    ${theme.flexLayout.row}
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
`;

export const debounceHandler = debounce(
  (value: string, callback: (_value: string) => void) => {
    callback(value);
  },
  300, // 딜레이 시간(ms)
);

export function SearchBar(props: { width: number; height: number }) {
  const { width, height } = props;
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
    <SearchContainer width={width} height={height}>
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
      />
      <SearchButton>
        <StyledSearchIcon
          isActive={searchValue.length !== 0}
          width={30}
          height={30}
        />
      </SearchButton>
    </SearchContainer>
  );
}

const StyledSearchIcon = styled(SearchIcon)<{ isActive: boolean }>(
  ({ isActive }) => css`
    path {
      fill: ${isActive && theme.defaultTheme.hoverEffect} !important;
    }
  `,
);

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

            svg > path {
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

const SearchArea = styled.input<{ isActive: boolean }>(
  ({ isActive }) => css`
    width: 100%;
    height: 100%;
    padding: 2px 10px;
    border-radius: 18px;
    border: 0.3mm solid
      ${isActive
        ? theme.defaultTheme.hoverEffect
        : theme.defaultTheme.textSecondary};
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

export const ModalContainer = styled.div<{ width: number }>(
  ({ width }) => css`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${width}px;
    border: 3px solid ${theme.defaultTheme.buttonHoverBackground};
    border-radius: ${theme.borderRadius.softBox};
    box-shadow: 24px;
    color: ${theme.defaultTheme.textPrimary};
    background-color: ${theme.defaultTheme.cardBackground};
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
