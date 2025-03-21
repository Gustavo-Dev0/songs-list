import "./TopBar.css"
import AccountCircle from"./../../assets/icons/account_circle.svg"
import Logo from"./../../assets/songs-list-logo.webp"
import CustomButton from "./../iu/CustomButton"

const TopBar = () => {
  return (
    <header>
      {/* <h1>TopBar</h1> */}
      <img className="logo" src={Logo} style={{paddingLeft: '16px'}} alt='list_music' width={250} height={40} />
      <ul className="menu-container">
        <li>
          <CustomButton disabled onClick={()=>{}}>Iniciar sesión</CustomButton>
        </li>
        <li>
          <img src={AccountCircle} alt='list_music' width={40} />
        </li>
      </ul>
    </header>
  )
}
export default TopBar