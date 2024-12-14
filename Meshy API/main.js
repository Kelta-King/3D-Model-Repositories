const axios = require('axios');
const API_KEY = "msy_zDCYC5hexh09TADZnv3uobxESqNbHvonCvjd";

const fetchData = async (taskId) => {
    try {
        const headers = { Authorization: `Bearer ${API_KEY}` };
        const response = await axios.get(
            `https://api.meshy.ai/openapi/v2/text-to-3d/${taskId}`,
            { headers }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

function textTo3d(text) {
    const headers = { Authorization: `Bearer ${API_KEY}` };
    const payload = {
        mode: 'preview',
        prompt: text,
        negative_prompt: 'low quality, low resolution, low poly, ugly',
        art_style: 'realistic',
        should_remesh: true
    };

    const registerData = async () => {
        try {
            const response = await axios.post(
                'https://api.meshy.ai/openapi/v2/text-to-3d',
                payload,
                { headers }
            );
            console.log(response.data);
            taskId = response.data["result"];
            var x = setInterval(async () => {
                var ret = await fetchData(taskId);
                console.log(ret);
                if(ret.data.hasOwnProperty("status")) {
                    if(ret.data["status"] != "IN_PROGRESS") {
                        clearInterval(x);
                    }
                }
            }, 2000);
        } 
        catch (error) {
            console.error(error);
        }
    };

    // Call the fetchData function to execute the request
    registerData();
}

function imageTo3d(url) {
    const headers = { Authorization: `Bearer ${API_KEY}` };
    const payload = {
        // Using data URI example
        // image_url: 'data:image/png;base64,${YOUR_BASE64_ENCODED_IMAGE_DATA}',
        image_url: url,
        enable_pbr: true,
        should_remesh: true
      };

    const registerData = async () => {
        try {
            const response = await axios.post(
                'https://api.meshy.ai/openapi/v1/image-to-3d',
                payload,
                { headers }
            );
            console.log(response.data);
            taskId = response.data["result"];
            var x = setInterval(async () => {
                var ret = await fetchData(taskId);
                console.log(ret);
                if(ret.data.hasOwnProperty("status")) {
                    if(ret.data["status"] != "IN_PROGRESS") {
                        clearInterval(x);
                    }
                }
            }, 2000);
        } 
        catch (error) {
            console.error(error);
        }
    };

    // Call the fetchData function to execute the request
    registerData();
}

// imageTo3d("https://mir-s3-cdn-cf.behance.net/projects/404/9b4f87213687127.Y3JvcCwxMDcwLDgzNywyNjQsMA.jpeg");
// textTo3d("Human brain");