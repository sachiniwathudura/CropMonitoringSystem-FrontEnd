let selectedRow = null;

// Save JWT token to localStorage after successful login
function storeJwtToken(token) {
    localStorage.setItem('jwtToken', token);
    console.log("JWT token saved:", token);
}

// Retrieve JWT token from localStorage
function getJwtToken() {
    const token = localStorage.getItem('jwtToken');
    console.log("JWT token retrieved:", token);
    return token;
}

// Save Vehicle
function saveVehicle() {
    const vehicleData = getFormData();
    if (vehicleData && selectedRow === null) {
        $.ajax({
            url: `http://localhost:8080/cropMonitor/api/v1/vehicle`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(vehicleData),
            headers: {
                'Authorization': `Bearer ${getJwtToken()}`,
                'Content-Type': 'application/json'
            },
            success: function (response) {
                alert("Vehicle saved successfully!");
                addTableRow(vehicleData);
                resetForm();
                $('#addVehicleModal').modal('hide');
            },
            error: function (error) {
                alert("Error saving vehicle: " + error.responseText);
            }
        });
    } else {
        alert("Please fill in all fields or use Update for existing entries.");
    }
}

// Update Vehicle
function updateVehicle() {
    const vehicleData = getFormData();
    if (vehicleData && selectedRow !== null) {
        const vehicleCode = $(selectedRow).find("td:eq(1)").text();
        $.ajax({
            url: `http://localhost:8080/cropMonitor/api/v1/vehicle/${vehicleCode}`,
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(vehicleData),
            headers: {
                'Authorization': `Bearer ${getJwtToken()}`,
                'Content-Type': 'application/json'
            },
            success: function (response) {
                alert("Vehicle updated successfully!");
                updateTableRow(selectedRow, vehicleData);
                resetForm();
                $('#addVehicleModal').modal('hide');
            },
            error: function (error) {
                alert("Error updating vehicle: " + error.responseText);
            }
        });
    } else {
        alert("Select a vehicle to update.");
    }
}

// Delete Vehicle
function deleteVehicle() {
    if (selectedRow !== null) {
        const vehicleCode = $(selectedRow).find("td:eq(1)").text();
        $.ajax({
            url: `http://localhost:8080/cropMonitor/api/v1/vehicle/${vehicleCode}`,
            type: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getJwtToken()}`,
                'Content-Type': 'application/json'
            },
            success: function (response) {
                alert("Vehicle deleted successfully!");
                $(selectedRow).remove();
                resetForm();
                $('#addVehicleModal').modal('hide');
            },
            error: function (error) {
                alert("Error deleting vehicle: " + error.responseText);
            }
        });
    } else {
        alert("Select a vehicle to delete.");
    }
}

// Get All Vehicles
function getAllVehicles() {
    $.ajax({
        url: `http://localhost:8080/cropMonitor/api/v1/vehicle/allVehicles`,
        type: 'GET',
        headers: {
            'Authorization': `Bearer ${getJwtToken()}`,
            'Content-Type': 'application/json'
        },
        success: function (response) {
            $('table tbody').empty();
            response.forEach(vehicle => {
                addTableRow(vehicle);
            });
        },
        error: function (error) {
            alert("Error fetching vehicles: " + error.responseText);
        }
    });
}

// Edit Vehicle
function editVehicle(button) {
    selectedRow = $(button).closest('tr');
    $('#vehicleCode').val($(selectedRow).find("td:eq(1)").text());
    $('#licensePlate').val($(selectedRow).find("td:eq(2)").text());
    $('#category').val($(selectedRow).find("td:eq(3)").text());
    $('#fuelType').val($(selectedRow).find("td:eq(4)").text());
    $('#status').val($(selectedRow).find("td:eq(5)").text());
    $('#remarks').val($(selectedRow).find("td:eq(6)").text());
    $('#addVehicleModal').modal('show');
}

// Remove Vehicle (Client-side Only)
function removeVehicle(button) {
    $(button).closest('tr').remove();
}

// Add Table Row
function addTableRow(vehicle) {
    const newRow = `
        <tr>
            <td><input type="checkbox"></td>
            <td>${vehicle.vehicleCode}</td>
            <td>${vehicle.licensePlate}</td>
            <td>${vehicle.category}</td>
            <td>${vehicle.fuelType}</td>
            <td>${vehicle.status}</td>
            <td>${vehicle.remarks}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editVehicle(this)">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="removeVehicle(this)">Delete</button>
            </td>
        </tr>
    `;
    $('table tbody').append(newRow);
}

// Update Table Row
function updateTableRow(row, vehicle) {
    $(row).find("td:eq(1)").text(vehicle.vehicleCode);
    $(row).find("td:eq(2)").text(vehicle.licensePlate);
    $(row).find("td:eq(3)").text(vehicle.category);
    $(row).find("td:eq(4)").text(vehicle.fuelType);
    $(row).find("td:eq(5)").text(vehicle.status);
    $(row).find("td:eq(6)").text(vehicle.remarks);
}

// Get Form Data
function getFormData() {
    const vehicleCode = $('#vehicleCode').val().trim();
    const licensePlate = $('#licensePlate').val().trim();
    const category = $('#category').val().trim();
    const fuelType = $('#fuelType').val().trim();
    const status = $('#status').val().trim();
    const remarks = $('#remarks').val().trim();

    if (vehicleCode && licensePlate && category && fuelType && status && remarks) {
        return { vehicleCode, licensePlate, category, fuelType, status, remarks };
    } else {
        alert("All fields are required.");
        return null;
    }
}

// Reset Form
function resetForm() {
    $('#vehicleForm')[0].reset();
    selectedRow = null;
}
