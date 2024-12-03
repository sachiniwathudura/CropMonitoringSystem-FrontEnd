let selectedRow = null;

// Save Staff function
function saveStaff() {
    const staffData = getStaffData();
    if (staffData && selectedRow === null) {
        // POST request to create a new staff member
        $.ajax({
            url: `http://localhost:8080/cropMonitor/api/v1/staff`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(staffData),
            success: function () {
                alert("Staff added successfully.");
                resetForm();
                getAllStaff(); // Refresh the staff list
            },
            error: function () {
                alert("Error adding staff.");
            }
        });
    }
}

// Edit Staff function
function editStaff(td) {
    selectedRow = $(td).closest('tr');
    $('#staffId').val($(selectedRow).find("td:eq(1)").text());
    $('#firstName').val($(selectedRow).find("td:eq(2)").text());
    $('#lastName').val($(selectedRow).find("td:eq(3)").text());
    $('#designation').val($(selectedRow).find("td:eq(4)").text());
    $('#gender').val($(selectedRow).find("td:eq(5)").text());
    $('#joinDate').val($(selectedRow).find("td:eq(6)").text());
    $('#dob').val($(selectedRow).find("td:eq(7)").text());
    $('#contactNo').val($(selectedRow).find("td:eq(8)").text());
    $('#email').val($(selectedRow).find("td:eq(9)").text());
    $('#equipmentCode').val($(selectedRow).find("td:eq(10)").text());
    $('#vehicleCode').val($(selectedRow).find("td:eq(11)").text());
    $('#buildingNo').val($(selectedRow).find("td:eq(12)").text());
    $('#city').val($(selectedRow).find("td:eq(13)").text());
    $('#lane').val($(selectedRow).find("td:eq(14)").text());
    $('#postalCode').val($(selectedRow).find("td:eq(15)").text());
    $('#addStaffModal').modal('show');
}

// Update Staff function
function updateStaff() {
    const staffData = getStaffData();
    if (staffData && selectedRow !== null) {
        const staffId = $(selectedRow).find("td:eq(1)").text(); // Staff ID from the selected row
        // PUT request to update the staff member
        $.ajax({
            url: `http://localhost:8080/cropMonitor/api/v1/staff/${staffId}`,
            method: "PATCH",
            contentType: "application/json",
            data: JSON.stringify(staffData),
            success: function () {
                alert("Staff updated successfully.");
                resetForm();
                getAllStaff(); // Refresh the staff list
                $('#addStaffModal').modal('hide');
            },
            error: function () {
                alert("Error updating staff.");
            }
        });
    }
}

// Get All Staff function
function getAllStaff() {
    $.ajax({
        url:`http://localhost:8080/cropMonitor/api/v1/staff/allStaff`,
        method: "GET",
        success: function (data) {
            const staffTableBody = $('table tbody');
            staffTableBody.empty(); // Clear the table
            data.forEach(staff => {
                const newRow = `
                    <tr>
                        <td><input type="checkbox"></td>
                        <td>${staff.staffId}</td>
                        <td>${staff.firstName}</td>
                        <td>${staff.lastName}</td>
                        <td>${staff.designation}</td>
                        <td>${staff.gender}</td>
                        <td>${staff.joinDate}</td>
                        <td>${staff.dob}</td>
                        <td>${staff.contactNo}</td>
                        <td>${staff.email}</td>
                        <td>${staff.equipmentCode}</td>
                        <td>${staff.vehicleCode}</td>
                        <td>${staff.buildingNo}</td>
                        <td>${staff.city}</td>
                        <td>${staff.lane}</td>
                        <td>${staff.postalCode}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editStaff(this)">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="removeStaff(this, '${staff.staffId}')">Delete</button>
                        </td>
                    </tr>
                `;
                staffTableBody.append(newRow);
            });
        },
        error: function () {
            alert("Error fetching staff data.");
        }
    });
}

// Delete Staff function
function removeStaff(td, staffId) {
    if (confirm("Are you sure you want to delete this staff member?")) {
        // DELETE request to delete the staff member
        $.ajax({
            url: `http://localhost:8080/cropMonitor/api/v1/staff/${staffId}`,
            method: "DELETE",
            success: function () {
                alert("Staff deleted successfully.");
                getAllStaff(); // Refresh the staff list
            },
            error: function () {
                alert("Error deleting staff.");
            }
        });
    }
}

// Get Staff Data from the form
function getStaffData() {
    return {
        staffId: $('#staffId').val(),
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        designation: $('#designation').val(),
        gender: $('#gender').val(),
        joinDate: $('#joinDate').val(),
        dob: $('#dob').val(),
        contactNo: $('#contactNo').val(),
        email: $('#email').val(),
        equipmentCode: $('#equipmentCode').val(),
        vehicleCode: $('#vehicleCode').val(),
        buildingNo: $('#buildingNo').val(),
        city: $('#city').val(),
        lane: $('#lane').val(),
        postalCode: $('#postalCode').val() // Include postal code in staff data
    };
}

// Reset form
function resetForm() {
    $('#staffForm')[0].reset();
    selectedRow = null;
}

// Load all staff on page load
$(document).ready(function () {
    getAllStaff();
});
