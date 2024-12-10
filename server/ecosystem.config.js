module.exports = {
  apps: [
    {
      name: 'server', // Application name
      script: './src/server.js', // Entry point for the app
      instances: "max", // Number of instances (use "max" for all CPU cores)
      exec_mode: 'cluster', // 'cluster' for multi-core or 'fork' for single-core
      watch: true, // Auto-restart on changes (useful for development)
      env: {
        NODE_ENV: 'development', // Environment variables for development
        PORT: 8000,
        DB_URI:
          'mongodb+srv://satyamchoubey789:satyamchoubey789@entry-level-job-portal.p1mk1.mongodb.net/?retryWrites=true&w=majority&appName=entry-level-job-portal',
      },
      env_production: {
        NODE_ENV: 'production', // Environment variables for production
        PORT: 8080,
        DB_URI: 'mongodb+srv://satyamchoubey789:satyamchoubey789@entry-level-job-portal.p1mk1.mongodb.net/?retryWrites=true&w=majority&appName=entry-level-job-portal',
      },
    },
  ],
};
