import { HttpResponse, http } from 'msw';

const solve = async ({request}) => {
    const body = await request.json();
    console.log(body)

    // return HttpResponse.json({}, { status: 400, statusText: "error text" })

    return HttpResponse.json({
        code: 'test code',
    }, { status: 200 })
}

export const handlers = [
    http.post(`http://localhost:5000/v1/solve`, solve),
]