let selectedRow = null;

// Base API URL (adjust based on your backend configuration)
const API_URL = "http://localhost:8080/cropMonitor/api/v1/crops";

// Save Crop function
async function saveCrop() {
    const cropData = getFormData();
    if (cropData && selectedRow === null) {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cropData),
            });

            if (response.ok) {
                const newCrop = await response.json();
                addRowToTable(newCrop);
                resetForm();
                $('#addCropModal').modal('hide');
            } else {
                alert("Failed to save crop. Please try again.");
            }
        } catch (error) {
            console.error("Error saving crop:", error);
        }
    } else {
        alert("Please fill in all fields or use Update for existing entries.");
    }
}

// Update Crop function
async function updateCrop() {
    const cropData = getFormData();
    if (cropData && selectedRow !== null) {
        const cropId = $(selectedRow).find("td:eq(1)").text(); // Assuming cropCode is used as ID
        try {
            const response = await fetch(`${API_URL}/${cropId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cropData),
            });

            if (response.ok) {
                updateRowInTable(selectedRow, cropData);
                resetForm();
                $('#addCropModal').modal('hide');
            } else {
                alert("Failed to update crop. Please try again.");
            }
        } catch (error) {
            console.error("Error updating crop:", error);
        }
    } else {
        alert("Select a crop to update.");
    }
}

// Delete Crop function
async function deleteCrop() {
    if (selectedRow !== null) {
        const cropId = $(selectedRow).find("td:eq(1)").text(); // Assuming cropCode is used as ID
        try {
            const response = await fetch(`${API_URL}/${cropId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                $(selectedRow).remove();
                resetForm();
                $('#addCropModal').modal('hide');
            } else {
                alert("Failed to delete crop. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting crop:", error);
        }
    } else {
        alert("Select a crop to delete.");
    }
}

// Get All Crops function
async function getAllCrops() {
    try {
        const response = await fetch(`${API_URL}/allcrops`);

        if (response.ok) {
            const crops = await response.json();
            populateTable(crops);
        } else {
            alert("Crops to fetch crops. Please try again.");
        }
    } catch (error) {
        console.error("Error fetching crops:", error);
    }
}

// Populate table with data
function populateTable(crops) {
    const tbody = $('table tbody');
    tbody.empty();
    crops.forEach(crop => addRowToTable(crop));
}

// Add a new row to the table
function addRowToTable(crop) {
    const newRow = `
        <tr>
            <td><input type="checkbox"></td>
            <td>${crop.cropCode}</td>
            <td>${crop.commonName}</td>
            <td>${crop.scientificName}</td>
            <td>${crop.category}</td>
            <td>${crop.cropSeason}</td>
            <td>${crop.fieldCode}</td>
            <td>${crop.image || 'N/A'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editCrop(this)">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="removeCrop(this)">Delete</button>
            </td>
        </tr>
    `;
    $('table tbody').append(newRow);
}

// Update a row in the table
function updateRowInTable(row, cropData) {
    $(row).find("td:eq(1)").text(cropData.cropCode);
    $(row).find("td:eq(2)").text(cropData.commonName);
    $(row).find("td:eq(3)").text(cropData.scientificName);
    $(row).find("td:eq(4)").text(cropData.category);
    $(row).find("td:eq(5)").text(cropData.season);
    $(row).find("td:eq(6)").text(cropData.fieldDetails);
    $(row).find("td:eq(7)").text(cropData.imageFile || 'N/A');
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
    $('#cropImage').val(''); // Image is not directly editable
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
        season: $('#cropSeason').val(),
        fieldDetails: $('#fieldCode').val(),
        imageFile: $('#image').val().split('\\').pop() || null
    };
}

// Reset form
function resetForm() {
    $('#cropForm')[0].reset();
    selectedRow = null;
}

// Fetch all crops on page load
$(document).ready(() => {
    getAllCrops();
});