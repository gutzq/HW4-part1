/*
name: Ryan Gutierrez
github: gutzq
email: ryan_gutierrez@uml.student.edu

*/

$(document).ready(function () {
  $.validator.addMethod("wholeNumber", function (value, element) {
      return this.optional(element) || Number.isInteger(parseFloat(value));
  }, "Please enter a whole number.");

  $.validator.addMethod("validRange", function (value, element, params) {
      const min = parseInt($(params[0]).val(), 10);
      const max = parseInt(value, 10);
      return this.optional(element) || min <= max;
  }, "The minimum value must be less than or equal to the maximum value.");

  // Initialize validation
  $("#tableform").validate({
      rules: {
          "minimum-multiplier": {
              required: true,
              number: true,
              wholeNumber: true,
              range: [-50, 50]
          },
          "maximum-multiplier": {
              required: true,
              number: true,
              wholeNumber: true,
              range: [-50, 50],
              validRange: ["#startMultiplier"]
          },
          "minimum-multiplicand": {
              required: true,
              number: true,
              wholeNumber: true,
              range: [-50, 50]
          },
          "maximum-multiplicand": {
              required: true,
              number: true,
              wholeNumber: true,
              range: [-50, 50],
              validRange: ["#startMultiplicand"]
          }
      },
      messages: {
          "minimum-multiplier": "Please enter a valid whole number between -50 and 50.",
          "maximum-multiplier": "Please ensure the maximum is >= the minimum and within -50 to 50.",
          "minimum-multiplicand": "Please enter a valid whole number between -50 and 50.",
          "maximum-multiplicand": "Please ensure the maximum is >= the minimum and within -50 to 50."
      },
      errorPlacement: function (error, element) {
          if (element.attr("id") === "startMultiplier" || element.attr("id") === "endMultiplier") {
              $("#multiplier-error").html(error);
          } else if (element.attr("id") === "startMultiplicand" || element.attr("id") === "endMultiplicand") {
              $("#multiplicand-error").html(error);
          } else {
              error.insertAfter(element);
          }
      }
  });

  $("input[type='button']").click(function () {
      if ($("#tableform").valid()) {
          generateTable();
      } else {
          console.log("Form is invalid. Table will not regenerate.");
      }
  });
});

function generateTable() {
  const minX = parseInt(document.getElementById("startMultiplier").value);
  const maxX = parseInt(document.getElementById("endMultiplier").value);
  const minY = parseInt(document.getElementById("startMultiplicand").value);
  const maxY = parseInt(document.getElementById("endMultiplicand").value);

  // Manually check if values are out of range
  if (minX < -50 || minX > 50 || maxX < -50 || maxX > 50 || minY < -50 || minY > 50 || maxY < -50 || maxY > 50) {
    alert("Please ensure all numbers are within the valid range of -50 to 50.");
    return; // Prevent table generation if out of range
}

// Ensure the minimum values are less than or equal to the maximum values
if (minX > maxX || minY > maxY) {
    alert("Minimum values must be less than or equal to the maximum values.");
    return; // Prevent table generation if min > max
}

  let table = "<table>";

  for (let r = minY - 1; r <= maxY; r++) {
    table += "<tr>";

    for (let c = minX - 1; c <= maxX; c++) {
      if (r === minY - 1 && c === minX - 1) {
        table += "<th></th>"; 
      } else if (r === minY - 1) {
        table += `<th>${c}</th>`; 
      } else if (c === minX - 1) {
        table += `<th>${r}</th>`; 
      } else {
        table += `<td>${r * c}</td>`; 
      }
    }

    table += "</tr>";
  }

  table += "</table>";
  document.getElementById('tableContainer').innerHTML = table;
  
}