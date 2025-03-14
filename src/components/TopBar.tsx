import "./TopBar.css"
import AccountCircle from"./../assets/account_circle.svg"
import Logo from"./../assets/songs-list-logo.webp"
import CustomButton from "./CustomButton"

const TopBar = () => {
  return (
    <header>
      {/* <h1>TopBar</h1> */}
      <img src={Logo} style={{paddingLeft: '16px'}} alt='list_music' width={250} height={50} />
      <ul className="menu-container">
        <li>
          <CustomButton disabled onClick={()=>{}}>Inicar sesión</CustomButton>
        </li>
        <li>
          <img src={AccountCircle} alt='list_music' width={40} />
        </li>
      </ul>
    </header>
  )
}
export default TopBar