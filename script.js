document.addEventListener('DOMContentLoaded', () => {
    // Initial page animation fix
    requestAnimationFrame(() => {
        document.body.style.opacity = '0';
        requestAnimationFrame(() => {
            document.body.style.opacity = '';
        });
    });

    // Handle navigation transitions
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('http') || href.startsWith('//')) return;

            e.preventDefault();
            document.body.classList.add('page-exiting');

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
});

class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.distance = Infinity;
        this.isVisited = false;
        this.previousNode = null;
        this.isWall = false;
        this.weight = 1;
    }
}

class PathFinder {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.startNode = null;
        this.endNode = null;
        this.isVisualizing = false;
        this.speed = 50;
        this.currentTool = 'wall';
        this.visitedNodes = [];
        this.finalPath = [];
        this.initializeGrid();
        this.setupEventListeners();
    }

    initializeGrid() {
        const gridElement = document.getElementById('grid');
        gridElement.innerHTML = '';
        
        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const node = new Node(row, col);
                this.grid[row][col] = node;
                
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                gridElement.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        const grid = document.getElementById('grid');
        const startBtn = document.getElementById('start');
        const clearBtn = document.getElementById('clear');
        const resetBtn = document.getElementById('reset');
        const speedSlider = document.getElementById('speed');
        const toolButtons = document.querySelectorAll('.tool-btn');
        const algorithmSelect = document.getElementById('algorithm');

        let isDrawing = false;

        // Algorithm dropdown enhancement
        algorithmSelect.addEventListener('focus', () => {
            algorithmSelect.parentElement.classList.add('dropdown-open');
        });
        
        algorithmSelect.addEventListener('blur', () => {
            algorithmSelect.parentElement.classList.remove('dropdown-open');
        });

        // Tool selection
        toolButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toolButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTool = btn.dataset.tool;
            });
        });

        // Grid interaction
        grid.addEventListener('mousedown', (e) => {
            if (this.isVisualizing) return;
            isDrawing = true;
            this.handleCellInteraction(e);
        });

        grid.addEventListener('mousemove', (e) => {
            if (isDrawing && this.currentTool === 'wall') {
                this.handleCellInteraction(e);
            }
        });

        grid.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        // Control buttons
        startBtn.addEventListener('click', () => this.startVisualization());
        clearBtn.addEventListener('click', () => this.clearGrid());
        resetBtn.addEventListener('click', () => this.resetPath());
        speedSlider.addEventListener('input', (e) => {
            this.speed = 101 - e.target.value;
        });
    }

    updateSidebar() {
        // Update start node
        const startCoord = document.getElementById('start-node-coord');
        if (this.startNode) {
            startCoord.innerHTML = `<div class="coordinate">(${this.startNode.row}, ${this.startNode.col})</div>`;
        } else {
            startCoord.innerHTML = '<div class="coordinate">Not set</div>';
        }

        // Update end node
        const endCoord = document.getElementById('end-node-coord');
        if (this.endNode) {
            endCoord.innerHTML = `<div class="coordinate">(${this.endNode.row}, ${this.endNode.col})</div>`;
        } else {
            endCoord.innerHTML = '<div class="coordinate">Not set</div>';
        }

        // Update visited nodes
        const visitedNodes = document.getElementById('visited-nodes');
        visitedNodes.innerHTML = this.visitedNodes.map(node => {
            const weightClass = node.weight > 1 ? 'weight' : '';
            return `<div class="coordinate ${weightClass}">(${node.row}, ${node.col})</div>`;
        }).join('');

        // Update final path
        const finalPath = document.getElementById('final-path');
        finalPath.innerHTML = this.finalPath.map(node => {
            const weightClass = node.weight > 1 ? 'weight' : '';
            const pathClass = 'path';
            return `<div class="coordinate ${weightClass} ${pathClass}">(${node.row}, ${node.col})</div>`;
        }).join('');
    }

    handleCellInteraction(e) {
        const cell = e.target;
        if (!cell.classList.contains('cell')) return;

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const node = this.grid[row][col];

        switch (this.currentTool) {
            case 'wall':
                if (node !== this.startNode && node !== this.endNode) {
                    // Toggle wall on/off
                    if (node.isWall) {
                        node.isWall = false;
                        cell.classList.remove('wall');
                    } else {
                        node.isWall = true;
                        cell.classList.add('wall');
                        // If it was a weight, remove weight properties
                        if (node.weight > 1) {
                            node.weight = 1;
                            cell.classList.remove('weight');
                        }
                    }
                }
                break;
            case 'weight':
                if (node !== this.startNode && node !== this.endNode) {
                    // Toggle weight on/off
                    if (node.weight > 1) {
                        node.weight = 1;
                        cell.classList.remove('weight');
                    } else {
                        // Don't apply weight if it's a wall
                        if (!node.isWall) {
                            node.weight = 5;
                            cell.classList.add('weight');
                        }
                    }
                }
                break;
            case 'start':
                if (node !== this.endNode && !node.isWall) {
                    if (this.startNode) {
                        const startCell = document.querySelector(`[data-row="${this.startNode.row}"][data-col="${this.startNode.col}"]`);
                        startCell.classList.remove('start');
                    }
                    this.startNode = node;
                    cell.classList.add('start');
                }
                break;
            case 'end':
                if (node !== this.startNode && !node.isWall) {
                    if (this.endNode) {
                        const endCell = document.querySelector(`[data-row="${this.endNode.row}"][data-col="${this.endNode.col}"]`);
                        endCell.classList.remove('end');
                    }
                    this.endNode = node;
                    cell.classList.add('end');
                }
                break;
        }
        this.updateSidebar();
    }

    clearGrid() {
        this.initializeGrid();
        this.startNode = null;
        this.endNode = null;
        this.visitedNodes = [];
        this.finalPath = [];
        this.updateSidebar();
    }

    resetPath() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('visited', 'path');
        });
        if (this.startNode) {
            const startCell = document.querySelector(`[data-row="${this.startNode.row}"][data-col="${this.startNode.col}"]`);
            startCell.classList.add('start');
        }
        if (this.endNode) {
            const endCell = document.querySelector(`[data-row="${this.endNode.row}"][data-col="${this.endNode.col}"]`);
            endCell.classList.add('end');
        }
        this.visitedNodes = [];
        this.finalPath = [];
        this.updateSidebar();
    }

    async startVisualization() {
        if (!this.startNode || !this.endNode || this.isVisualizing) return;

        this.isVisualizing = true;
        const algorithm = document.getElementById('algorithm').value;
        
        switch (algorithm) {
            case 'dijkstra':
                await this.visualizeDijkstra();
                break;
            case 'bfs':
                await this.visualizeBFS();
                break;
            case 'astar':
                await this.visualizeAStar();
                break;
        }

        this.isVisualizing = false;
    }

    getNeighbors(node) {
        const neighbors = [];
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1]
        ];

        for (const [dx, dy] of directions) {
            const newRow = node.row + dx;
            const newCol = node.col + dy;

            if (newRow >= 0 && newRow < this.rows && 
                newCol >= 0 && newCol < this.cols) {
                const neighbor = this.grid[newRow][newCol];
                if (!neighbor.isWall) {
                    neighbors.push(neighbor);
                }
            }
        }

        return neighbors;
    }

    async visualizeDijkstra() {
        const unvisitedNodes = [];
        this.visitedNodes = [];
        
        // Reset distances
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col].distance = Infinity;
                this.grid[row][col].isVisited = false;
                this.grid[row][col].previousNode = null;
            }
        }

        this.startNode.distance = 0;
        unvisitedNodes.push(this.startNode);

        while (unvisitedNodes.length > 0) {
            unvisitedNodes.sort((a, b) => a.distance - b.distance);
            const currentNode = unvisitedNodes.shift();

            if (currentNode === this.endNode) {
                break;
            }

            currentNode.isVisited = true;
            this.visitedNodes.push(currentNode);

            const cell = document.querySelector(`[data-row="${currentNode.row}"][data-col="${currentNode.col}"]`);
            if (currentNode.weight > 1) {
                cell.classList.add('weight', 'visited');
            } else {
                cell.classList.add('visited');
            }

            this.updateSidebar();
            await new Promise(resolve => setTimeout(resolve, this.speed));

            const neighbors = this.getNeighbors(currentNode);
            for (const neighbor of neighbors) {
                if (!neighbor.isVisited) {
                    const newDistance = currentNode.distance + neighbor.weight;
                    if (newDistance < neighbor.distance) {
                        neighbor.distance = newDistance;
                        neighbor.previousNode = currentNode;
                        unvisitedNodes.push(neighbor);
                    }
                }
            }
        }

        await this.visualizePath();
    }

    async visualizeBFS() {
        const queue = [this.startNode];
        const visited = new Set();
        this.visitedNodes = [];
        this.startNode.isVisited = true;
        visited.add(this.startNode);

        while (queue.length > 0) {
            const currentNode = queue.shift();

            if (currentNode === this.endNode) {
                break;
            }

            const cell = document.querySelector(`[data-row="${currentNode.row}"][data-col="${currentNode.col}"]`);
            if (currentNode.weight > 1) {
                cell.classList.add('weight', 'visited');
            } else {
                cell.classList.add('visited');
            }

            this.visitedNodes.push(currentNode);
            this.updateSidebar();
            await new Promise(resolve => setTimeout(resolve, this.speed));

            const neighbors = this.getNeighbors(currentNode);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    neighbor.isVisited = true;
                    neighbor.previousNode = currentNode;
                    queue.push(neighbor);
                }
            }
        }

        await this.visualizePath();
    }

    async visualizeAStar() {
        const openSet = [this.startNode];
        const closedSet = new Set();
        const fScore = new Map();
        const gScore = new Map();
        this.visitedNodes = [];

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                fScore.set(this.grid[row][col], Infinity);
                gScore.set(this.grid[row][col], Infinity);
            }
        }

        gScore.set(this.startNode, 0);
        fScore.set(this.startNode, this.heuristic(this.startNode, this.endNode));

        while (openSet.length > 0) {
            openSet.sort((a, b) => fScore.get(a) - fScore.get(b));
            const currentNode = openSet.shift();

            if (currentNode === this.endNode) {
                break;
            }

            closedSet.add(currentNode);
            currentNode.isVisited = true;
            this.visitedNodes.push(currentNode);

            const cell = document.querySelector(`[data-row="${currentNode.row}"][data-col="${currentNode.col}"]`);
            if (currentNode.weight > 1) {
                cell.classList.add('weight', 'visited');
            } else {
                cell.classList.add('visited');
            }

            this.updateSidebar();
            await new Promise(resolve => setTimeout(resolve, this.speed));

            const neighbors = this.getNeighbors(currentNode);
            for (const neighbor of neighbors) {
                if (closedSet.has(neighbor)) continue;

                const tentativeGScore = gScore.get(currentNode) + neighbor.weight;
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                    gScore.set(neighbor, tentativeGScore);
                    fScore.set(neighbor, gScore.get(neighbor) + this.heuristic(neighbor, this.endNode));
                    neighbor.previousNode = currentNode;
                } else if (tentativeGScore < gScore.get(neighbor)) {
                    gScore.set(neighbor, tentativeGScore);
                    fScore.set(neighbor, gScore.get(neighbor) + this.heuristic(neighbor, this.endNode));
                    neighbor.previousNode = currentNode;
                }
            }
        }

        await this.visualizePath();
    }

    heuristic(a, b) {
        return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
    }

    async visualizePath() {
        let currentNode = this.endNode;
        this.finalPath = [];

        while (currentNode !== null) {
            this.finalPath.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }

        for (const node of this.finalPath) {
            const cell = document.querySelector(`[data-row="${node.row}"][data-col="${node.col}"]`);
            if (node.weight > 1) {
                cell.classList.add('weight', 'path');
            } else {
                cell.classList.add('path');
            }
            this.updateSidebar();
            await new Promise(resolve => setTimeout(resolve, this.speed * 0.5));
        }
    }
}

// Add this near the top of your script.js file, after the PathFinder class definition
class ThemeManager {
    constructor() {
        this.themeBtn = document.getElementById('theme-toggle');
        this.root = document.documentElement;
        this.currentTheme = 'dark';
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        }
        
        this.themeBtn.addEventListener('click', () => {
            const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        if (theme === 'light') {
            this.root.classList.add('light-theme');
        } else {
            this.root.classList.remove('light-theme');
        }
        localStorage.setItem('theme', theme);
    }
}

// Initialize the pathfinder when the page loads
window.addEventListener('load', () => {
    new PathFinder(25, 40);
    new ThemeManager();
});