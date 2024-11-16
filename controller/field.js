let selectedRow = null;

// Save Field function
function saveField() {
    const fieldData = getFieldData();
    if (fieldData && selectedRow === null) {
        const newRow = `
            <tr>
                <td><input type="checkbox"></td>
                <td>${fieldData.fieldCode}</td>
                <td>${fieldData.fieldName}</td>
                <td>${fieldData.extentSize}</td>
                <td>${fieldData.fieldLocation}</td>
                <td>${fieldData.img1}</td>
                <td>${fieldData.img2}</td>
                <td>${fieldData.equipmentCode}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editField(this)">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="removeField(this)">Delete</button>
                </td>
            </tr>
        `;
        $('table tbody').append(newRow);
        resetForm();
        $('#addFieldModal').modal('hide');
    } else {
        alert("Please fill in all fields or use Update for existing entries.");
    }
}

// Update Field function
function updateField() {
    const fieldData = getFieldData();
    if (fieldData && selectedRow !== null) {
        $(selectedRow).find("td:eq(1)").text(fieldData.fieldCode);
        $(selectedRow).find("td:eq(2)").text(fieldData.fieldName);
        $(selectedRow).find("td:eq(3)").text(fieldData.extentSize);
        $(selectedRow).find("td:eq(4)").text(fieldData.fieldLocation);
        $(selectedRow).find("td:eq(5)").text(fieldData.img1);
        $(selectedRow).find("td:eq(6)").text(fieldData.img2);
        $(selectedRow).find("td:eq(7)").text(fieldData.equipmentCode);

        resetForm();
        $('#addFieldModal').modal('hide');
    } else {
        alert("Select a field to update.");
    }
}

// Delete Field function
function deleteField() {
    if (selectedRow !== null) {
        $(selectedRow).remove();
        resetForm();
        $('#addFieldModal').modal('hide');
    } else {
        alert("Select a field to delete.");
    }
}

// Get All Fields function
function getAllFields() {
    const fields = [];
    $('table tbody tr').each(function() {
        const row = $(this);
        const field = {
            fieldCode: row.find("td:eq(1)").text(),
            fieldName: row.find("td:eq(2)").text(),
            extentSize: row.find("td:eq(3)").text(),
            fieldLocation: row.find("td:eq(4)").text(),
            img1: row.find("td:eq(5)").text(),
            img2: row.find("td:eq(6)").text(),
            equipmentCode: row.find("td:eq(7)").text()
        };
        fields.push(field);
    });
    console.log(fields);
}

// Helper functions
function getFieldData() {
    return {
        fieldCode: $('#fieldCode').val(),
        fieldName: $('#fieldName').val(),
        extentSize: $('#extentSize').val(),
        fieldLocation: $('#fieldLocation').val(),
        img1: $('#img1').val(),
        img2: $('#img2').val(),
        equipmentCode: $('#equipmentCode').val()
    };
}

function resetForm() {
    $('#fieldForm')[0].reset();
    selectedRow = null;
}

function editField(td) {
    selectedRow = $(td).closest('tr');
    $('#fieldCode').val($(selectedRow).find("td:eq(1)").text());
    $('#fieldName').val($(selectedRow).find("td:eq(2)").text());
    $('#extentSize').val($(selectedRow).find("td:eq(3)").text());
    $('#fieldLocation').val($(selectedRow).find("td:eq(4)").text());
    $('#img1').val($(selectedRow).find("td:eq(5)").text());
    $('#img2').val($(selectedRow).find("td:eq(6)").text());
    $('#equipmentCode').val($(selectedRow).find("td:eq(7)").text());
    $('#addFieldModal').modal('show');
}
