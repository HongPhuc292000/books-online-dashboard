import { memo } from "react";
import { withLoading } from "app/components/HOC/withLoadingPage";
import MainWrap from "app/components/Layouts/MainWrap";
import { useLoading } from "app/hooks/useLoading";

interface SaleFiguresProps {
  setLoading: Function;
}

const SaleFigures = memo(({ setLoading }: SaleFiguresProps) => {
  const { showLoading, hideLoading } = useLoading({ setLoading });
  return <MainWrap>Donanh số</MainWrap>;
});

export default withLoading(SaleFigures);
