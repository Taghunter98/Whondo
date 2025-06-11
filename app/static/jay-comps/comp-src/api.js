export class API {

    jsonify(array) {

        return `'[${JSON.stringify(array)}]'`;
    
    }

    async request(apiURL, apiMethod, apiData = null) {

        if (apiMethod === "POST") {

            const json = this.jsonify(apiData);
        
            try {

                const response = await fetch(apiURL, {
                    method: apiMethod,
                    body: json,
                    headers: {
                        "Content-type": "application/json",
                    },
                });

                const jsonData = await response.json();

                return jsonData;
        
            } catch (error) {

                throw new Error("ERROR: Unable to execute request check if the URL is correct");
            
            }
        
        } else if (apiMethod === "GET") {

            try {

                const response = await fetch(apiURL, {
                    method: apiMethod,
                    headers: {
                        "Content-type": "application/json",
                    },
                });
                
                const jsonData = await response.json();

                return jsonData; 
        
            } catch (error) {

                throw new Error("ERROR: Unable to execute request check if the URL is correct");
            
            }
        
        }

    }


}