const { spawn } = require("child_process");

// Function to call the Python script
function callPythonScript(imageUrl) {
    return new Promise((resolve, reject) => {
        // Spawn a new Python process
        const pythonProcess = spawn("python", ["pyScript.py", imageUrl]);

        let result = "";

        // Capture data from the Python script's stdout
        pythonProcess.stdout.on("data", (data) => {
            result += data.toString();
        });

        // Handle errors
        pythonProcess.stderr.on("data", (data) => {
            console.error(`Python error: ${data.toString()}`);
            reject(data.toString());
        });

        // When the Python process finishes
        pythonProcess.on("close", (code) => {
            if (code === 0) {
                try {
                    resolve(JSON.parse(result)); // Parse the JSON result
                } 
                catch (err) {
                    reject(`Failed to parse Python output: ${err}`);
                }
            } 
            else {
                reject(`Python process exited with code ${code}`);
            }
        });
    });
}

// Example usage
const imageUrl = "https://img.freepik.com/free-vector/vector-hand-drawn-timothy-font-typography_53876-174787.jpg";

callPythonScript(imageUrl)
    .then((response) => {
        console.log("Recognition Result:", response);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
