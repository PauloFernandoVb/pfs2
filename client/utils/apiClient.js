const Base_url = "http://localhost:5000/";

export default class ApiClient {

    static get(endpoint) {
        fetch(`${Base_url}${endpoint}`, {
            method: "GET",
            credentials: "include"
        })
    }

    static post(endpoint, body) {
        fetch(`${Base_url}${endpoint}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "apllication/json"
            },
            body: JSON.stringify(body)
        })
        //fazer a checagem da resposta
        //resposta.ok??
        //desserlizar o corpo da resposta
    }

    //fazer os soutros metodos: Delet, put postFormData
}