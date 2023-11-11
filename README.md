# System Overview

The system utilizes Node.js and Express to create a server that serves individual lines from a text file using a REST API. It handles GET requests to `/lines/<line index>`. The server supports multiple simultaneous clients.

## Setting Up the Project

- Clone or Download the Repository: Make sure you have the project files on your local machine.
- Install Node.js: If you haven't already, download and install Node.js from its website. This will also install npm, the Node Package Manager.
- Install Dependencies: Open a terminal or command prompt in the project directory and run:

```bash
npm install
```

**Building the Project:**
To compile TypeScript files to JavaScript, execute the build script:

```bash
./build.sh
```

**Running the Server:**
To start the server, execute the run script and provide the file you want to serve:
For example, assuming you want to serve a file named example.txt:

```bash
./run.sh example.txt
```

> Replace example.txt with the actual file you want your server to serve.

## Testing the Server

- Send Requests: Use a tool like Postman or simply a web browser to send GET requests to the endpoints defined in your server (e.g., http://localhost:3000/lines/4?file=example.txt).

Or use curl request

curl -i http://localhost:3000/lines/4?file=example.txt

- Observe Responses: Check the responses you receive. You should observe the server behaves as expected, returning the appropriate line from the file or handling edge cases like when requesting a line beyond the end of the file.

## Performance Evaluation

**File Size Handling:**

- 1GB: Should handle well, as individual lines are read on request without loading the entire file into memory.
- 10GB: Still efficient due to the line-by-line retrieval method.
- 100GB: Might start to show some latency, especially with higher user loads.

**User Load:**

- 100 users: The system should handle this without significant issues.
- 10,000 users: Might experience some latency due to increased concurrent requests.
- 1,000,000 users: Will likely face considerable performance degradation; consider scaling or optimizing further.

### References

Consulted `Node.js` and `Express` documentation, along with discussions on efficient file handling in Node.js.

### Third-Party Tools

Utilizes `Express.js` for the REST API due to its simplicity and effectiveness in handling HTTP requests.

### Time Spent

Approximately 4 hours. Given more time, optimizations could focus on better file handling for larger files and load balancing techniques for increased user loads.

### Self-Critique

The code is structured well but might encounter challenges with extremely large files and high user loads. This could be addressed through stream-based file reading and load balancing strategies.
