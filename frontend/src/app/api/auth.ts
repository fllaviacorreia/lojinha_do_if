import { SigninFormSchema, FormState } from '@/utils/validators/login'

const API_URL = process.env.API_URL || 'http://localhost:5000'

export async function signin(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Extract validated fields
    const { email, password } = validatedFields.data


    // Call the API endpoint to sign in
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const contentType = response.headers.get('content-type');

    let data;

    if (contentType && contentType.includes('application/json')) {
        data = await response.json();
    } else {
        const text = await response.text();
        console.error('Resposta não é JSON:', text);
        return {
            errors: {
                email: ['Erro inesperado'],
            },
            message: text || 'Erro desconhecido',
        };
    }

    if (!response.ok) {
        return {
            errors: {
                email: data?.errors?.email || [],
                password: data?.errors?.password || [],
            },
            message: data?.error || 'Erro ao fazer login',
        };
    }
        
        // If the response is successful, go to the home page
        return {
            message: 'Login realizado com sucesso',
            data: {
                user: data.user,
                token: data.token,
            },
        };
}