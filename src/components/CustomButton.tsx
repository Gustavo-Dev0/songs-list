import "./CustomButton.css"

interface ICustomButtonProps {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
} 

const CustomButton = ( { onClick, children, disabled }: ICustomButtonProps ) => {
  return (
    <button className="custom-button"  style={disabled ? {backgroundColor: '#a5d6a7'} : {} } onClick={onClick}>{children}</button>
  )
}
export default CustomButton