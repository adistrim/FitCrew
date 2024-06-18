import { loginUser } from "@/utils/auth";

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        const { user, token } = await loginUser(email, password);

        return new Response(JSON.stringify({ user, token }), {
            status: 200,
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