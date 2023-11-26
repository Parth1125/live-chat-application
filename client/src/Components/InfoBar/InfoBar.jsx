import "./InfoBar.css";
import closeIcon from "../../icons/x.png"
import onlineIcon from "../../icons/dot.png"

const InfoBar = ({room}) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online Image"/>
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="close Image"/></a>
      </div>
    </div>
  );
};

export default InfoBar;
