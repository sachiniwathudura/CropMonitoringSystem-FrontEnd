// let selectedRow = null;

// // Save Equipment function
// function saveEquipment() {
//     const equipmentData = getFormData();
//     if (equipmentData && selectedRow === null) {
//         const newRow = `
//             <tr>
//                 <td><input type="checkbox"></td>
//                 <td>${equipmentData.equipmentCode}</td>
//                 <td>${equipmentData.equipmentName}</td>
//                 <td>${equipmentData.type}</td>
//                 <td>${equipmentData.manufacturer}</td>
//                 <td>${equipmentData.purchaseDate}</td>
//                 <td>${equipmentData.details}</td>
//                 <td>${equipmentData.image}</td>
//                 <td>
//                     <button class="btn btn-warning btn-sm" onclick="editEquipment(this)">Edit</button>
//                     <button class="btn btn-danger btn-sm" onclick="removeEquipment(this)">Delete</button>
//                 </td>
//             </tr>
//         `;
//         $('table tbody').append(newRow);
//         resetForm();
//         $('#addEquipmentModal').modal('hide');
//     } else {
//         alert("Please fill in all fields or use Update for existing entries.");
//     }
// }

// // Other functions: updateEquipment(), deleteEquipment(), getAllEquipment(), editEquipment()
// // Use a similar pattern to crop.js but replace field names accordingly.

// function getFormData() {
//     return {
//         equipmentCode: $('#equipmentCode').val(),
//         equipmentName: $('#equipmentName').val(),
//         type: $('#type').val(),
//         manufacturer: $('#manufacturer').val(),
//         purchaseDate: $('#purchaseDate').val(),
//         details: $('#details').val(),
//         image: $('#equipmentImage').val().split('\\').pop()
//     };
// }

// function resetForm() {
//     $('#equipmentForm')[0].reset();
//     selectedRow = null;
// }
// function search() {
//     const searchInput = document.getElementById('searchInput').value.toLowerCase();
//     const table = document.getElementById('cropTable');
//     const rows = table.getElementsByTagName('tr');

//     for (let i = 1; i < rows.length; i++) {
//         const cells = rows[i].getElementsByTagName('td');
//         let match = false;

//         for (let j = 0; j < cells.length; j++) {
//             if (cells[j].textContent.toLowerCase().includes(searchInput)) {
//                 match = true;
//                 break;
//             }
//         }

//         rows[i].style.display = match ? '' : 'none';
//     }
// }

// Retrieve JWT token from localStorage
// function getJwtToken() {
//     return localStorage.getItem('jwtToken');
// }

// Get form data for equipment
// function getFormData() {
//     return {
//         equipmentCode: $('#equipmentCode').val(),
//         equipmentName: $('#equipmentName').val(),
//         status: $('#status').val(),
//         type: $('#type').val()
//     };
// }

// // Reset form fields
// function resetForm() {
//     $('#equipmentForm')[0].reset();
//     selectedRow = null;
//     selectedEquipmentId = null;
// }

// // Save new equipment
// function saveEquipment() {
//     const equipmentData = getFormData();
//     const token = getJwtToken();

//     if (equipmentData && token) {
//         $.ajax({
//             url: `http://localhost:8080/cropMonitor/api/v1/equipments`,
//             method: "POST",
//             contentType: "application/json",
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             data: JSON.stringify(equipmentData),
//             success: function () {
//                 alert("Equipment added successfully.");
//                 resetForm();
//                 getAllEquipment();
//                 $('#addEquipmentModal').modal('hide');
//             },
//             error: function () {
//                 alert("Error adding equipment.");
//             }
//         });
//     } else {
//         alert("JWT token missing or invalid.");
//     }
// }
$(document).ready(function () {
    // Event handler for Save Equipment button
    $('#saveEquipment').click(function () {
        // Catch the input field values
        let equipmentCode = $('#equipmentCode').val();
        let equipmentName = $('#equipmentName').val();
        let status = $('#status').val();
        let type = $('#type').val();

        // Create the equipmentData object
        let equipmentData = {
            equipmentCode: equipmentCode,
            equipmentName: equipmentName,
            status: status,
            type: type
        };

        console.log("Equipment Data: ", equipmentData);

        // Perform the AJAX call to save the equipment
        $.ajax({
            url: "http://localhost:8080/cropMonitor/api/v1/equipment",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(equipmentData),
            success: function () {
                alert("Equipment added successfully.");
                resetForm(); // Reset the form fields
                getAllEquipment(); // Refresh the equipment list
                $('#addEquipmentModal').modal('hide'); // Close the modal
            },
            error: function (error) {
                console.log("Error: ", error);
                alert("Failed to add equipment. Please try again.");
            }
        });
    });

    // Function to reset the form fields
    function resetForm() {
        $('#equipmentForm')[0].reset(); // Reset all input fields in the form
    }

    // Function to fetch and display all equipment (implement as needed)
    function getAllEquipment() {
        // Placeholder for fetching all equipment data
        console.log("Fetching all equipment...");
    }
});


// // Update existing equipment
// function updateEquipment() {
//     const equipmentData = getFormData();
//     const token = getJwtToken();

//     if (equipmentData && selectedEquipmentId && token) {
//         $.ajax({
//             url: `http//localhost:8080/cropMonitor/api/v1/equipments/${selectedEquipmentId}`,
//             method: "PATCH",
//             contentType: "application/json",
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             data: JSON.stringify(equipmentData),
//             success: function () {
//                 alert("Equipment updated successfully.");
//                 resetForm();
//                 getAllEquipment();
//                 $('#addEquipmentModal').modal('hide');
//             },
//             error: function () {
//                 alert("Error updating equipment.");
//             }
//         });
//     } else {
//         alert("JWT token missing or invalid.");
//     }
// }

// // Fetch all equipment data
// function getAllEquipment() {
//     const token = getJwtToken();

//     if (token) {
//         $.ajax({
//             url: "http://localhost:8080/cropMonitor/api/v1/equipments/all_equipments",
//             method: "GET",
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             success: function (response) {
//                 const tbody = $('.tBody');
//                 tbody.empty();

//                 response.forEach(equipment => {
//                     const row = `
//                         <tr data-id="${equipment.id}">
//                             <td><input type="checkbox"></td>
//                             <td>${equipment.equipmentCode}</td>
//                             <td>${equipment.equipmentName}</td>
//                             <td>${equipment.status}</td>
//                             <td>${equipment.type}</td>
//                             <td>
//                                 <button class="btn btn-warning btn-sm" onclick="editEquipment(${equipment.id})">Edit</button>
//                                 <button class="btn btn-danger btn-sm" onclick="deleteEquipment(${equipment.id})">Delete</button>
//                             </td>
//                         </tr>
//                     `;
//                     tbody.append(row);
//                 });
//             },
//             error: function () {
//                 alert("Failed to fetch equipment data.");
//             }
//         });
//     } else {
//         alert("JWT token missing or invalid.");
//     }
// }

// // Edit equipment
// function editEquipment(id) {
//     const token = getJwtToken();

//     if (token) {
//         selectedEquipmentId = id;

//         $.ajax({
//             url: `http://localhost:8080/cropMonitor/api/v1/equipments/${id}`,
//             method: "GET",
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             success: function (equipment) {
//                 $('#equipmentCode').val(equipment.equipmentCode);
//                 $('#equipmentName').val(equipment.equipmentName);
//                 $('#status').val(equipment.status);
//                 $('#type').val(equipment.type);
//                 $('#addEquipmentModal').modal('show');
//             },
//             error: function () {
//                 alert("Failed to fetch equipment details.");
//             }
//         });
//     } else {
//         alert("JWT token missing or invalid.");
//     }
// }

// // Delete equipment
// function deleteEquipment(id) {
//     const token = getJwtToken();

//     if (token && confirm("Are you sure you want to delete this equipment?")) {
//         $.ajax({
//             url: `http://localhost:8080/cropMonitor/api/v1/equipments/${id}`,
//             method: "DELETE",
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             success: function () {
//                 alert("Equipment deleted successfully!");
//                 getAllEquipment();
//             },
//             error: function () {
//                 alert("Failed to delete equipment.");
//             }
//         });
//     } else {
//         alert("JWT token missing or invalid.");
//     }
// }

// // Initialize
// $(document).ready(function () {
//     getAllEquipment();
// });

