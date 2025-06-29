import { Btnhandler } from "./handlers.js";
import { Btn } from "./selectors.js";

const listener = () => {
    Btn.addEventListener("click", Btnhandler);
};

export default listener;