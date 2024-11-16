let selectedRow = null;

// Save Crop function
function saveCrop() {
    const cropData = getFormData();
    if (cropData && selectedRow === null) {
        // Append new row to the table
        const newRow = `
            <tr>
                <td><input type="checkbox"></td>
                <td>${cropData.cropCode}</td>
                <td>${cropData.commonName}</td>
                <td>${cropData.scientificName}</td>
                <td>${cropData.category}</td>
                <td>${cropData.season}</td>
                <td>${cropData.fieldDetails}</td>
                <td>${cropData.imageFile}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editCrop(this)">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="removeCrop(this)">Delete</button>
                </td>
            </tr>
        `;
        $('table tbody').append(newRow);
        resetForm();
        $('#addCropModal').modal('hide');
    } else {
        alert("Please fill in all fields or use Update for existing entries.");
    }
}

// Update Crop function
function updateCrop() {
    const cropData = getFormData();
    if (cropData && selectedRow !== null) {
        // Update selected row with new data
        $(selectedRow).find("td:eq(1)").text(cropData.cropCode);
        $(selectedRow).find("td:eq(2)").text(cropData.commonName);
        $(selectedRow).find("td:eq(3)").text(cropData.scientificName);
        $(selectedRow).find("td:eq(4)").text(cropData.category);
        $(selectedRow).find("td:eq(5)").text(cropData.season);
        $(selectedRow).find("td:eq(6)").text(cropData.fieldDetails);
        $(selectedRow).find("td:eq(7)").text(cropData.imageFile);

        resetForm();
        $('#addCropModal').modal('hide');
    } else {
        alert("Select a crop to update.");
    }
}

// Delete Crop function
function deleteCrop() {
    if (selectedRow !== null) {
        $(selectedRow).remove();
        resetForm();
        $('#addCropModal').modal('hide');
    } else {
        alert("Select a crop to delete.");
    }
}

// Get All Crops function
function getAllCrops() {
    const crops = [];
    $('table tbody tr').each(function() {
        const row = $(this);
        const crop = {
            cropCode: row.find("td:eq(1)").text(),
            commonName: row.find("td:eq(2)").text(),
            scientificName: row.find("td:eq(3)").text(),
            category: row.find("td:eq(4)").text(),
            season: row.find("td:eq(5)").text(),
            fieldDetails: row.find("td:eq(6)").text(),
            imageFile: row.find("td:eq(7)").text()
        };
        crops.push(crop);
    });
    console.log("All Crops:", crops); // You can replace this with displaying the data on the page.
}

// Edit Crop function - selects a row for updating
function editCrop(button) {
    selectedRow = $(button).closest('tr');
    $('#cropCode').val($(selectedRow).find("td:eq(1)").text());
    $('#commonName').val($(selectedRow).find("td:eq(2)").text());
    $('#scientificName').val($(selectedRow).find("td:eq(3)").text());
    $('#category').val($(selectedRow).find("td:eq(4)").text());
    $('#season').val($(selectedRow).find("td:eq(5)").text());
    $('#fieldDetails').val($(selectedRow).find("td:eq(6)").text());
    $('#cropImage').val('');
    $('#addCropModal').modal('show');
}

// Helper functions

// Collect form data
function getFormData() {
    return {
        cropCode: $('#cropCode').val(),
        commonName: $('#commonName').val(),
        scientificName: $('#scientificName').val(),
        category: $('#category').val(),
        season: $('#season').val(),
        fieldDetails: $('#fieldDetails').val(),
        imageFile: $('#cropImage').val().split('\\').pop()
    };
}

// Reset form
function resetForm() {
    $('#cropForm')[0].reset();
    selectedRow = null;
}
