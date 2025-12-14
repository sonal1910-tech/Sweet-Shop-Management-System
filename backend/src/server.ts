import app from './app';
import { initDb } from './db';

const PORT = process.env.PORT || 3000;

// Initialize DB and then start server
try {
    initDb();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        // Keep process alive
        setInterval(() => { }, 10000);
    });
} catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
}
