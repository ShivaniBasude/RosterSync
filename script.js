const services = [

    "DHCP",
    "DNS",
    "WebProxy",
    "Firewall",
    "VPN",
    "LoadBalancer",
    "Database",
    "Authentication",
    "Analytics",
    "Monitoring",
    "Backup",
    "FileServer",
    "Email",
    "WebServer",
    "Proxy",
    "Logging"

];

const edges = [

    ['DHCP', 'DNS'],
    ['DNS', 'WebProxy'],
    ['WebProxy', 'Firewall'],
    ['Firewall', 'VPN'],
    ['VPN', 'DNS'],

    ['Database', 'Authentication'],
    ['Authentication', 'Analytics'],

    ['Logging', 'Monitoring'],
    ['Monitoring', 'Backup'],
    ['Backup', 'FileServer'],
    ['FileServer', 'Analytics'],

    ['Email', 'WebServer'],
    ['Database', 'WebServer'],
    ['WebServer', 'LoadBalancer'],

    ['Proxy', 'Email']

];

const elements = [];

services.forEach(service => {

    elements.push({
        data: { id: service }
    });

});

edges.forEach(edge => {

    elements.push({
        data: {
            source: edge[0],
            target: edge[1]
        }
    });

});

const cy = cytoscape({

    container: document.getElementById('cy'),

    elements: elements,

    style: [

        {
            selector: 'node',
            style: {
                'background-color': '#2563eb',
                'label': 'data(id)',
                'color': 'white',
                'text-valign': 'center',
                'text-halign': 'center',
                'font-size': '10px',
                'width': 50,
                'height': 50
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#94a3b8',
                'target-arrow-color': '#94a3b8',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        }

    ],

    layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 20
    }

});



// ---------------------
// TOPOLOGICAL ORDER
// ---------------------

const topoOrder = [

    "DHCP",
    "DNS",
    "WebProxy",
    "Firewall",
    "VPN",
    "Database",
    "Authentication",
    "Logging",
    "Monitoring",
    "Backup",
    "FileServer",
    "Proxy",
    "Email",
    "WebServer",
    "Analytics",
    "LoadBalancer"

];

const topologyList = document.getElementById("topology-list");

topologyList.innerHTML = "";

topoOrder.forEach(service => {

    const li = document.createElement("li");

    li.innerText = service;

    topologyList.appendChild(li);

});



// ---------------------
// SERVICE BOOT ANIMATION
// ---------------------

let serviceIndex = 0;

function animateServices() {

    if (serviceIndex >= topoOrder.length)
        return;

    const service = topoOrder[serviceIndex];

    const node = cy.getElementById(service);

    node.style("background-color", "green");

    addLog(`Service Started: ${service}`);

    serviceIndex++;

    setTimeout(animateServices, 1000);

}

animateServices();



// ---------------------
// JOB SCHEDULER
// ---------------------

let jobs = [

    {
        name: "HugeBackup",
        priority: 10,
        remaining: 15,
        waiting: 0,
        status: "Waiting"
    },

    {
        name: "Video1",
        priority: 1,
        remaining: 3,
        waiting: 0,
        status: "Waiting"
    },

    {
        name: "Video2",
        priority: 1,
        remaining: 3,
        waiting: 0,
        status: "Waiting"
    },

    {
        name: "OSUpdate",
        priority: 2,
        remaining: 5,
        waiting: 0,
        status: "Waiting"
    },

    {
        name: "Analytics",
        priority: 3,
        remaining: 6,
        waiting: 0,
        status: "Waiting"
    }

];

const tableBody = document.getElementById("job-table");

function renderJobs() {

    tableBody.innerHTML = "";

    jobs.forEach(job => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${job.name}</td>
            <td>${job.priority}</td>
            <td>${job.remaining}</td>
            <td class="${job.status.toLowerCase()}">${job.status}</td>

        `;

        tableBody.appendChild(row);

    });

}

renderJobs();



// ---------------------
// LOG FUNCTION
// ---------------------

function addLog(message) {

    const logs = document.getElementById("logs");

    const p = document.createElement("p");

    p.innerText = message;

    logs.prepend(p);

}



// ---------------------
// DYNAMIC SCHEDULER
// ---------------------

let currentJob = null;

function scheduleJobs() {

    let readyJobs = jobs.filter(job => job.remaining > 0);

    if (readyJobs.length === 0) {

        addLog("Scheduling Complete");

        return;

    }

    // SORT BY PRIORITY
    readyJobs.sort((a, b) => a.priority - b.priority);

    let highest = readyJobs[0];

    // CONTEXT SWITCH
    if (currentJob && currentJob.name !== highest.name) {

        addLog(`Context Switch: ${currentJob.name} → ${highest.name}`);

    }

    currentJob = highest;

    // RESET STATUS
    jobs.forEach(job => {

        if (job.remaining > 0)
            job.status = "Waiting";

    });

    highest.status = "Running";

    addLog(`${highest.name} executing`);

    highest.remaining--;

    // AGING
    jobs.forEach(job => {

        if (job.name !== highest.name && job.remaining > 0) {

            job.waiting++;

            if (job.waiting >= 3 && job.priority > 1) {

                job.priority--;

                job.waiting = 0;

                addLog(`Aging Applied to ${job.name}`);

            }

        }

    });

    // COMPLETION
    if (highest.remaining === 0) {

        highest.status = "Completed";

        addLog(`${highest.name} finished`);

    }

    renderJobs();

    setTimeout(scheduleJobs, 2000);

}

setTimeout(scheduleJobs, 3000);