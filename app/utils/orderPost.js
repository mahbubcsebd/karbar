const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function orderPost(orderData) {
    const res = await fetch(`${baseUrl}/product-order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: orderData,
    });

    const data = await res.json();
    return Response.json(data);
}
