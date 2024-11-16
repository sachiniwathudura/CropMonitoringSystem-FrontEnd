let selectedRow = null;

// Save Log
function saveLog() {
    const logData = getFormData();
    if (logData && selectedRow === null) {
        const newRow = `
            <tr>
                <td><input type="checkbox"></td>
                <td>${logData.logCode}</td>
                <td>${logData.logDate}</td>
                <td>${logData.observationDetails}</td>
                <td>${logData.observedImage}</td>
                <td>${logData.fieldCode}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editLog(this)">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="removeLog(this)">Delete</button>
                </td>
            </tr>
        `;
        $('table tbody').append(newRow);
        resetForm();
        $('#addLogModal').modal('hide');
    } else {
        alert("Please fill in all fields or update an existing entry.");
    }
}

// Update Log
function updateLog() {
    const logData = getFormData();
    if (logData && selectedRow !== null) {
        $(selectedRow).find("td:eq(1)").text(logData.logCode);
        $(selectedRow).find("td:eq(2)").text(logData.logDate);
        $(selectedRow).find("td:eq(3)").text(logData.observationDetails);
        $(selectedRow).find("td:eq(4)").text(logData.observedImage);
        $(selectedRow).find("td:eq(5)").text(logData.fieldCode);

        resetForm();
        $('#addLogModal').modal('hide');
    } else {
        alert("Select a log to update.");
    }
}

// Edit Log
function editLog(button) {
    selectedRow = $(button).closest('tr');
    $('#logCode').val($(selectedRow).find("td:eq(1)").text());
    $('#logDate').val($(selectedRow).find("td:eq(2)").text());
    $('#observationDetails').val($(selectedRow).find("td:eq(3)").text());
    $('#observedImage').val('');
    $('#fieldCode').val($(selectedRow).find("td:eq(5)").text());
    $('#addLogModal').modal('show');
}

// Remove Log
function removeLog(button) {
    $(button).closest('tr').remove();
}

// Get Form Data
function getFormData() {
    const logCode = $('#logCode').val().trim();
    const logDate = $('#logDate').val().trim();
    const observationDetails = $('#observationDetails').val().trim();
    const observedImage = $('#observedImage').val().split('\\').pop();
    const fieldCode = $('#fieldCode').val().trim();

    if (logCode && logDate && observationDetails && observedImage && fieldCode) {
        return { logCode, logDate, observationDetails, observedImage, fieldCode };
    } else {
        alert("All fields are required.");
        return null;
    }
}

// Reset Form
function resetForm() {
    $('#logForm')[0].reset();
    selectedRow = null;
}
