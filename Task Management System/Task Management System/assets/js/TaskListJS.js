
document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");

    function filterTable() {
        const searchValue = searchInput.value.toLowerCase();
        const selectedStatus = statusFilter.value.toLowerCase();

        const rows = document.querySelectorAll("#taskTableBody tr");

        rows.forEach(row => {

            const cells = row.getElementsByTagName("td");

            // Safety check
            if (cells.length === 0) return;

            const title = cells[0].innerText.toLowerCase();
            const description = cells[1].innerText.toLowerCase();
            const status = cells[2].innerText.toLowerCase();

            const matchSearch =
                title.includes(searchValue) ||
                description.includes(searchValue);

            const matchStatus =
                selectedStatus === "" || status === selectedStatus;

            row.style.display = (matchSearch && matchStatus) ? "" : "none";
        });
    }

    searchInput.addEventListener("input", filterTable);
    statusFilter.addEventListener("change", filterTable);

});

document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/task/GetAllTasks")
        .then(res => res.json())
        .then(data => {
            let tableBody = document.getElementById("taskTableBody");
            tableBody.innerHTML = "";
            data.forEach(item => {
                let row = `
                    <tr>
                        <td>${item.Title}</td>
                       <td class="desc-cell" title="${item.Description}">${item.Description}</td>
                        <td>${item.Status}</td>
                          <td>${new Date(item.UploadDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                        <td>${item.UploadFile ? `<a href="${item.UploadFile}" target="_blank">View File</a>` : 'No File'}</td>
                        <td>
                            <a href="javascript:void(0)" onclick='showDetails(${JSON.stringify(item)})' data-toggle="modal" data-target="#exampleModalpopover" class="btn btn-warning btn-sm">
                                <i class="fa fa-eye"></i>
                            </a>                
                           <a href="/Task/Edit?TaskID=${item.TaskID}" class="btn btn-warning btn-sm">
                                <i class="fa fa-edit"></i>
                            </a>
                            <a onclick="DeleteUser('${item.TaskID}')" class="btn btn-sm btn-danger">
                                <i class="fa fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "API error occurred",
                showConfirmButton: true
            });
        });
});

function DeleteUser(TaskID) {
    Swal.fire({
        title: "Delete Task?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {

            fetch(`/api/task/${TaskID}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(res => {
                    if (res.Status === "Success") {
                        Swal.fire({
                            icon: "success",
                            title: "Good Job!",
                            text: res.Message
                        }).then(() => { window.location.href = res.URL; });
                    }
                    else if (res.Status === "CatchError") {
                        if (res.URL && res.URL !== "") {
                            window.location.href = res.URL;
                        }
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: res.Message,
                            showConfirmButton: true
                        }).then(() => {
                            if (res.URL && res.URL !== "") {
                                window.location.href = res.URL;
                            }
                        });
                    }
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: "Failed!",
                        text: "Delete API error"
                    });
                });

        }
        else {
            Swal.fire({
                title: "Cancelled",
                text: "Operation Cancelled :)",
                icon: "error",
                confirmButtonColor: "#5664d2"
            });
        }
    });
}

function updateDateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const day = now.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    // Greeting based on time
    let greeting = "Hello!";
    if (hours >= 5 && hours < 12) {
        greeting = "Good Morning!";
    } else if (hours >= 12 && hours < 17) {
        greeting = "Good Afternoon!";
    } else if (hours >= 17 && hours < 21) {
        greeting = "Good Evening!";
    } else {
        greeting = "Good Night!";
    }
    // Update DOM
    document.getElementById("greeting").innerText = greeting;
    document.getElementById("date-time").innerText = `${day} | ${hours}:${minutes}:${seconds}`;
}

function showDetails(item) {
    document.getElementById("detailTitle").innerText = item.Title;
    document.getElementById("detailDesc").innerText = item.Description;
    document.getElementById("detailStatus").innerText = item.Status;
    document.getElementById("detailDate").innerText = new Date(item.UploadDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    document.getElementById("uploadfile").innerHTML = item.UploadFile ? `<a href="${item.UploadFile}" target="_blank">View File</a>` : 'No File';
}

// Update every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call

