


export const fetchData = async (url, data = null, method = 'GET', token = null) => {
    const fullUrl = `http://localhost:5000/api/${url}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };


    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log(options, fullUrl)
    console.log(fullUrl)

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(fullUrl, options);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    } catch (error) {
        console.log('Error fetching data:', error.message);
    }
};


export const stack = []