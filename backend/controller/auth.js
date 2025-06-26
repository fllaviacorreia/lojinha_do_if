import authService from '../service/auth.js';

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        // Validate email format
        const result = await authService.login(email, password);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

export async function registerController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        
        const result = await authService.register(name, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}