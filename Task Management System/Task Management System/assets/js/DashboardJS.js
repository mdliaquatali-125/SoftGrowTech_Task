

document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/dashboard/GetTaskCount", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (res.status === 401) {
                window.location.href = "/Login/Index";
            }
            return res.json();
        })
        .then(res => {
            if (res.Status === "Success") {
                $('#totalTask').text(res.Data.TotalTask);
                $('#pendingTask').text(res.Data.PendingTask);
                $('#inProgressTask').text(res.Data.InProgressTask);
                $('#completeTask').text(res.Data.CompleteTask);
            }
            else if (res.Status === "CatchError") {
                window.location.href = res.URL;
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: res.Message
                });
            }
        })
        .catch(function () {
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "API error occurred"
            });
        });

});

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

// Update every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call

