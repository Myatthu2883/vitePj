import { alertBtnhandler, Btnhandler } from "./handlers.js";
import { alertBtn, Btn } from "./selectors.js";

const listener = () => {
    Btn.addEventListener("click", Btnhandler);
    alertBtn.addEventListener("click", alertBtnhandler);
};

export default listener;