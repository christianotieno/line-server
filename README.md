# System Overview

The system utilizes Node.js and Express to create a server that serves individual lines from a text file using a REST API. It handles GET requests to `/lines/<line index>`. The server supports multiple simultaneous clients.

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
