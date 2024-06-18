import { registerUser } from "@/utils/auth";

export async function POST(request) {
    try {
        const userData = await request.json();
        const user = await registerUser(userData);
        return new Response(JSON.stringify({ user }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}