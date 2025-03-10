export async function POST(req) {
    try {
        const body = await req.json();
        const { event_name, event_source_url, user_data, pixel_id, token } =
            body;

        if (!pixel_id || !token) {
            return new Response(
                JSON.stringify({ error: 'Pixel ID or Token is missing' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const response = await fetch(
            `https://graph.facebook.com/v18.0/${pixel_id}/events`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: [
                        {
                            event_name,
                            event_time: Math.floor(Date.now() / 1000),
                            event_source_url,
                            action_source: 'website',
                            user_data,
                        },
                    ],
                    access_token: token,
                }),
            }
        );

        const result = await response.json();
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error sending event' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
