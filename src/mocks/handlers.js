import { HttpResponse, http } from 'msw';

const solve = async ({request}) => {
    const body = await request.json();
    console.log(body)

    // return HttpResponse.json({}, { status: 400, statusText: "error text" })

    return HttpResponse.json({
        code: 'Fact = ([1] ∗ 0).equal -> 1, (([1] ∗ 1).sub.Fact ∗ [1]).mul',
    }, { status: 200 })
}

export const handlers = [
    http.post(`http://127.0.0.1:5000/v1/solve`, solve),
]