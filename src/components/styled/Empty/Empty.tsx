import { LogoIcon } from "../../Logo/LogoIcon";
import styled from "@emotion/styled";
import theme from "../../../styles/theme";

export function EmptyPage() {
  return (
    <Container>
      <LogoIcon width={100 * 1.3} height={100} />
      <EmptyTitle>현재 라이브 되는 방송이 없습니다.</EmptyTitle>
      <h3>방송 스케줄을 확인해주세요 !</h3>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const EmptyTitle = styled.h2`
  font-size: 30px;
  font-family: ${theme.fontStyle.koPubDotumBold};
  margin-top: 50px;
`;
