# PathViz - Interactive Pathfinding Visualizer

PathViz is an interactive web application designed to visualize various pathfinding algorithms in action on a grid. It provides a user-friendly interface to understand how algorithms like Dijkstra's, A*, BFS, and DFS explore a grid to find the shortest path between two points, considering obstacles (walls) and varying costs (weights).

## Visualise Here:

### [thePathviz](https://thepathviz.netlify.app "thePathviz")

## ✨ Features

*   **Multiple Algorithms:** Visualize and compare popular pathfinding algorithms:
    *   Dijkstra's Algorithm
    *   A\* Search
    *   Breadth-First Search (BFS)
    *   Depth-First Search (DFS)
*   **Interactive Grid:**
    *   Click and drag to draw Walls.
    *   Click to place weighted nodes (higher cost to traverse).
    *   Set custom Start and End nodes.
*   **Real-time Visualization:** Watch the algorithms explore the grid step-by-step, highlighting visited nodes and the final shortest path.
*   **Adjustable Speed:** Control the visualization speed using a slider (located in the navbar on desktop/tablet and below the grid on mobile).
*   **Grid Controls:**
    *   **Start:** Begin the visualization of the selected algorithm.
    *   **Clear:** Completely reset the grid, removing walls, weights, start/end nodes, and visualization results.
    *   **Reset:** Clear only the visualized path and visited nodes, keeping the walls, weights, start, and end points intact.
*   **Responsive Design:** Adapts seamlessly to various screen sizes (desktop, tablet, mobile).
*   **Mobile-Friendly Sidebar:** On smaller screens, a collapsible sidebar provides easy access to navigation, controls (Start, Clear, Reset), and tools (Wall, Weight, Start, End).
*   **Coordinate Display:** A dedicated sidebar (on desktop/tablet) or section below the grid (on mobile) shows the coordinates of:
    *   Start Node
    *   End Node
    *   Visited Nodes (scrollable list)
    *   Final Path Nodes (scrollable list)
*   **Theme Toggle:** Switch between Dark and Light themes for optimal viewing comfort. Theme preference is saved in local storage.
*   **Smooth Transitions:** Subtle animations enhance the user experience during page navigation and algorithm visualization.
*   **Dedicated Pages:**
    *   **Home:** Landing page introducing the project.
    *   **Visualizer:** The main interactive application page.
    *   **About:** Information about the project and the development team.

## 💻 Technologies Used

*   **Frontend:** HTML5, CSS3, JavaScript
*   **CSS Features:** Flexbox, Grid Layout, Custom Properties (Variables), Animations, Media Queries
*   **Libraries/Frameworks:** None (Vanilla JS)
*   **Icons:** Font Awesome
*   **Fonts:** Google Fonts (Nunito, JetBrains Mono)

## 📂 Project Structure

```
.
├── assets/
│   └── Pathviz_favicon.png     # Logo/Favicon image
├── about.css                   # Styles for the About page
├── about.html                  # About page HTML
├── about.js                    # JavaScript for the About page (menu, theme)
├── index.html                  # Home/Landing page HTML
├── script.js                   # Core JavaScript for the Visualizer (grid, algorithms, UI)
├── styles.css                  # Main CSS for the Visualizer page
├── visualizer.html             # Visualizer page HTML
└── README.md                   # This file
```

## 🚀 How to Use

1.  **Select Algorithm:** Choose the desired pathfinding algorithm from the dropdown menu in the navbar.
2.  **Prepare the Grid:**
    *   Select the **Wall** tool (default) and click/drag on the grid cells to create obstacles.
    *   Select the **Weight** tool and click on cells to add weights (making them more "expensive" to traverse). Clicking again removes the weight. Walls cannot be weights.
    *   Select the **Start** tool and click on a cell to set the starting point.
    *   Select the **End** tool and click on a cell to set the destination point.
    *   *(On mobile, use the tools within the collapsible sidebar menu).*
3.  **Adjust Speed (Optional):** Use the speed slider to control how fast the visualization runs. Faster is to the left, slower to the right.
4.  **Visualize:** Click the **Start** button in the navbar (or mobile sidebar).
5.  **Observe:** Watch the algorithm work. Visited nodes are highlighted according to the chosen theme, and the final shortest path (if found) is drawn. The coordinate display sidebar/section updates in real-time.
6.  **Clear/Reset:**
    *   Use **Reset** to clear the visualization (visited/path nodes) but keep your grid setup.
    *   Use **Clear** to wipe the entire grid back to its initial state.
7.  **Theme:** Click the sun/moon icon in the navbar to toggle between light and dark modes.

## 🛠️ Setup for Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/PathViz-Interactive_Pathfinding_Visualizer.git
    cd PathViz-Interactive_Pathfinding_Visualizer
    ```
2.  **Open in Browser:** Simply open the `index.html` or `visualizer.html` file in your web browser. No build process or local server is strictly required for basic viewing, but using a tool like VS Code's Live Server is recommended for development.

