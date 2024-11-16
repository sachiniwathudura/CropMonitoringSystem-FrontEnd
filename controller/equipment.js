let selectedRow = null;

// Save Equipment function
function saveEquipment() {
    const equipmentData = getFormData();
    if (equipmentData && selectedRow === null) {
        const newRow = `
            <tr>
                <td><input type="checkbox"></td>
                <td>${equipmentData.equipmentCode}</td>
                <td>${equipmentData.equipmentName}</td>
                <td>${equipmentData.type}</td>
                <td>${equipmentData.manufacturer}</td>
                <td>${equipmentData.purchaseDate}</td>
                <td>${equipmentData.details}</td>
                <td>${equipmentData.image}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editEquipment(this)">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="removeEquipment(this)">Delete</button>
                </td>
            </tr>
        `;
        $('table tbody').append(newRow);
        resetForm();
        $('#addEquipmentModal').modal('hide');
    } else {
        alert("Please fill in all fields or use Update for existing entries.");
    }
}

// Other functions: updateEquipment(), deleteEquipment(), getAllEquipment(), editEquipment()
// Use a similar pattern to crop.js but replace field names accordingly.

function getFormData() {
    return {
        equipmentCode: $('#equipmentCode').val(),
        equipmentName: $('#equipmentName').val(),
        type: $('#type').val(),
        manufacturer: $('#manufacturer').val(),
        purchaseDate: $('#purchaseDate').val(),
        details: $('#details').val(),
        image: $('#equipmentImage').val().split('\\').pop()
    };
}

function resetForm() {
    $('#equipmentForm')[0].reset();
    selectedRow = null;
}


