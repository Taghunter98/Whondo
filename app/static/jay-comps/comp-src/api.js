export class API {

    constructor(apiURL, apiValues, apiMethod) {

        this.apiURL_    = apiURL;
        this.apiValues_ = apiValues;
        this.apiMethod_ = apiMethod;
    
    }

    jsonify(array) {

        return `'[${JSON.stringify(array)}]'`;
    
    }

    async request() {

        let response;

        if (this.apiMethod_ == "POST") {

            const json = this.jsonify(this.apiValues_);

            console.log(json);
            fetch(this.apiURL_, {
                method: this.apiMethod_,
                body: json,
                headers: {
                    "Content-type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((json) => {

                    if (json['status'] == true) {

                        result.innerHTML   = json['message'];
                        result.style.color = 'green';
                    
                    } else {

                        result.innerHTML   = json['error'];
                        result.style.color = 'red';
                    
                    }
                
                });
        
        } else if (this.apiMethod_ == "GET") {

            response = await fetch(this.apiURL_);
            if (!response.ok) throw new Error(`ERROR: ${response.status}`);
            return response;
        
        }
    
    }

}