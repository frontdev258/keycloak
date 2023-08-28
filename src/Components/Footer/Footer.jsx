import MatnaImage from "../../assets/img/matna.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <div class="footer">
      <div class="footer__text">
        مرکز تولید نرم افزار معاونت فناوری اطلاعات آجا
      </div>
      <img
        src={MatnaImage}
        alt="مرکز تولید نرم افزار معاونت فناوری اطلاعات آجا"
        class="footer__logo"
      />
    </div>
  );
};

export default Footer;
