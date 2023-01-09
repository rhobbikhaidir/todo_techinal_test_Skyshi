import Swal from "sweetalert2";

// swal helper functions
export const swal = {
  success: (message = "Success") => {
    Swal.fire({
      title: message,
      type: "success",
      icon: "success",
      confirmButtonText: "Ok",
    });
  },
  error: (message) => {
    Swal.fire({
      title: "Error",
      text: message,
      type: "error",
      icon: "error",
      confirmButtonText: "Ok",
    });
  },
  warning: async (message) => {
    const result = await Swal.fire({
      title: message ? message : "warning",
      type: "warning",
      icon: "warning",
      confirmButtonText: "Ok",
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      return Promise.resolve();
    }
    return Promise.reject();
  },
  info: async () => {
    const result = await Swal.fire({
      title: "Apakah anda yakin?",
      type: "info",
      icon: "info",
      confirmButtonText: "Ok",
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      return Promise.resolve();
    } else if (result.isDismissed) {
      return Promise.reject({ message: "Data batal disimpan" });
    }
  },
  peringatan: (message) => {
    Swal.fire({
      title: message ? message : "Error",
      text: message,
      type: "error",
      icon: "error",
      confirmButtonText: "Ok",
      timer: 3500,
    });
  },
};
