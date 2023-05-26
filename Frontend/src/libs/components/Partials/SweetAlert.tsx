import Swal from "sweetalert2";

interface SweetAlertProps {
  title: string;
  text: string;
  confirmButtonText: string;
}

const SweetAlertConfirm = ({
  title,
  text,
  confirmButtonText,
}: SweetAlertProps) => {
  const handleClick = () => {
    Swal.fire({
      title,
      text,
      icon: "warning",
      confirmButtonText,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // handle confirm
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // handle cancel
      }
    });
  };

  return (
    <button type="button" onClick={handleClick}>
      Open SweetAlert
    </button>
  );
};

const confirmAction = (message: string, callback: () => void) => {
  Swal.fire({
    title: message,
    icon: "warning",
    showCancelButton: true,
    focusCancel: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, I'm Sure!",
    cancelButtonText: "No, cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

export { confirmAction };
