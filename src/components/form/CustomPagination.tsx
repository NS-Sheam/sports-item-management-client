import { Pagination } from "antd";

type CustomPaginationProps = {
  page: number;
  setPage: (value: number) => void;
  total: number;
  pageSize: number;
  style?: React.CSSProperties;
  [key: string]: any;
};

const CustomPagination = ({ page, setPage, total, pageSize, style, ...rest }: CustomPaginationProps) => {
  return (
    <Pagination
      {...rest}
      style={style}
      current={page}
      onChange={(value) => setPage(value)}
      total={total}
      pageSize={pageSize}
    />
  );
};

export default CustomPagination;
