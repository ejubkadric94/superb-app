import { Card } from "antd"

type Props = {
  title: string
  onClick?: () => void
} & React.ComponentProps<typeof Card>

const CardButton: React.FC<Props> = ({ title, onClick = () => {}, hoverable, ...props }) => {
  return (
    <Card
      tabIndex={0}
      hoverable={hoverable}
      role="button"
      title={title}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          onClick()
        }
      }}
      {...props}
    />
  )
}

export default CardButton
