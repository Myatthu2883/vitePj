import Swal from 'sweetalert2'
import { listGroup, username } from "./selectors.js";


export const Btnhandler = () => {
    console.log("U click");
    console.log(username.value);
    const list = document.createElement("li");
    list.innerText = username.value;
    listGroup.append(list);
    username.value = "";
};

export const alertBtnhandler = () => {
    console.log("Alert"); 
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
}