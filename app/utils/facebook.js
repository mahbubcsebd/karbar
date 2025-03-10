export const sendFacebookEvent = async (
    eventName,
    eventSourceUrl,
    userData,
    pixelId,
    token
) => {
    try {
        const res = await fetch('/api/facebook-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event_name: eventName,
                event_source_url: eventSourceUrl,
                user_data: userData,
                pixel_id: pixelId,
                token: token,
            }),
        });

        return await res.json();
    } catch (error) {
        console.error('Facebook Conversion API Error:', error);
    }
};
