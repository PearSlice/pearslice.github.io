export default {
    async fetch(request, env, ctx) {
        if (request.method === "OPTIONS") {
            // Handle preflight CORS
            return new Response(null, {
                status: 204,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "*",
                },
            });
        }

        if (request.method !== "POST") {
            return new Response("Only POST allowed", { status: 405 });
        }

        try {
            const { headers, body } = await request.json();

            const bitstampResp = await fetch("https://www.bitstamp.net/api/v2/user_transactions/", {
                method: "POST",
                headers,
                body,
            });

            const data = await bitstampResp.text();

            return new Response(data, {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    },
};
