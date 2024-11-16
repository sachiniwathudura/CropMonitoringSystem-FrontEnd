let selectedRow = null;

// Save Vehicle
function saveVehicle() {
    const vehicleData = getFormData();
    if (vehicleData && selectedRow === null) {
        const newRow = `
            <tr>
                <td><input type="checkbox"></td>
                <td>${vehicleData.vehicleCode}</td>
                <td>${vehicleData.licensePlate}</td>
                <td>${vehicleData.category}</td>
                <td>${vehicleData.fuelType}</td>
                <td>${vehicleData.status}</td>
                <td>${vehicleData.remarks}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editVehicle(this)">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="removeVehicle(this)">Delete</button>
                </td>
            </tr>
        `;
        $('table tbody').append(newRow);
        resetForm();
        $('#addVehicleModal').modal('hide');
    } else {
        alert("Please fill in all fields or use Update for existing entries.");
    }
}

// Update Vehicle
function updateVehicle() {
    const vehicleData = getFormData();
    if (vehicleData && selectedRow !== null) {
        $(selectedRow).find("td:eq(1)").text(vehicleData.vehicleCode);
        $(selectedRow).find("td:eq(2)").text(vehicleData.licensePlate);
        $(selectedRow).find("td:eq(3)").text(vehicleData.category);
        $(selectedRow).find("td:eq(4)").text(vehicleData.fuelType);
        $(selectedRow).find("td:eq(5)").text(vehicleData.status);
        $(selectedRow).find("td:eq(6)").text(vehicleData.remarks);

        resetForm();
        $('#addVehicleModal').modal('hide');
    } else {
        alert("Select a vehicle to update.");
    }
}

// Delete Vehicle
function deleteVehicle() {
    if (selectedRow !== null) {
        $(selectedRow).remove();
        resetForm();
        $('#addVehicleModal').modal('hide');
    } else {
        alert("Select a vehicle to delete.");
    }
}

// Get All Vehicles
function getAllVehicles() {
    const vehicles = [];
    $('table tbody tr').each(function () {
        const row = $(this);
        const vehicle = {
            vehicleCode: row.find("td:eq(1)").text(),
            licensePlate: row.find("td:eq(2)").text(),
            category: row.find("td:eq(3)").text(),
            fuelType: row.find("td:eq(4)").text(),
            status: row.find("td:eq(5)").text(),
            remarks: row.find("td:eq(6)").text()
        };
        vehicles.push(vehicle);
    });
    console.log("All Vehicles:", vehicles);
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

// Remove Vehicle
function removeVehicle(button) {
    $(button).closest('tr').remove();
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
