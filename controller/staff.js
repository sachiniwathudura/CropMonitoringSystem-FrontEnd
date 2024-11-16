let selectedRow = null;

// Save Staff function
function saveStaff() {
    const staffData = getStaffData();
    if (staffData && selectedRow === null) {
        const newRow = `
            <tr>
                <td><input type="checkbox"></td>
                <td>${staffData.staffId}</td>
                <td>${staffData.firstName}</td>
                <td>${staffData.lastName}</td>
                <td>${staffData.designation}</td>
                <td>${staffData.gender}</td>
                <td>${staffData.joinDate}</td>
                <td>${staffData.dob}</td>
                <td>${staffData.contactNo}</td>
                <td>${staffData.email}</td>
                <td>${staffData.equipmentCode}</td>
                <td>${staffData.vehicleCode}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editStaff(this)">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="removeStaff(this)">Delete</button>
                </td>
            </tr>
        `;
        $('table tbody').append(newRow);
        resetForm();
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
    $('#addStaffModal').modal('show');
}

// Additional functions similar to save, update, getAll, delete go here

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
        vehicleCode: $('#vehicleCode').val()
    };
}

function resetForm() {
    $('#staffForm')[0].reset();
    selectedRow = null;
}
