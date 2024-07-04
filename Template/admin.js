document.addEventListener("DOMContentLoaded", function () {
  const actionButtons = document.querySelectorAll(".actions");
  const selectAllCheckbox = document.getElementById("selectAll");
  const checkboxes = document.querySelectorAll(".selectItem");

  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.querySelector(".dropdown").classList.toggle("show");
    });
  });

  window.addEventListener("click", function (e) {
    if (!e.target.matches(".fas")) {
      actionButtons.forEach((button) => {
        const dropdown = button.querySelector(".dropdown");
        if (dropdown.classList.contains("show")) {
          dropdown.classList.remove("show");
        }
      });
    }
  });
  // Function to check if all checkboxes are checked
  function areAllChecked() {
    return Array.from(checkboxes).every((checkbox) => checkbox.checked);
  }

  // Add event listener for the "select all" checkbox
  selectAllCheckbox.addEventListener("change", function () {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });

  // Add event listener for each checkbox in the table
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      selectAllCheckbox.checked = areAllChecked();
    });
  });

  const sidebar = document.querySelector("aside.side_bar");
  const menuIcon = document.querySelectorAll(".side_bar .icon_toong");
  const menuIconShow = document.querySelector(".side_bar .icon_tonge");
//   menuIcon.forEach((item) => {
    menuIconShow.addEventListener("click", function () {
      sidebar.classList.toggle("expanded");
      menuIconShow.classList.toggle("show");

    });
//   });
});
