const inputTask = document.getElementById('input-task');
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

taskForm.addEventListener('submit', function (event) {
  event.preventDefault();

    const namaTask = inputTask.value.trim();
    const priority = inputPriority.value;  

    // Kalau input kosong, tidak melakukan apa-apa
  if (namaTask === " "){
    return;
  }

  const li = document.createElement('li');

  // menyimpan status dan prioritas
  li.setAttribute('status', 'incomplete');
  li.setAttribute('priority', priority);

  // membuat nama taks
  const nama = document.createElement("span")
  nama.textContent = namaTask;

  // membuat tulisan prioritas
  const prioritas = document.createElement("span")
  prioritas.textContent = priority;
  prioritas.className = "priority";

  // membuat tombol selesai
    const tombolSelesai = document.createElement("button");
    tombolSelesai.textContent = "Complete";
    tombolSelesai.type = "button";
  
    // membuat tombol hapus
    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Delete";
    tombolHapus.type = "button";

    // menambahkan elemen ke li
    li.appendChild(nama);
    li.appendChild(prioritas);
    li.appendChild(tombolSelesai);
    li.appendChild(tombolHapus);

    // menambahkan li ke taskList
    taskList.appendChild(li);

    // memperbarui status task 
    tombolSelesai.addEventListener("click", function () {
        const status = li.getAttribute("status");
        
        if (status === "incomplete") {
            li.setAttribute("status", "complete");
            tombolSelesai.textContent = "Incomplete";
            nama.style.textDecoration = "line-through";
        }
        else {
            li.setAttribute("status", "incomplete");
            tombolSelesai.textContent = "Complete";
            nama.style.textDecoration = "none";
        }

        updateTampilan();
    });

    // menghapus task
    tombolHapus.addEventListener("click", function () {
        li.remove();
        updateTampilan();
    });

      // Mengosongkan input
  inputTask.value = "";

  updateTampilan();
});

