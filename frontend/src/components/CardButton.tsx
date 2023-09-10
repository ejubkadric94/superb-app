import { Card } from "antd";

type Props = {
  title: string;
  onClick: () => void;
} & React.ComponentProps<typeof Card>;

const CardButton: React.FC<Props> = ({ title, onClick, ...props }) => {
  return (
    <Card
      tabIndex={0}
      hoverable
      role="button"
      title={title}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          onClick();
        }
      }}
      {...props}
    />
  )
}

export default CardButton;
