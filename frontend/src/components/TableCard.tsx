import { Card, Col } from "antd";
import {ReactComponent as ForkAndKnife} from '../svgs/ForkAndKnife.svg'
import { Table } from "../typescript/types";
import CardButton from "./CardButton";
import { useNavigate } from "react-router-dom";

type Props = {
  table: Table;
}

const TableCard = ({ table }: Props) => {
  const navigate = useNavigate();

  return (
    <Col span={8} xs={24} sm={12} md={8} lg={6}>
      <CardButton
        onClick={() => navigate(`/table/${table.tableNumber}`)}
        title={`Table ${table.tableNumber}`}
        bordered
      >
        <ForkAndKnife />
      </CardButton>
    </Col>
  );
};

export default TableCard;
