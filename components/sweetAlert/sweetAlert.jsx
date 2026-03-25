// import Swal from "sweetalert2";

// const confirmDelete = (handleDelete) => {
//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: "btn btn-success",
//       cancelButton: "btn btn-danger",
//     },
//     buttonsStyling: false,
//   });

//   swalWithBootstrapButtons
//     .fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel!",
//       reverseButtons: true,
//     })
//     .then((result) => {
//       if (result.isConfirmed) {
//         swalWithBootstrapButtons.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success",
//         });

//         handleDelete?.();
//       }
//     });
// };

// export default confirmDelete;
