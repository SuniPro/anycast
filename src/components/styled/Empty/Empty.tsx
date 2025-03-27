import { PageWrapper } from "../../layouts/Frames/FrameLayouts";
import { useWindowContext } from "../../../Context/WindowContext";
import { Logo } from "../../logo/Logo";
import styled from "@emotion/styled";
import theme from "../../../styles/theme";

export function EmptyPage() {
  const { windowWidth } = useWindowContext();

  return (
    <PageWrapper width={windowWidth} marginTop={8} gap={0}>
      <Logo width={100 * 1.3} height={100} />
      <EmptyTitle>현재 라이브 되는 방송이 없습니다.</EmptyTitle>
      <h3>방송 스케줄을 확인해주세요 !</h3>
    </PageWrapper>
  );
}

const EmptyTitle = styled.h2`
  font-size: 30px;
  font-family: ${theme.fontStyle.koPubDotumBold};
  margin-top: 50px;
`;
