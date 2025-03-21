import "./CustomButton.css"

interface ICustomButtonProps {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
  style?: React.CSSProperties
  pressed?: boolean
} 

const CustomButton = ( { onClick, children, disabled, style, pressed }: ICustomButtonProps ) => {
  return (
    <button className={`custom-btn ${pressed ? 'pressed-btn' : ''}`}  style={{...(disabled ? {backgroundColor: '#a5d6a7'} : {}), ...style }} onClick={onClick}>{children}</button>
  )
}
export default CustomButton