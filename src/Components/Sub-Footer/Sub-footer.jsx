import { NavLink } from "react-router-dom"
import { FaFacebookF } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { LuInstagram } from "react-icons/lu";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import './Sub-footer.css'

const Sub_footer = () => {
  const backToTop = () => {
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  return (
    <footer className="sub-footer">
      <div className="copyrights">
        2024 | AudireX. All Rights Reserved. Built by | Hassan Mehmood
      </div>
      <div className="socials">
        <ul className="socials-tab">
          <li className="socials-item"><NavLink><FaFacebookF /></NavLink></li>
          <li className="socials-item"><NavLink><BsTwitterX /></NavLink></li>
          <li className="socials-item"><NavLink><LuInstagram /></NavLink></li>
          <li className="socials-item"><NavLink to='https://www.linkedin.com/in/hassan-mehmood-277a0129a/'><FaLinkedinIn /></NavLink></li>
          <button className="backToTop" onClick={backToTop}><MdOutlineKeyboardArrowUp /></button>
        </ul>
      </div>
    </footer>
  )
}

export default Sub_footer
