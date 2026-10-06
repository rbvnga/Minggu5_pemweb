const inputTask = document.getElementById('input-task');
const inputDate = document.getElementById('input-date');
const taskForm = document.getElementById('task-form');
const inputPriority = document.getElementById('input-priority');
const taskList = document.getElementById('task-list');
const noTasksMessage = document.getElementById('no-tasks-message');
const taskCount = document.getElementById('task-count');
const clearTasksButton = document.getElementById('clear-tasks');

const filterStatusButtons = document.querySelectorAll('.btn-filter-status');
const filterPriorityButtons = document.querySelectorAll('.btn-filter-priority');

let statusFilter = 'all';
let priorityFilter = 'all';

function hariIni() {
    const d = new Date();
    const bulan = String(d.getMonth() + 1).padStart(2, '0');
    const tanggal = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + bulan + '-' + tanggal;
}

function formatTanggal(str) {
    const bagian = str.split('-');
    const d = new Date(bagian[0], bagian[1] - 1, bagian[2]);
    return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const namaTask = inputTask.value.trim();
    const priority = inputPriority.value;
    const dueDate = inputDate.value;

    if (namaTask === "") {
        return;
    }

    const li = document.createElement('li');
    li.className = "task-item " + priority;

    li.setAttribute('status', 'incomplete');
    li.setAttribute('priority', priority);
    li.setAttribute('due', dueDate);

    const info = document.createElement("div");
    info.className = "task-info";

    const nama = document.createElement("span");
    nama.className = "task-name";
    nama.textContent = namaTask;

    const meta = document.createElement("div");
    meta.className = "task-meta";

    const prioritas = document.createElement("span");
    prioritas.textContent = priority;
    prioritas.className = "priority-badge " + priority;
    meta.appendChild(prioritas);

    const tanggal = document.createElement("span");
    tanggal.className = "task-date";
    if (dueDate !== "") {
        tanggal.textContent = "Due: " + formatTanggal(dueDate);
        meta.appendChild(tanggal);
    }

    info.appendChild(nama);
    info.appendChild(meta);

    const aksi = document.createElement("div");
    aksi.className = "task-actions";

    const tombolSelesai = document.createElement("button");
    tombolSelesai.textContent = "Complete";
    tombolSelesai.type = "button";
    tombolSelesai.className = "btn-complete";

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Delete";
    tombolHapus.type = "button";
    tombolHapus.className = "btn-delete";

    aksi.appendChild(tombolSelesai);
    aksi.appendChild(tombolHapus);

    li.appendChild(info);
    li.appendChild(aksi);

    taskList.appendChild(li);

    tombolSelesai.addEventListener("click", function () {
        const status = li.getAttribute("status");

        if (status === "incomplete") {
            li.setAttribute("status", "complete");
            li.classList.add("completed");
            tombolSelesai.textContent = "Undo";
        }
        else {
            li.setAttribute("status", "incomplete");
            li.classList.remove("completed");
            tombolSelesai.textContent = "Complete";
        }

        updateTampilan();
    });

    tombolHapus.addEventListener("click", function () {
        li.remove();
        updateTampilan();
    });

    inputTask.value = "";
    inputDate.value = "";
    inputPriority.value = "medium";

    updateTampilan();
});

for (let i = 0; i < filterStatusButtons.length; i++) {
    filterStatusButtons[i].addEventListener("click", function () {
        for (let j = 0; j < filterStatusButtons.length; j++) {
            filterStatusButtons[j].classList.remove("active");
        }
        this.classList.add("active");
        statusFilter = this.getAttribute("data-status");
        updateTampilan();
    });
}

for (let i = 0; i < filterPriorityButtons.length; i++) {
    filterPriorityButtons[i].addEventListener("click", function () {
        for (let j = 0; j < filterPriorityButtons.length; j++) {
            filterPriorityButtons[j].classList.remove("active");
        }
        this.classList.add("active");
        priorityFilter = this.getAttribute("data-priority");
        updateTampilan();
    });
}

clearTasksButton.addEventListener("click", function () {
    const tasks = taskList.querySelectorAll("li");

    for (let i = 0; i < tasks.length; i++) {
        const status = tasks[i].getAttribute("status");

        if (status === "complete") {
            tasks[i].remove();
        }
    }

    updateTampilan();
});

function updateTampilan() {
    const tasks = taskList.getElementsByTagName("li");

    let visibleCount = 0;
    let totalCount = tasks.length;
    let incompleteTasks = 0;

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const status = task.getAttribute("status");
        const priority = task.getAttribute("priority");
        const due = task.getAttribute("due");

        if (status === "incomplete") {
            incompleteTasks++;
        }

        const tanggal = task.querySelector(".task-date");
        if (tanggal) {
            if (status === "incomplete" && due < hariIni()) {
                tanggal.classList.add("overdue");
            } else {
                tanggal.classList.remove("overdue");
            }
        }

        let tampilkan = true;

        if (statusFilter !== "all" && status !== statusFilter) {
            tampilkan = false;
        }
        if (priorityFilter !== "all" && priority !== priorityFilter) {
            tampilkan = false;
        }

        if (tampilkan === true) {
            task.style.display = "";
            visibleCount++;
        }
        else {
            task.style.display = "none";
        }
    }

    taskCount.textContent = incompleteTasks + " tasks available";

    if (totalCount === 0) {
        noTasksMessage.textContent = "No tasks available. Take it easy";
        noTasksMessage.style.display = "block";
    }
    else if (visibleCount === 0) {
        noTasksMessage.textContent = "Nothing here for this filter. Stay chill";
        noTasksMessage.style.display = "block";
    }
    else {
        noTasksMessage.style.display = "none";
    }
}

updateTampilan();