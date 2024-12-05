let selectedRow = null;

document.addEventListener("DOMContentLoaded", () => {
    getAllFields();
});

// Save new field
function saveField() {
    const fieldData = getFieldData();

    if (fieldData && selectedRow === null) {
        const formData = new FormData();

       
        formData.append('fieldCode', fieldData.fieldCode);
        formData.append('fieldName', fieldData.fieldName);
        formData.append('extentSize', fieldData.extentSize);
        formData.append('latitude', fieldData.latitude); // Latitude for fieldLocation
        formData.append('longitude', fieldData.longitude); // Longitude for fieldLocation
        formData.append('equipmentCode', fieldData.equipmentCode);

        
        const img1 = $('#image1')[0].files[0];
        const img2 = $('#image2')[0].files[0];

        if (img1) formData.append('image1', img1);
        if (img2) formData.append('image2', img2);

        $.ajax({
            url: "http://localhost:8080/cropMonitor/api/v1/fields",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                alert("Field added successfully.");
                resetForm();
                getAllFields();
            },
            error: function () {
                alert("Error adding field.");
            }
        });
    } else {
        alert("Please ensure all fields are correctly filled out.");
    }
}

// Update existing field
function updateField() {
    const fieldData = getFieldData();

    if (fieldData && selectedRow !== null) {
        const formData = new FormData();
        const fieldCode = $(selectedRow).find("td:eq(1)").text(); 

        // Append regular form data
        formData.append('fieldCode', fieldData.fieldCode);
        formData.append('fieldName', fieldData.fieldName);
        formData.append('extentSize', fieldData.extentSize);
        formData.append('latitude', fieldData.latitude); // Latitude for fieldLocation
        formData.append('longitude', fieldData.longitude); // Longitude for fieldLocation
        formData.append('equipmentCode', fieldData.equipmentCode);

        // Append image files if available
        const img1 = $('#image1')[0].files[0];
        const img2 = $('#image2')[0].files[0];

        if (img1) formData.append('image1', img1);
        if (img2) formData.append('image2', img2);

        $.ajax({
            url:`http://localhost:8080/cropMonitor/api/v1/fields/${fieldCode}`,
            method: "PATCH",
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                alert("Field updated successfully.");
                resetForm();
                getAllFields();
                $('#addFieldModal').modal('hide');
            },
            error: function () {
                alert("Error updating field.");
            }
        });
    }
}

// Fetch all fields data
function getAllFields() {
    $.ajax({
        url: "http://localhost:8080/cropMonitor/api/v1/fields/allfields",
        method: "GET",
        success: function (response) {
            const tbody = $('table tbody');
            tbody.empty();

            response.forEach(field => {
                const fieldLocation = field.fieldLocation
                    ? `${field.fieldLocation.x}, ${field.fieldLocation.y}`
                    : 'N/A';

                const row = `
                    <tr data-id="${field.fieldCode}">
                        <td><input type="checkbox"></td>
                        <td>${field.fieldCode}</td>
                        <td>${field.fieldName}</td>
                        <td>${field.extentSize}</td>
                        <td>${fieldLocation}</td>
                        <td>${field.image1 ? `<img src="${field.image1}" alt="Image 1" width="50" height="50">` : 'N/A'}</td>
                        <td>${field.image2 ? `<img src="${field.image2}" alt="Image 2" width="50" height="50">` : 'N/A'}</td>
                        <td>${field.equipmentCode}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editField('${field.fieldCode}')">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteField('${field.fieldCode}')">Delete</button>
                        </td>
                    </tr>
                `;
                tbody.append(row);
            });
        },
        error: function (error) {
            console.error("Error:", error);
            alert("Failed to fetch fields data.");
        }
    });
}

// Edit Field (populate form with data for editing)
function editField(fieldCode) {
    $.ajax({
        url: `http://localhost:8080/cropMonitor/api/v1/fields/${fieldCode}`,
        method: "GET",
        success: function (field) {
            $('#fieldCode').val(field.fieldCode);
            $('#fieldName').val(field.fieldName);
            $('#extentSize').val(field.extentSize);
            $('#latitude').val(field.fieldLocation ? field.fieldLocation.x : '');
            $('#longitude').val(field.fieldLocation ? field.fieldLocation.y : '');
            $('#equipmentCode').val(field.equipmentCode);

            $('#image1').val('');
            $('#image2').val('');

            if (field.image1) {
                $('#img1Preview').html(`<img src="${field.image1}" alt="Image 1" width="100" height="100">`);
            } else {
                $('#img1Preview').html('');
            }

            if (field.image2) {
                $('#img2Preview').html(`<img src="${field.image2}" alt="Image 2" width="100" height="100">`);
            } else {
                $('#img2Preview').html('');
            }

            $('#addFieldModal').modal('show');
        },
        error: function (error) {
            console.error("Error:", error);
            alert("Failed to fetch field details.");
        }
    });
}

// Delete Field
function deleteField(fieldCode) {
    if (confirm("Are you sure you want to delete this field?")) {
        $.ajax({
            url:`http://localhost:8080/cropMonitor/api/v1/fields/${fieldCode}`,
            method: "DELETE",
            success: function () {
                alert("Field deleted successfully!");
                getAllFields();
            },
            error: function (error) {
                console.error("Error:", error);
                alert("Failed to delete field.");
            }
        });
    }
}

// Get data from the form
function getFieldData() {
    let fieldSizeInput = $('#extentSize').val().trim();  
    const extentSize = parseFloat(fieldSizeInput);

    if (isNaN(extentSize) || extentSize <= 0) {
        alert("Please enter a valid field size.");
        return null;
    }

    return {
        fieldCode: $('#fieldCode').val(),
        fieldName: $('#fieldName').val(),
        extentSize: extentSize,  
        latitude: parseFloat($('#latitude').val()),
        longitude: parseFloat($('#longitude').val()),
        equipmentCode: $('#equipmentCode').val()
    };
}

// Reset form
function resetForm() {
    $('#fieldForm')[0].reset();
    selectedRow = null;
    $('#img1Preview').html('');
    $('#img2Preview').html('');
}

// Initialize the application
$(document).ready(function () {
    getAllFields();
});